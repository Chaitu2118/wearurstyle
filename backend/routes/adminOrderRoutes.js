import express from "express";
import db from "../db.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all orders (ADMIN ONLY)
router.get("/", protect, adminOnly, (req, res) => {
  const sql = `
    SELECT orders.id, users.name, users.email,
           orders.total_amount, orders.status, orders.created_at
    FROM orders
    JOIN users ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch orders" });
    }
    res.json(results);
  });
});

export default router;
