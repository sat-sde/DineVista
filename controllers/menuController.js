const foodItems = require("../foodItems.js");
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart.js');
const config = require('../config.js');

const menu_all = (req, res) => {
    res.render('Menu', { title: 'Menu', foodItems: foodItems, search: true });
};

const menu_search = (req, res) => {
    let filteredFoods = [];
    const SearchQuery = req.body.search.trim();
    filteredFoods = foodItems.filter(item => {
        return item.name.toLowerCase().includes(SearchQuery.toLowerCase());
    });
    res.render('Menu', { title: 'Menu', foodItems: filteredFoods, search: true });
};

function AuthCheck(req, res, next) {
    const token = req.cookies.uid;
    // Check if user has a valid token
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                req.flash('err', 'Login First!');
                console.log("Not Logged In!");
                res.redirect('/Login');
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        req.flash('err', 'Login First!');
        console.log("Not Logged In!");
        res.redirect('/Login');
    }
}

function AddToCart(req, res, next) {
    product = {
        "id": req.body.foodId,
        "name": req.body.foodName,
        "price": parseFloat(req.body.foodPrice.substring(1)),
        "image": req.body.foodImage
    };
    Cart.save(product);
    console.log(Cart.getCart());
    console.log("Saved");
    res.status(204).end();
}

module.exports = {
    menu_all,
    menu_search,
    AuthCheck,
    AddToCart
};