const config = require('../config');
const stripe = require('stripe')(config.stripeSecretKey);
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');
const foodItems = require('../foodItems');

// ─── Create Stripe Checkout Session ────────────────────────────────
const createCheckoutSession = async (req, res) => {
    try {
        const cart = Cart.getCart();

        if (!cart || !cart.products || cart.products.length === 0) {
            req.flash('err', 'Your cart is empty!');
            return res.redirect('/User/Order');
        }

        // Recalculate prices server-side to prevent tampering
        const line_items = cart.products.map(product => {
            // Look up the real price from foodItems
            const originalItem = foodItems.find(item => item.id === product.id);
            const unitPrice = originalItem
                ? parseFloat(originalItem.price.replace('$', ''))
                : product.price;

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: Math.round(unitPrice * 100) // Stripe expects cents
                },
                quantity: product.qty
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${config.appUrl}/Payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.appUrl}/Payment/cancel`,
            metadata: {
                userEmail: req.user.email
            }
        });

        res.redirect(303, session.url);

    } catch (err) {
        console.log("Stripe Checkout Error:", err);
        req.flash('err', 'Payment failed. Please try again.');
        res.redirect('/User/Confirm');
    }
};

// ─── Payment Success ───────────────────────────────────────────────
const paymentSuccess = async (req, res) => {
    try {
        const sessionId = req.query.session_id;

        if (!sessionId) {
            req.flash('err', 'Invalid payment session.');
            return res.redirect('/User/Order');
        }

        // Check if this session was already processed
        const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
        if (existingOrder) {
            req.flash('success', 'Order already processed!');
            Cart.clearCart();
            return res.redirect('/User/Profile');
        }

        // Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const userEmail = session.metadata.userEmail || req.user.email;
            const user = await User.findOne({ email: userEmail });

            if (!user) {
                req.flash('err', 'User not found.');
                return res.redirect('/');
            }

            const cart = Cart.getCart();

            if (cart && cart.products && cart.products.length > 0) {
                // Create an Order document in the orders collection
                const order = new Order({
                    userId: user._id,
                    items: cart.products.map(p => ({
                        name: p.name,
                        price: p.price,
                        quantity: p.qty,
                        image: p.image
                    })),
                    totalAmount: cart.totalPrice,
                    paymentStatus: 'Paid',
                    orderStatus: 'Placed',
                    stripeSessionId: sessionId
                });
                await order.save();

                // Also save to user's past_orders for backwards compatibility
                const pastOrder = {
                    items: cart.products,
                    totalPrice: cart.totalPrice,
                    date: Date.now()
                };
                user.past_orders.push(pastOrder);
                await user.save();

                Cart.clearCart();
                console.log("Order placed and paid successfully!");
            }

            req.flash('success', 'Payment successful! Your order has been placed.');
            res.redirect('/User/Profile');

        } else {
            req.flash('err', 'Payment was not completed.');
            res.redirect('/User/Order');
        }

    } catch (err) {
        console.log("Payment success handler error:", err);
        req.flash('err', 'Something went wrong processing your payment.');
        res.redirect('/User/Order');
    }
};

// ─── Payment Cancel ────────────────────────────────────────────────
const paymentCancel = (req, res) => {
    res.render('PaymentCancel', { title: 'Payment Cancelled' });
};

// ─── Stripe Webhook (Production-ready) ─────────────────────────────
const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            config.stripeWebhookSecret
        );
    } catch (err) {
        console.log('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Update the order payment status
        const order = await Order.findOne({ stripeSessionId: session.id });
        if (order) {
            order.paymentStatus = 'Paid';
            await order.save();
            console.log("Webhook: Order payment confirmed for session:", session.id);
        }
    }

    res.status(200).json({ received: true });
};

module.exports = {
    createCheckoutSession,
    paymentSuccess,
    paymentCancel,
    stripeWebhook
};
