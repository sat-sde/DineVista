const express = require('express');
const router = express.Router();
const AdminMenuController = require('../controllers/adminMenuController');
const { AdminCheck } = require('../middleware/adminAuth');

// Apply admin authentication to all routes in this router
router.use(AdminCheck);

router.get('/', AdminMenuController.getMenuItems);
router.post('/add', AdminMenuController.addMenuItem);
router.get('/edit/:id', AdminMenuController.editMenuItemDisplay);
router.post('/edit/:id', AdminMenuController.editMenuItem);
router.post('/delete/:id', AdminMenuController.deleteMenuItem);

module.exports = router;
