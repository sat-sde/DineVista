const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: function() {
            // Password is only required if googleId is not present
            return !this.googleId;
        }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    addresses: [{
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        isDefault: { type: Boolean, default: false }
    }],
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    past_orders: [{
        items: [{
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
