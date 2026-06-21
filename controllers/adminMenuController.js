const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

// ─── Get All Menu Items ──────────────────────────────────────────
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find().populate('restaurantId');
        res.render('admin/menuList', { 
            title: 'Admin - Manage Menu', 
            menuItems,
            path: '/admin/menu'
        });
    } catch (err) {
        console.log("Admin Get Menu Error:", err);
        req.flash('err', 'Failed to fetch menu items');
        res.redirect('/Menu');
    }
};

// ─── Add Menu Item ───────────────────────────────────────────────
const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        
        // If multer successfully uploaded the file to Cloudinary, it attaches the secure URL to req.file.path
        let imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"; // default placeholder
        if (req.file && req.file.path) {
            imageUrl = req.file.path;
        }

        // Find the default restaurant (since we only have one for now)
        let restaurant = await Restaurant.findOne();
        if (!restaurant) {
            req.flash('err', 'No restaurant found. Please seed the database first.');
            return res.redirect('/admin/menu');
        }

        const newItem = new MenuItem({
            restaurantId: restaurant._id,
            name,
            description,
            price: parseFloat(price),
            category: category || "Main Course",
            image: imageUrl
        });

        await newItem.save();
        req.flash('success', 'Menu item added successfully!');
        res.redirect('/admin/menu');

    } catch (err) {
        console.log("Admin Add Menu Error:", err);
        req.flash('err', 'Failed to add menu item');
        res.redirect('/admin/menu');
    }
};

// ─── Render Edit Form ────────────────────────────────────────────
const editMenuItemDisplay = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            req.flash('err', 'Menu item not found');
            return res.redirect('/admin/menu');
        }
        res.render('admin/menuEdit', { 
            title: 'Admin - Edit Menu Item', 
            menuItem,
            path: '/admin/menu' 
        });
    } catch (err) {
        console.log("Admin Edit Display Error:", err);
        req.flash('err', 'Failed to load edit form');
        res.redirect('/admin/menu');
    }
};

// ─── Process Edit Form ───────────────────────────────────────────
const editMenuItem = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        
        let updateData = {
            name,
            description,
            price: parseFloat(price),
            category
        };

        // If a new image was uploaded, attach it to the update data
        if (req.file && req.file.path) {
            updateData.image = req.file.path;
        }

        await MenuItem.findByIdAndUpdate(req.params.id, updateData);

        req.flash('success', 'Menu item updated successfully!');
        res.redirect('/admin/menu');

    } catch (err) {
        console.log("Admin Edit Menu Error:", err);
        req.flash('err', 'Failed to update menu item');
        res.redirect(`/admin/menu/edit/${req.params.id}`);
    }
};

// ─── Delete Menu Item ────────────────────────────────────────────
const deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        req.flash('success', 'Menu item deleted successfully!');
        res.redirect('/admin/menu');
    } catch (err) {
        console.log("Admin Delete Menu Error:", err);
        req.flash('err', 'Failed to delete menu item');
        res.redirect('/admin/menu');
    }
};

module.exports = {
    getMenuItems,
    addMenuItem,
    editMenuItemDisplay,
    editMenuItem,
    deleteMenuItem
};
