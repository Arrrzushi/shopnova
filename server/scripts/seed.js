const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Product = require("../models/Product");
const Feature = require("../models/Feature");
const User = require("../models/User");

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI missing in environment");
    }
    await mongoose.connect(mongoUri);

    console.log("Connected to MongoDB, seeding data...");

    await Promise.all([
      Product.deleteMany({}),
      Feature.deleteMany({}),
    ]);

    const products = [
      {
        image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1400&auto=format&fit=crop",
        title: "Heritage Leather Loafer",
        description: "Hand-finished leather loafer with cushioned insole",
        category: "footwear",
        brand: "zara",
        price: 249,
        salePrice: 199,
        totalStock: 25,
        averageReview: 4.8,
      },
      {
        image: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1400&auto=format&fit=crop",
        title: "Silk Evening Blouse",
        description: "Fluid silk blouse with concealed placket",
        category: "women",
        brand: "h&m",
        price: 189,
        salePrice: 0,
        totalStock: 35,
        averageReview: 4.5,
      },
      {
        image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1400&auto=format&fit=crop",
        title: "Cashmere Crewneck",
        description: "Pure cashmere knit with rib cuffs",
        category: "men",
        brand: "nike",
        price: 299,
        salePrice: 259,
        totalStock: 18,
        averageReview: 4.7,
      },
      {
        image: "https://images.unsplash.com/photo-1519567241046-7f570eee3a16?q=80&w=1400&auto=format&fit=crop",
        title: "Monochrome City Sneaker",
        description: "Minimal leather sneaker with tonal sole",
        category: "footwear",
        brand: "adidas",
        price: 220,
        salePrice: 189,
        totalStock: 40,
        averageReview: 4.6,
      },
      {
        image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1400&auto=format&fit=crop",
        title: "Structured Wool Coat",
        description: "Double-breasted tailored overcoat",
        category: "men",
        brand: "levi",
        price: 399,
        salePrice: 349,
        totalStock: 15,
        averageReview: 4.9,
      },
      {
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1400&auto=format&fit=crop",
        title: "Pearl Hoop Earrings",
        description: "Gold‑tone hoops with freshwater pearls",
        category: "accessories",
        brand: "zara",
        price: 129,
        salePrice: 99,
        totalStock: 50,
        averageReview: 4.4,
      },
      {
        image: "https://images.unsplash.com/photo-1520975614082-31f3c6b94b91?q=80&w=1400&auto=format&fit=crop",
        title: "Saffiano Leather Tote",
        description: "Top‑zip tote with polished hardware",
        category: "accessories",
        brand: "zara",
        price: 349,
        salePrice: 299,
        totalStock: 22,
        averageReview: 4.5,
      },
      {
        image: "https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=1400&auto=format&fit=crop",
        title: "Satin Midi Dress",
        description: "Bias‑cut satin with draped neckline",
        category: "women",
        brand: "h&m",
        price: 279,
        salePrice: 239,
        totalStock: 28,
        averageReview: 4.6,
      },
      {
        image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1400&auto=format&fit=crop",
        title: "Aviator Sunglasses",
        description: "Polarized lenses with metal frame",
        category: "accessories",
        brand: "puma",
        price: 159,
        salePrice: 119,
        totalStock: 45,
        averageReview: 4.3,
      },
      {
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop",
        title: "Suede Chelsea Boots",
        description: "Tapered silhouette with stacked heel",
        category: "footwear",
        brand: "adidas",
        price: 289,
        salePrice: 0,
        totalStock: 26,
        averageReview: 4.5,
      },
      {
        image: "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1400&auto=format&fit=crop",
        title: "Premium Denim Jeans",
        description: "Selvedge denim, straight fit",
        category: "men",
        brand: "levi",
        price: 199,
        salePrice: 169,
        totalStock: 38,
        averageReview: 4.2,
      },
      {
        image: "https://images.unsplash.com/photo-1526182577365-4d95b12a52b4?q=80&w=1400&auto=format&fit=crop",
        title: "Leather Crossbody",
        description: "Compact bag with adjustable strap",
        category: "accessories",
        brand: "zara",
        price: 219,
        salePrice: 179,
        totalStock: 33,
        averageReview: 4.4,
      },
      {
        image: "https://images.unsplash.com/photo-1542326237-94b1c5a538d6?q=80&w=1400&auto=format&fit=crop",
        title: "Quilted Down Jacket",
        description: "Ultralight warmth, packable",
        category: "men",
        brand: "nike",
        price: 349,
        salePrice: 309,
        totalStock: 20,
        averageReview: 4.6,
      },
      {
        image: "https://images.unsplash.com/photo-1518544801976-3e188ea0b9d8?q=80&w=1400&auto=format&fit=crop",
        title: "Velvet Blazer",
        description: "Single‑button, peak lapel",
        category: "women",
        brand: "h&m",
        price: 329,
        salePrice: 0,
        totalStock: 14,
        averageReview: 4.7,
      },
      {
        image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1400&auto=format&fit=crop",
        title: "Performance Runner",
        description: "Lightweight knit upper, cushioned midsole",
        category: "footwear",
        brand: "puma",
        price: 210,
        salePrice: 179,
        totalStock: 42,
        averageReview: 4.5,
      },
      {
        image: "https://images.unsplash.com/photo-1472417583565-62e7bdeda490?q=80&w=1400&auto=format&fit=crop",
        title: "Silk Scarf",
        description: "Hand‑rolled edges, archival print",
        category: "accessories",
        brand: "zara",
        price: 149,
        salePrice: 119,
        totalStock: 55,
        averageReview: 4.1,
      },
      {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
        title: "Tailored Dress Pants",
        description: "Italian wool blend, slim fit",
        category: "men",
        brand: "levi",
        price: 229,
        salePrice: 0,
        totalStock: 24,
        averageReview: 4.3,
      },
      {
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
        title: "Shearling Collar Jacket",
        description: "Supple leather with shearling trim",
        category: "men",
        brand: "nike",
        price: 499,
        salePrice: 449,
        totalStock: 10,
        averageReview: 4.8,
      },
      {
        image: "https://images.unsplash.com/photo-1542228262-3d663b306a56?q=80&w=1400&auto=format&fit=crop",
        title: "Mini Crossbody Bag",
        description: "Pebbled leather, micro size",
        category: "accessories",
        brand: "zara",
        price: 199,
        salePrice: 169,
        totalStock: 36,
        averageReview: 4.2,
      },
      {
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop",
        title: "Pleated Midi Skirt",
        description: "Knife pleats, satin sheen",
        category: "women",
        brand: "h&m",
        price: 189,
        salePrice: 159,
        totalStock: 32,
        averageReview: 4.4,
      },
      {
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1400&auto=format&fit=crop",
        title: "Premium Trainer",
        description: "Full‑grain leather, EVA sole",
        category: "footwear",
        brand: "adidas",
        price: 260,
        salePrice: 0,
        totalStock: 27,
        averageReview: 4.6,
      },
      {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
        title: "Kids’ Wool Coat",
        description: "Warm and lightweight",
        category: "kids",
        brand: "puma",
        price: 139,
        salePrice: 119,
        totalStock: 40,
        averageReview: 4.2,
      },
      {
        image: "https://images.unsplash.com/photo-1542326237-94b1c5a538d6?q=80&w=1400&auto=format&fit=crop",
        title: "Quilted Crossbody",
        description: "Chain strap, magnetic closure",
        category: "accessories",
        brand: "zara",
        price: 229,
        salePrice: 189,
        totalStock: 31,
        averageReview: 4.3,
      },
      {
        image: "https://images.unsplash.com/photo-1520975899533-6ae2b72f08ae?q=80&w=1400&auto=format&fit=crop",
        title: "Kids’ Knit Set",
        description: "Soft cotton two‑piece",
        category: "kids",
        brand: "h&m",
        price: 59,
        salePrice: 49,
        totalStock: 65,
        averageReview: 4.0,
      },
      {
        image: "https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=1400&auto=format&fit=crop",
        title: "Satin Wrap Dress",
        description: "Flattering wrap silhouette",
        category: "women",
        brand: "h&m",
        price: 249,
        salePrice: 219,
        totalStock: 22,
        averageReview: 4.5,
      },
      {
        image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1400&auto=format&fit=crop",
        title: "Trail Runner Pro",
        description: "Grip outsole, breathable mesh",
        category: "footwear",
        brand: "puma",
        price: 195,
        salePrice: 165,
        totalStock: 37,
        averageReview: 4.4,
      },
      {
        image: "https://images.unsplash.com/photo-1519567241046-7f570eee3a16?q=80&w=1400&auto=format&fit=crop",
        title: "Monogram Card Holder",
        description: "Compact leather wallet",
        category: "accessories",
        brand: "zara",
        price: 89,
        salePrice: 0,
        totalStock: 70,
        averageReview: 4.1,
      },
      {
        image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1400&auto=format&fit=crop",
        title: "Wool-Blend Overcoat",
        description: "Hidden placket, clean lines",
        category: "men",
        brand: "levi",
        price: 379,
        salePrice: 329,
        totalStock: 16,
        averageReview: 4.7,
      },
      {
        image: "https://images.unsplash.com/photo-1526182577365-4d95b12a52b4?q=80&w=1400&auto=format&fit=crop",
        title: "Leather Shoulder Bag",
        description: "Curved silhouette, suede lining",
        category: "accessories",
        brand: "zara",
        price: 269,
        salePrice: 229,
        totalStock: 29,
        averageReview: 4.5,
      },
      {
        image: "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1400&auto=format&fit=crop",
        title: "Raw Denim Jacket",
        description: "Indigo selvedge, classic cut",
        category: "men",
        brand: "levi",
        price: 259,
        salePrice: 0,
        totalStock: 21,
        averageReview: 4.3,
      },
    ];

    const features = [
      { image: "https://images.unsplash.com/photo-1520975954732-35dd222996f0?q=80&w=1920&auto=format&fit=crop" },
      { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop" },
      { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop" },
      { image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1920&auto=format&fit=crop" },
    ];

    await Product.insertMany(products);
    await Feature.insertMany(features);

    const adminEmail = "admin@shopnova.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash("admin123", 12);
      await User.create({
        userName: "admin",
        email: adminEmail,
        password: passwordHash,
        role: "admin",
      });
      console.log("Created admin user: admin@shopnova.com / admin123");
    }

    console.log("Seeding complete.");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();


