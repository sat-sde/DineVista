# DineVista

A simple restaurant ordering web app built with **Node.js (Express)**, **EJS**, and **MongoDB**.

Users can sign up / log in, browse the menu, search items, add/remove items in a cart, confirm an order, and view order history in their profile.

## Features

- Authentication with JWT stored in cookies (login/logout)
- Menu listing + quick search
- Add to cart + adjust item quantities
- Order confirmation page
- Order history stored in MongoDB (per user)
- Flash messages for common actions/errors

## Tech Stack

- Backend: Node.js, Express
- Views: EJS templates
- Database: MongoDB + Mongoose
- Auth: JSON Web Token (JWT), cookie-parser
- UX helpers: connect-flash + express-session

## Getting Started

### Prerequisites

- Node.js (recommended: 16+)
- A MongoDB database (local MongoDB or MongoDB Atlas)

### Installation

```bash
npm install
```

### Configure MongoDB

Edit `config.js` and replace the placeholder with your MongoDB connection string:

```js
module.exports = {
	dbURI: 'your_mongodb_uri_here'
};
```

Example (MongoDB Atlas):

```text
mongodb+srv://<username>:<password>@<cluster>/<dbName>?retryWrites=true&w=majority
```

### Run the App

This project currently runs from `app.js`:

```bash
node app.js
```

Then open:

- http://localhost:3000

## How to Use

1. Open the homepage
2. Sign up (or log in if you already have an account)
3. Go to **Menu** and optionally search for items
4. Click **Add To Cart** on items you want
5. Open **Cart** to add/remove quantities
6. Proceed to **confirmation** and confirm your order
7. View **order history** in **User Profile**

## Routes (Quick Reference)

### Public Pages

- `GET /` — Home page
- `GET /SignUp` — Sign up page
- `POST /SignUp` — Create account
- `GET /Login` — Login page
- `POST /Login` — Login
- `GET /Logout` — Logout

### Authenticated Pages (requires login)

- `GET /Menu` — Menu listing
- `POST /Menu` — Menu search
- `POST /Menu/Add-to-Cart` — Add an item to cart

- `GET /User/Profile` — User profile + order history
- `GET /User/Order` — Cart page
- `POST /User/Order` — Update cart (add/remove quantity)
- `GET /User/Confirm` — Confirmation page
- `POST /User/Confirm` — Confirmation page (same view)
- `POST /User/Confirmed` — Save order to history

## Project Structure

```text
.
├── app.js                 # Express app entrypoint (port 3000)
├── config.js              # MongoDB connection string
├── foodItems.js           # Static menu items
├── controllers/           # Route handlers
├── models/                # Mongoose models + cart logic
├── routes/                # Express routers
├── public/                # Static assets (CSS)
└── views/                 # EJS templates (pages + partials)
```

## Known Issues / Limitations

- **Start script mismatch**: `package.json` points to `server.js`, but the repo runs from `app.js`.
- **Sign-up form action**: `views/SignUp.ejs` posts to `/Signup`, while the route is `/SignUp` (case mismatch).
- **Cart storage**: the cart is stored in-memory in a singleton (`models/Cart.js`), so it is not user/session-specific and will reset on server restart.
- **Hardcoded secrets**: JWT signing secret is hardcoded (demo-only). Do not use as-is for production.


# DineVista
