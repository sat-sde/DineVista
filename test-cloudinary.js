require('dotenv').config();
const { cloudinary } = require('./config/cloudinary');

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload('/tmp/test-food.jpg', {
      folder: 'dinevista_menu'
    });
    console.log("SUCCESS! Image uploaded to Cloudinary:", result.secure_url);
    process.exit(0);
  } catch (err) {
    console.error("FAILED to upload to Cloudinary:", err);
    process.exit(1);
  }
}

testUpload();
