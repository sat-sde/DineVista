require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const MenuRoutes = require("./routes/menuRoutes.js");
const AuthRoutes = require("./routes/authRoutes.js");
const UserRoutes = require("./routes/userRoutes.js");
const PaymentRoutes = require("./routes/paymentRoutes.js");
const AdminRoutes = require("./routes/adminRoutes.js");
const config = require('./config.js');
const { setUserLocals } = require('./middleware/authMiddleware.js');

// express app
const app = express();

const dbURI = config.dbURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
.then(() => console.log("Connected to Database"))
.catch(err => console.log(err));

// Listen to requests
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// cookie store middleware
app.use(cookieParser());

// session middleware
app.use(session({
  secret: config.jwtSecret,
  saveUninitialized: true,
  resave: true
}));

// Initialize Passport
require('./config/passport');
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.err = req.flash('err');
  next();
});

// ─── GLOBAL: Set user state for ALL EJS views ───────────────────
// This runs on every request. It decodes the JWT, fetches the user
// from MongoDB, and sets res.locals.user so nav.ejs / links.ejs
// can conditionally render the Admin Panel link.
app.use(setUserLocals);

// Homepage
app.get('/', (req, res) => {
  res.render('HomePage', { title: 'Home' });
});

// SignUp/Login Routes
app.use(AuthRoutes);

// Menu Routes
app.use('/Menu', MenuRoutes);

// User Routes
app.use('/User', UserRoutes);

// Payment Routes
app.use('/Payment', PaymentRoutes);

// Admin Routes (protected by isAdmin middleware inside the router)
app.use('/admin', AdminRoutes);

// API Routes
const ApiOrderRoutes = require("./routes/apiOrderRoutes.js");
app.use('/api/orders', ApiOrderRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
