const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.get('/SignUp', AuthController.Signdisplay);
router.post('/SignUp', AuthController.register);
router.get('/Login', AuthController.Logindisplay);
router.post('/Login', AuthController.login);
router.get('/Logout', AuthController.logout);

// Forgot / Reset Password
router.get('/ForgotPassword', AuthController.forgotPasswordDisplay);
router.post('/ForgotPassword', AuthController.forgotPassword);
router.get('/ResetPassword/:token', AuthController.resetPasswordDisplay);
router.post('/ResetPassword/:token', AuthController.resetPassword);

const passport = require('passport');
const jwt = require("jsonwebtoken");
const config = require("../config");

// Google OAuth Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/Login' }),
    (req, res) => {
        // Successful authentication. Create JWT token to match local login flow.
        const user = req.user;
        const token = jwt.sign(
            { first_name: user.first_name, last_name: user.last_name, email: user.email },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
        res.cookie("uid", token);
        req.flash('success', 'Successfully logged in with Google!');
        res.redirect('/Menu');
    }
);

module.exports = router;