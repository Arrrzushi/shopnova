// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

/* ----------------------------- DB CONNECTION ----------------------------- */
(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    process.exit(1);
  }
})();

/* --------------------------------- APP ---------------------------------- */
const app = express();
const PORT = process.env.PORT || 5000;

// CORS (allow your Vercel site or localhost fallback)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Parsers
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

/* -------------------------------- ROUTES -------------------------------- */
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// Health & info routes
app.get("/", (_req, res) => {
  res.send("ShopNova API is running");
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "production",
    time: new Date().toISOString(),
  });
});

// Expose PayPal client config to the client (if your frontend fetches this)
app.get("/api/config/paypal", (_req, res) => {
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID || "",
    mode: process.env.PAYPAL_MODE || "sandbox",
  });
});

// Mount feature/auth/shop/admin routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

/* ---------------------------- ERROR HANDLERS ----------------------------- */
// 404 for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});

// Generic error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* --------------------------------- START -------------------------------- */
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});

// Optional: graceful shutdown logs
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully…");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully…");
  process.exit(0);
});
