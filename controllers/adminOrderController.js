const Order = require('../models/Order');

// ─── Get All Orders ──────────────────────────────────────────────
const getOrders = async (req, res) => {
    try {
        // Fetch all orders, populate the user details, and sort by newest first
        const orders = await Order.find()
            .populate('userId', 'first_name last_name email')
            .sort({ createdAt: -1 });

        res.render('admin/orders', { 
            title: 'Admin - Manage Orders', 
            orders,
            path: '/admin/orders'
        });
    } catch (err) {
        console.log("Admin Get Orders Error:", err);
        req.flash('err', 'Failed to fetch orders');
        res.redirect('/Menu');
    }
};

// ─── Update Order Status ─────────────────────────────────────────
const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        
        const validStatuses = ["Placed", "Preparing", "Out for Delivery", "Delivered"];
        if (!validStatuses.includes(orderStatus)) {
            req.flash('err', 'Invalid order status');
            return res.redirect('/admin/orders');
        }

        await Order.findByIdAndUpdate(req.params.id, { orderStatus });
        
        req.flash('success', `Order status updated to "${orderStatus}"`);
        res.redirect('/admin/orders');

    } catch (err) {
        console.log("Admin Update Order Status Error:", err);
        req.flash('err', 'Failed to update order status');
        res.redirect('/admin/orders');
    }
};

module.exports = {
    getOrders,
    updateOrderStatus
};
