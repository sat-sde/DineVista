let cart = null;

class Cart {

    static save(product) {

        if (cart === null) {
            cart = { products: [], totalPrice: 0 };
        }

        const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // to check product is existing in cart
        if (existingProductIndex >= 0) { // exist in cart already
            const exsitingProduct = cart.products[existingProductIndex];
            exsitingProduct.qty += 1;
        } else { //not exist
            product.qty = 1;
            cart.products.push(product);
        }

        cart.totalPrice += product.price;
        cart.totalPrice=parseFloat(cart.totalPrice.toFixed(2));
    }

    static getCart() {
        return cart;
    }

    static delete(productId) {
        const ProductIndex = cart.products.findIndex(p => p.id == productId);
        const Product = cart.products[ProductIndex];
        console.log(Product);
        Product.qty -= 1;
        cart.totalPrice -= Product.price;
        cart.totalPrice=parseFloat(cart.totalPrice.toFixed(2));
        if (Product.qty==0){
            cart.products.splice(ProductIndex, 1);
        }
    }

    static clearCart() {
        cart=null;
    }

}

module.exports = Cart;