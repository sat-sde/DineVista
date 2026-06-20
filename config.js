require('dotenv').config();

module.exports = {
  dbURI: process.env.MONGO_URI || 'mongodb+srv://sv980704_db_user:Satyam@cluster0.zn0sgeu.mongodb.net/dinevista',
  jwtSecret: process.env.JWT_SECRET || 'dinevista_jwt_secret_key_2024',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  appUrl: process.env.APP_URL || 'http://localhost:3000'
};
