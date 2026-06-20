const mongoose = require("mongoose");
const schema = mongoose.Schema;

const restaurantSchema = new schema({
    name: {
        type: String,
        required: true
    },
    cuisineType: {
        type: String,
        default: "Multi-Cuisine"
    },
    image: {
        type: String,
        default: ""
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
