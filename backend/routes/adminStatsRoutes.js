import express from "express";
import db from "../db.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET dashboard stats (ADMIN ONLY)
router.get("/", protect, adminOnly, (req, res) => {
  const queries = {
    users: "SELECT COUNT(*) AS totalUsers FROM users",
    products: "SELECT COUNT(*) AS totalProducts FROM products",
    orders: "SELECT COUNT(*) AS totalOrders FROM orders",
    revenue: "SELECT IFNULL(SUM(total_amount), 0) AS totalRevenue FROM orders"
  };

  const stats = {};

  db.query(queries.users, (err, u) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    stats.users = u[0].totalUsers;

    db.query(queries.products, (err, p) => {
      if (err) return res.status(500).json({ message: "Error fetching products" });
      stats.products = p[0].totalProducts;

      db.query(queries.orders, (err, o) => {
        if (err) return res.status(500).json({ message: "Error fetching orders" });
        stats.orders = o[0].totalOrders;

        db.query(queries.revenue, (err, r) => {
          if (err) return res.status(500).json({ message: "Error fetching revenue" });
          stats.revenue = r[0].totalRevenue;

          res.json(stats);
        });
      });
    });
  });
});

export default router;
