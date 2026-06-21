require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const config = require('./config');

async function fix() {
  await mongoose.connect(config.dbURI);
  const updated = await MenuItem.findOneAndUpdate(
    { name: "Mushroom Risotto" },
    { image: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800" },
    { new: true }
  );
  console.log("Updated:", updated ? updated.name : "Not found");
  process.exit(0);
}
fix();
