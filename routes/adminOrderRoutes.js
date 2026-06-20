const express = require('express');
const router = express.Router();
const AdminOrderController = require('../controllers/adminOrderController');
const { AdminCheck } = require('../middleware/adminAuth');

// Apply admin authentication to all routes in this router
router.use(AdminCheck);

router.get('/', AdminOrderController.getOrders);
router.post('/update/:id', AdminOrderController.updateOrderStatus);

module.exports = router;
