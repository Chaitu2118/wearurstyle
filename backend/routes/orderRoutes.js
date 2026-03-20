import express from "express";
import db from "../db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * PLACE ORDER (USER)
 */
// router.post("/", protect, (req, res) => {
//   const { totalAmount } = req.body;
//   const userId = req.user.id;

//   db.query(
//     "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)",
//     [userId, totalAmount, "Pending"],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Failed to place order" });
//       }

//       res.json({
//         message: "Order placed successfully",
//         orderId: result.insertId
//       });
//     }
//   );
// });

router.post("/", protect, (req, res) => {
  const { totalAmount } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)",
    [userId, totalAmount, "Pending"],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to place order" });
      }

      res.json({
        message: "Order placed successfully",
        orderId: result.insertId
      });
    }
  );
});


/**
 * GET USER ORDERS
 */
router.get("/", protect, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch orders" });
      }

      res.json(results);
    }
  );
});

export default router;
