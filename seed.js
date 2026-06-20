/**
 * seed.js — Populate MongoDB Atlas with Restaurant + MenuItem documents
 *
 * Run once:  node seed.js
 *
 * This creates:
 *   1 Restaurant  → "DineVista Restaurant"
 *   30 MenuItems  → from foodItems.js, linked to that restaurant
 */

require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const foodItems = require('./foodItems');

async function seed() {
    try {
        await mongoose.connect(config.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Database for seeding...");

        // ── Clear existing seed data ────────────────────────────────
        await Restaurant.deleteMany({});
        await MenuItem.deleteMany({});
        console.log("Cleared old Restaurant and MenuItem data.");

        // ── Create Restaurant ───────────────────────────────────────
        const restaurant = new Restaurant({
            name: "DineVista Restaurant",
            cuisineType: "Multi-Cuisine",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
            address: {
                street: "123 Foodie Lane",
                city: "New Delhi",
                state: "Delhi",
                zip: "110001"
            },
            rating: 4.5
        });
        await restaurant.save();
        console.log("Created Restaurant:", restaurant.name, "| ID:", restaurant._id);

        // ── Create MenuItems from foodItems.js ──────────────────────
        const menuItemDocs = foodItems.map(item => ({
            restaurantId: restaurant._id,
            name: item.name,
            description: item.desc,
            price: parseFloat(item.price.replace('$', '')),
            category: categorize(item.name),
            image: item.image
        }));

        const insertedItems = await MenuItem.insertMany(menuItemDocs);
        console.log(`Inserted ${insertedItems.length} menu items.`);

        console.log("\n✅ Seeding complete! Check MongoDB Atlas for:");
        console.log("   - restaurants collection (1 document)");
        console.log("   - menuitems collection (" + insertedItems.length + " documents)");

        process.exit(0);

    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
}

/**
 * Simple categorization based on item name keywords
 */
function categorize(name) {
    const lower = name.toLowerCase();
    if (lower.includes('burger') || lower.includes('sandwich') || lower.includes('wrap') || lower.includes('toast'))
        return 'Sandwiches & Burgers';
    if (lower.includes('pizza'))
        return 'Pizza';
    if (lower.includes('pasta') || lower.includes('risotto'))
        return 'Pasta & Rice';
    if (lower.includes('sushi') || lower.includes('roll'))
        return 'Sushi';
    if (lower.includes('salad'))
        return 'Salads';
    if (lower.includes('soup') || lower.includes('ramen'))
        return 'Soups';
    if (lower.includes('steak') || lower.includes('salmon') || lower.includes('fish') || lower.includes('lobster'))
        return 'Seafood & Meats';
    if (lower.includes('taco') || lower.includes('quesadilla'))
        return 'Mexican';
    if (lower.includes('wings'))
        return 'Appetizers';
    if (lower.includes('fries'))
        return 'Sides';
    if (lower.includes('ice cream') || lower.includes('cake') || lower.includes('parfait'))
        return 'Desserts';
    if (lower.includes('paneer') || lower.includes('tikka') || lower.includes('masala') || lower.includes('mushroom'))
        return 'Indian';
    return 'Main Course';
}

seed();
