import axios from "axios";
import db from "./db.js";

const CLOTHING_CATEGORIES = [
  "mens-shirts",
  "womens-dresses",
  "tops"
];

const seedProducts = async () => {
  try {
    console.log("Seeding clothing products only...");

    for (const category of CLOTHING_CATEGORIES) {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );

      const products = res.data.products;

      const values = products.map((p) => [
        p.title,
        p.description,
        p.price,
        p.thumbnail,
        category,      // category
        "clothing"     // type
      ]);

      const sql = `
        INSERT INTO products
        (name, description, price, image, category, type)
        VALUES ?
      `;

      await new Promise((resolve, reject) => {
        db.query(sql, [values], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      console.log(`Inserted ${products.length} products from ${category}`);
    }

    console.log("✅ Clothing products seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedProducts();
