const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem'
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        image: {
            type: String
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    orderStatus: {
        type: String,
        enum: ["Placed", "Preparing", "Out for Delivery", "Delivered"],
        default: "Placed"
    },
    stripeSessionId: {
        type: String
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
