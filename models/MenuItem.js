const mongoose = require("mongoose");
const schema = mongoose.Schema;

const menuItemSchema = new schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "Main Course"
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
