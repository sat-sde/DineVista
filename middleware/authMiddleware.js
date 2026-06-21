const jwt = require('jsonwebtoken');
const config = require('../config.js');
const User = require('../models/User.js');

// ─────────────────────────────────────────────────────────────────────
// setUserLocals — Global middleware that runs on EVERY request.
// Decodes the JWT token (if present) and fetches the full user object
// from MongoDB. Sets `res.locals.user` so ALL EJS views can access it
// for conditional rendering (e.g. showing/hiding Admin Panel link).
// ─────────────────────────────────────────────────────────────────────
async function setUserLocals(req, res, next) {
    res.locals.user = null; // Default: no user logged in

    const token = req.cookies.uid;
    if (!token) return next();

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findOne({ email: decoded.email }).select('-password');
        if (user) {
            req.user = user;
            res.locals.user = user; // Available in every EJS template as `user`
        }
    } catch (err) {
        // Token is invalid or expired — silently clear it
        res.clearCookie('uid');
    }

    next();
}

// ─────────────────────────────────────────────────────────────────────
// isAuthenticated — Ensures the user is logged in.
// Use this to protect routes that require any authenticated user.
// ─────────────────────────────────────────────────────────────────────
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    req.flash('err', 'Please log in first!');
    console.log("Auth Required — Not Logged In!");
    res.redirect('/Login');
}

// ─────────────────────────────────────────────────────────────────────
// isAdmin — Strict admin-only middleware.
// Checks if the authenticated user has role === 'admin'.
// Must be used AFTER setUserLocals has run (it runs globally).
// ─────────────────────────────────────────────────────────────────────
function isAdmin(req, res, next) {
    if (!req.user) {
        req.flash('err', 'Please log in first!');
        console.log("Admin Auth — Not Logged In!");
        return res.redirect('/Login');
    }

    if (req.user.role !== 'admin') {
        req.flash('err', 'Access Denied: Admins Only!');
        console.log(`Access Denied for user: ${req.user.email} (role: ${req.user.role})`);
        return res.redirect('/');
    }

    next();
}

module.exports = {
    setUserLocals,
    isAuthenticated,
    isAdmin
};
