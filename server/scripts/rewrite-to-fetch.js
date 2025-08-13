const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/Product");
const Feature = require("../models/Feature");

function toCloudinaryFetchUrl(originalUrl) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) throw new Error("CLOUDINARY_CLOUD_NAME not set");
  const base = `https://res.cloudinary.com/${cloud}/image/fetch/f_auto,q_auto`;
  return `${base}/${encodeURIComponent(originalUrl)}`;
}

async function rewrite(Model, field = "image") {
  const docs = await Model.find({});
  let changed = 0;
  for (const doc of docs) {
    const val = doc[field];
    if (!val || typeof val !== "string") continue;
    const isCloudinary = val.includes("res.cloudinary.com");
    if (isCloudinary) continue;
    try {
      doc[field] = toCloudinaryFetchUrl(val);
      await doc.save();
      changed += 1;
      console.log(`Rewrote ${Model.modelName} ${doc._id}`);
    } catch (e) {
      console.error(`Failed to rewrite ${Model.modelName} ${doc._id}:`, e.message);
    }
  }
  console.log(`${Model.modelName}: rewrote ${changed} docs`);
}

async function run() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected. Rewriting image URLs to Cloudinary fetch URLs...");
    await rewrite(Product, "image");
    await rewrite(Feature, "image");
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();


