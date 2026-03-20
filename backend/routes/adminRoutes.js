import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getMonthlyRevenue } from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  (req, res) => {
    res.json({ message: "Welcome Admin 👑" });
  }
);

router.get(
  "/revenue/monthly",
  protect,
  isAdmin,
  getMonthlyRevenue
);


export default router;
