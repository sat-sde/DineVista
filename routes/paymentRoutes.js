const express = require("express");
const PaymentController = require("../controllers/paymentController");
const MenuController = require("../controllers/menuController");

const router = express.Router();

// Create Stripe Checkout Session (requires login)
router.post('/create-checkout', MenuController.AuthCheck, PaymentController.createCheckoutSession);

// Success callback from Stripe
router.get('/success', MenuController.AuthCheck, PaymentController.paymentSuccess);

// Cancel callback from Stripe
router.get('/cancel', MenuController.AuthCheck, PaymentController.paymentCancel);

// Stripe Webhook (no auth — Stripe sends this directly)
// Note: raw body parsing is handled in app.js before other body parsers
router.post('/webhook', express.raw({ type: 'application/json' }), PaymentController.stripeWebhook);

module.exports = router;
