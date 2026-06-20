const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const config = require("../config");

// ─── Sign Up Display ────────────────────────────────────────────────
const Signdisplay = (req, res) => {
    res.render('SignUp', { title: 'Sign Up' });
};

// ─── Login Display ──────────────────────────────────────────────────
const Logindisplay = (req, res) => {
    res.render('Login', { title: 'Log In' });
};

// ─── Register ───────────────────────────────────────────────────────
const register = (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            req.flash("err", "Some Error Occurred");
            console.log(err);
            return res.redirect('/SignUp');
        }
        User.findOne({ email: req.body.email })
            .then(check_user => {
                if (check_user) {
                    req.flash('err', 'Email Already Exists!');
                    console.log("Email exists in Users!");
                    return res.redirect("/Login");
                }
                let user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashedPass
                });
                user.save()
                    .then(() => {
                        req.flash("success", "User Added Successfully!");
                        console.log("User Added Successfully!");
                        let token = jwt.sign(
                            { first_name: user.first_name, last_name: user.last_name, email: user.email },
                            config.jwtSecret
                        );
                        res.cookie("uid", token);
                        res.redirect("/Menu");
                    })
                    .catch((err) => {
                        req.flash("err", "Some Error Occurred");
                        console.log(err);
                        res.redirect('/SignUp');
                    });
            });
    });
};

// ─── Login ──────────────────────────────────────────────────────────
const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let remember = req.body.remember;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        req.flash('err', err);
                        console.log(err);
                        return res.redirect('/Login');
                    }
                    if (result) {
                        req.flash('success', 'Login Successful');
                        console.log("Login Successful");
                        let token = jwt.sign(
                            { first_name: user.first_name, last_name: user.last_name, email: user.email },
                            config.jwtSecret,
                            { expiresIn: "1h" }
                        );
                        if (remember === "Yes") {
                            token = jwt.sign(
                                { first_name: user.first_name, last_name: user.last_name, email: user.email },
                                config.jwtSecret
                            );
                        }
                        res.cookie("uid", token);
                        res.redirect("/Menu");
                    } else {
                        req.flash('err', 'Password does not match!');
                        console.log("Password does not match!");
                        res.redirect("/Login");
                    }
                });
            } else {
                req.flash('err', 'No Such User Found');
                console.log("No Such User Found");
                res.redirect("/Login");
            }
        });
};

// ─── Logout ─────────────────────────────────────────────────────────
const logout = (req, res) => {
    try {
        res.clearCookie("uid");
        console.log("Logout Successful!");
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/404");
    }
};

// ─── Forgot Password Display ───────────────────────────────────────
const forgotPasswordDisplay = (req, res) => {
    res.render('ForgotPassword', { title: 'Forgot Password' });
};

// ─── Forgot Password Handler ───────────────────────────────────────
const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash('err', 'No account found with that email.');
            return res.redirect('/ForgotPassword');
        }

        // Generate random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash the token and save to user document
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
        await user.save();

        // Build the reset URL
        const resetUrl = `${config.appUrl}/ResetPassword/${resetToken}`;

        // Send email
        const transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: false,
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }
        });

        const mailOptions = {
            from: `"DineVista" <${config.email.user}>`,
            to: user.email,
            subject: 'DineVista — Password Reset Request',
            html: `
                <h2>Password Reset</h2>
                <p>Hi ${user.first_name},</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#777;color:white;text-decoration:none;border-radius:6px;">Reset Password</a>
                <p>This link will expire in <strong>30 minutes</strong>.</p>
                <p>If you did not request this, please ignore this email.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Password reset email sent to:", user.email);

        req.flash('success', 'Password reset link has been sent to your email!');
        res.redirect('/Login');

    } catch (err) {
        console.log("Forgot password error:", err);
        req.flash('err', 'Something went wrong. Please try again.');
        res.redirect('/ForgotPassword');
    }
};

// ─── Reset Password Display ────────────────────────────────────────
const resetPasswordDisplay = (req, res) => {
    res.render('ResetPassword', { title: 'Reset Password', token: req.params.token });
};

// ─── Reset Password Handler ────────────────────────────────────────
const resetPassword = async (req, res) => {
    try {
        // Hash the token from the URL to match what's stored in DB
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            req.flash('err', 'Invalid or expired reset token.');
            return res.redirect('/ForgotPassword');
        }

        // Validate passwords match
        if (req.body.password !== req.body.confirmPassword) {
            req.flash('err', 'Passwords do not match!');
            return res.redirect(`/ResetPassword/${req.params.token}`);
        }

        // Hash the new password and save
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPass;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        console.log("Password reset successful for:", user.email);
        req.flash('success', 'Password has been reset successfully! Please log in.');
        res.redirect('/Login');

    } catch (err) {
        console.log("Reset password error:", err);
        req.flash('err', 'Something went wrong. Please try again.');
        res.redirect('/ForgotPassword');
    }
};

module.exports = {
    register,
    Signdisplay,
    Logindisplay,
    login,
    logout,
    forgotPasswordDisplay,
    forgotPassword,
    resetPasswordDisplay,
    resetPassword
};