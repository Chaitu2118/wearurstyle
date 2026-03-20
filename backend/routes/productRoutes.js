import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);

// 🔒 Protected route
router.post("/add", protect, addProduct);

export default router;


