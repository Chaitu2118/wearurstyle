// import express from "express";
// import db from "../db.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/adminMiddleware.js";

// const router = express.Router();

// // GET all products (ADMIN ONLY)
// router.get("/", protect, adminOnly, (req, res) => {
//   const sql = `
//     SELECT id, name, price, category, type, image, created_at
//     FROM products
//     ORDER BY created_at DESC
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to fetch products" });
//     }
//     res.json(results);
//   });
// });

// export default router;

import express from "express";
import db from "../db.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all products (ADMIN ONLY)
router.get("/", protect, adminOnly, (req, res) => {
  const sql = `
    SELECT id, name, price, category, type, image, created_at
    FROM products
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch products" });
    }
    res.json(results);
  });
});


// ✅ ADD PRODUCT (ADMIN ONLY)  
router.post("/", protect, adminOnly, (req, res) => {
  const { name, description, price, image, category, type } = req.body;

  // basic validation
  if (!name || !price) {
    return res.status(400).json({
      message: "Product name and price are required"
    });
  }

  const sql = `
    INSERT INTO products
    (name, description, price, image, category, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, image, category, type],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to add product"
        });
      }

      res.status(201).json({
        message: "Product added successfully",
        productId: result.insertId
      });
    }
  );
});

// UPDATE product (ADMIN ONLY)
router.put("/:id", protect, adminOnly, (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category, type } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Product name and price are required"
    });
  }

  const sql = `
    UPDATE products
    SET name = ?, description = ?, price = ?, image = ?, category = ?, type = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, description, price, image, category, type, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to update product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product updated successfully" });
    }
  );
});

// DELETE product (ADMIN ONLY)
router.delete("/:id", protect, adminOnly, (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete product" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  });
});


export default router;
