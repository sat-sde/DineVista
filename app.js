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
const config = require('./config.js');

// express app
const app = express();

const dbURI = config.dbURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.err = req.flash('err');
  next();
});

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

// Admin Routes
const AdminMenuRoutes = require('./routes/adminMenuRoutes');
const AdminOrderRoutes = require('./routes/adminOrderRoutes');
app.use('/admin/menu', AdminMenuRoutes);
app.use('/admin/orders', AdminOrderRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
