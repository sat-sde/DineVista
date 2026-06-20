const jwt = require('jsonwebtoken');
const config = require('../config.js');
const User = require('../models/User.js');

async function AdminCheck(req, res, next) {
    const token = req.cookies.uid;
    
    // Check if user has a valid token
    if (token) {
        jwt.verify(token, config.jwtSecret, async (err, decoded) => {
            if (err) {
                req.flash('err', 'Login First!');
                console.log("Not Logged In!");
                return res.redirect('/Login');
            } else {
                try {
                    // Fetch user from DB to get the latest role
                    const user = await User.findOne({ email: decoded.email });
                    if (user && user.role === 'admin') {
                        req.user = user; // Attach full user object for admin
                        next();
                    } else {
                        req.flash('err', 'Access Denied: Admins Only!');
                        console.log(`Access Denied for user ${decoded.email}`);
                        return res.redirect('/Menu'); // Redirect back to menu
                    }
                } catch (dbErr) {
                    console.log("Error checking admin role:", dbErr);
                    req.flash('err', 'Server Error');
                    return res.redirect('/Menu');
                }
            }
        });
    } else {
        req.flash('err', 'Login First!');
        console.log("Not Logged In!");
        res.redirect('/Login');
    }
}

module.exports = {
    AdminCheck
};
