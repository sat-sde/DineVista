const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ─── GET /api/orders/status/:id ──────────────────────────────────────
// Used by the client-side JS to poll for real-time status updates.
// Returns lightweight JSON containing just the status and timestamp.
// ─────────────────────────────────────────────────────────────────────
router.get('/status/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).select('orderStatus updatedAt');
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            status: order.orderStatus,
            updatedAt: order.updatedAt
        });

    } catch (err) {
        console.error("API Order Status Fetch Error:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
