# MERN Stack Project — Summer PEP Classes

A fully functional, production‑ready ecommerce application built with the MERN stack (MongoDB, Express, React, Node.js). This project is prepared for Summer PEP Classes evaluation and demonstrates modern frontend patterns, secure backend APIs, authentication with JWT + cookies, role‑based admin features, third‑party integrations, and a polished UX/UI.

## Project Highlights

- Modern React app (Vite, React 18) with Tailwind CSS and headless UI components
- Global state management using Redux Toolkit and async thunks
- Secure Node/Express API with cookie‑based JWT auth and role‑based guards
- MongoDB models for Users, Products, Cart, Orders, Reviews, Features
- Product catalog with filtering, sorting, and search
- Cart and checkout flow with PayPal sandbox integration
- Image handling via Cloudinary (upload or on‑the‑fly fetch proxy)
- Admin dashboard to manage products, orders, and feature banners
- Strong DX: hot reload, environment config, clear scripts, and seed data

## Tech Stack

- Frontend: React 18, Vite, Redux Toolkit, React Router, Tailwind CSS, Radix UI
- Backend: Node.js, Express, Mongoose
- Auth: JWT (HTTP‑only cookies)
- DB: MongoDB Atlas (or local MongoDB)
- Payments: PayPal REST SDK (sandbox)
- Media: Cloudinary (upload + image fetch)

## Monorepo Layout

```
mern/
  client/           # React + Vite SPA
  server/           # Express API + Mongoose models
```

## Quickstart

1) Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

2) Server setup
- Create `server/.env` with:
```
MONGO_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:5173

PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
- Install and run:
```
cd server
npm install
npm run dev
```

3) Client setup
- Create `client/.env` with:
```
VITE_API_BASE_URL=http://localhost:5000
```
- Install and run:
```
cd client
npm install
npm run dev
```
- App: http://localhost:5173

```
cd server
npm run seed
```

Admin account :
- Email: admin@shopnova.com
- Password: admin123

Note: Product and feature images are stabilized with Cloudinary (upload and/or fetch proxy). If you supply your own images, update `server/scripts/seed.js` and re‑seed.

## How To Use 

- Register a new user and log in
- Browse the catalog; filter by category/brand and sort by price/name
- Open product details; add items to cart; view cart sheet and update quantities
- Proceed to checkout; add address; initiate PayPal sandbox flow (no real charge)
- Review order history in the account section
- Login as admin; manage products (add/edit/delete), manage orders, manage feature banners

## API Overview

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/check-auth`
- Products (Shop): `/api/shop/products/get`, `/api/shop/products/get/:id`
- Cart (Shop): `/api/shop/cart/add`, `/api/shop/cart/get/:userId`, `/api/shop/cart/update-cart`, `/api/shop/cart/:userId/:productId`
- Orders (Shop): `/api/shop/order/create`, `/api/shop/order/capture`, `/api/shop/order/list/:userId`, `/api/shop/order/details/:id`
- Search (Shop): `/api/shop/search/:keyword`
- Reviews (Shop): `/api/shop/review/add`, `/api/shop/review/:productId`
- Admin (Products): `/api/admin/products/add|get|edit/:id|delete/:id`
- Admin (Orders): `/api/admin/orders/get|details/:id|update/:id`
- Features: `/api/common/feature/add|get`

All mutating shop routes require an authenticated user via auth middleware. Admin routes require admin role.

## Notable Implementation Details

- Auth: HTTP‑only cookie stores JWT; `check-auth` verifies token and returns user profile
- Redux slices: colocated async thunks for API calls and reducers for UI state
- Styling: Tailwind tokens with theme variables for easy brand restyling
- Accessibility: semantic roles, keyboard focus, Radix primitives with labels/descriptions
- Images: Cloudinary used both for uploads and `image/fetch` proxy to ensure reliability and performance

## Common Tasks

- Run API: `cd server && npm run dev`
- Run Client: `cd client && npm run dev`
- Seed data: `cd server && npm run seed`
- Migrate images to Cloudinary: `cd server && npm run migrate-images`
- Rewrite images to Cloudinary fetch URLs: `cd server && npm run rewrite-images`
