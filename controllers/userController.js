const jwt= require('jsonwebtoken');
const Cart=require('../models/Cart');
const User = require("../models/User");

const Order = require('../models/Order');

const profile_Display = async (req, res) => {
    try {
        const first_name = req.user.first_name;
        const last_name = req.user.last_name;
        const email = req.user.email;
        
        const user = await User.findOne({ email: email });
        
        // Fetch real Order documents for tracking
        const realOrders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });

        res.render('Profile', { 
            title: "Profile",
            first_name, 
            last_name, 
            email, 
            p_orders: realOrders // Override to use real Order documents
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}

const cart_Display =(req,res) =>{
  const cart= Cart.getCart()
  let Products=[]
  let totPrice=0
  if (cart!== null){
    Products= Cart.getCart().products
    totPrice = Cart.getCart().totalPrice
  }
  res.render('Order',{title:"Cart", Products,totPrice});
}

const cart_Check =(req,res) =>{
  const cart= Cart.getCart()
  let check_id=req.body.Id
  let Products=Cart.getCart().products
  const ProductIndex = Products.findIndex(p => p.id == check_id);
  let product = Products[ProductIndex];
  console.log(product);
  let val=req.body.action;
  if (val=="Add"){
    Cart.save(product);
  }
  else if (val=="Remove"){
    Cart.delete(check_id);
  }
  Products=Cart.getCart().products
  let totPrice=Cart.getCart().totalPrice
  res.render('Order',{title:"Cart", Products, totPrice});
}

const cart_Confirm = (req,res) =>{
  const cart= Cart.getCart()
  if (cart== null){
    res.redirect("/User/Order")
  }
  let Products=Cart.getCart().products
  let totPrice=Cart.getCart().totalPrice
  res.render('Confirm',{title:"Confirm", Products, totPrice})
}


const trackOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId, userId: req.user._id });
    
    if (!order) {
      req.flash('err', 'Order not found');
      return res.redirect('/User/Profile');
    }
    
    res.render('orderTrack', { 
      title: 'Track Order',
      order: order
    });
  } catch (err) {
    console.error(err);
    res.redirect('/User/Profile');
  }
};

module.exports = {
  profile_Display,
  cart_Display,
  cart_Check,
  cart_Confirm,
  trackOrder
};
