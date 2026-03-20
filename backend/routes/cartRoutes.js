import express from "express";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartQuantity);
router.get("/", protect, getCart);
router.delete("/clear", protect, clearCart);

export default router;
