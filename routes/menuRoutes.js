const express=require("express");
const MenuController=require("../controllers/menuController")

const router=express.Router();

router.get('/',MenuController.AuthCheck,MenuController.menu_all);
router.post('/',MenuController.AuthCheck,MenuController.menu_search);
router.post('/Add-to-Cart',MenuController.AuthCheck,MenuController.AddToCart);

module.exports=router;