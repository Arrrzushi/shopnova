const mongoose = require("mongoose");
require("dotenv").config();
const { imageUploadUtil } = require("../helpers/cloudinary");
const Product = require("../models/Product");
const Feature = require("../models/Feature");

async function migrateCollection(Model, fieldName = "image") {
  const docs = await Model.find({});
  let updated = 0;
  for (const doc of docs) {
    const url = doc[fieldName];
    if (!url) continue;
    const isAlreadyCloudinary = typeof url === "string" && url.includes("res.cloudinary.com");
    if (isAlreadyCloudinary) continue;
    try {
      const result = await imageUploadUtil(url);
      if (result && result.secure_url) {
        doc[fieldName] = result.secure_url;
        await doc.save();
        updated += 1;
        console.log(`Updated ${Model.modelName} ${doc._id}`);
      }
    } catch (e) {
      console.error(`Failed ${Model.modelName} ${doc._id}:`, e.message);
    }
  }
  console.log(`${Model.modelName}: updated ${updated} of ${docs.length}`);
}

async function run() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected. Migrating images to Cloudinary...");
    await migrateCollection(Product, "image");
    await migrateCollection(Feature, "image");
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();


