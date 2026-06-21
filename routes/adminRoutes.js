const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const AdminMenuController = require('../controllers/adminMenuController');
const AdminOrderController = require('../controllers/adminOrderController');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const User = require('../models/User');

// ─── Apply isAdmin middleware to ALL admin routes ────────────────
router.use(isAdmin);

// ─── Dashboard ──────────────────────────────────────────────────
router.get('/dashboard', async (req, res) => {
    try {
        const menuCount = await MenuItem.countDocuments();
        const orderCount = await Order.countDocuments();
        const userCount = await User.countDocuments();

        res.render('admin/dashboard', {
            title: 'Admin - Dashboard',
            path: '/admin/dashboard',
            menuCount,
            orderCount,
            userCount
        });
    } catch (err) {
        console.log("Admin Dashboard Error:", err);
        req.flash('err', 'Failed to load dashboard');
        res.redirect('/');
    }
});

const { upload } = require('../config/cloudinary');

// ─── Menu Management ────────────────────────────────────────────
router.get('/menu', AdminMenuController.getMenuItems);
router.post('/menu/add', upload.single('image'), AdminMenuController.addMenuItem);
router.get('/menu/edit/:id', AdminMenuController.editMenuItemDisplay);
router.post('/menu/edit/:id', upload.single('image'), AdminMenuController.editMenuItem);
router.post('/menu/delete/:id', AdminMenuController.deleteMenuItem);

// ─── Order Management ───────────────────────────────────────────
router.get('/orders', AdminOrderController.getOrders);
router.post('/orders/update/:id', AdminOrderController.updateOrderStatus);

module.exports = router;
