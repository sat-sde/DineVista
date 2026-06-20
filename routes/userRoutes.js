const express=require("express");
const UserController=require("../controllers/userController")
const MenuController=require("../controllers/menuController")

const router=express.Router();

router.get('/Profile',MenuController.AuthCheck,UserController.profile_Display);
router.get('/Order',MenuController.AuthCheck,UserController.cart_Display);
router.post('/Order',MenuController.AuthCheck,UserController.cart_Check);
router.get('/Confirm',MenuController.AuthCheck,UserController.cart_Confirm);
router.post('/Confirm',MenuController.AuthCheck,UserController.cart_Confirm);
router.post('/Confirmed',MenuController.AuthCheck,UserController.cart_Confirmed);

module.exports=router;