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

module.exports = router;