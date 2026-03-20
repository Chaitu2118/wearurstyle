// import db from "../db.js";
// import express from "express";
// import { signup, login } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import crypto from "crypto";
// import bcrypt from "bcrypt";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);

// router.get("/profile", protect, (req, res) => {
//     res.status(200).json({
//         message: "Protected Route accessed",
//         user: req.user
//     });
// });

// router.post("/forgot-password", (req, res) => {
//   const { email } = req.body;

//   db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
//     if (err) return res.status(500).json({ message: "Server error" });

//     if (results.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

//     // db.query(
//     //   "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
//     //   [resetToken, expiry, email]
//     // );

//     db.query(
//     "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
//     [resetToken, expiry, email],
//     (err) => {
//         if (err) return res.status(500).json({ message: "Update failed" });

//         console.log(
//         `Reset link: http://localhost:3000/reset-password/${resetToken}`
//         );

//         res.json({ message: "Reset link generated. Check backend console." });
//     }
//     );


//     console.log(
//       `Reset link: http://localhost:3000/reset-password/${resetToken}`
//     );

//     res.json({ message: "Reset link generated. Check console." });
//   });
// });

// router.post("/reset-password/:token", async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   db.query(
//     "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
//     [token],
//     async (err, results) => {
//       if (err) return res.status(500).json({ message: "Server error" });

//       if (results.length === 0) {
//         return res.status(400).json({ message: "Invalid or expired token" });
//       }

//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//     //   db.query(
//     //     "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
//     //     [hashedPassword, results[0].id]
//     //   );

//     db.query(
//     "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
//     [hashedPassword, results[0].id],
//     (err) => {
//         if (err) return res.status(500).json({ message: "Password update failed" });

//         res.json({ message: "Password reset successful" });
//     }
//     );


//       res.json({ message: "Password reset successful" });
//     }
//   );
// });


// export default router;

import express from "express";
import db from "../db.js";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ===========================
   AUTH ROUTES
=========================== */

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  return res.status(200).json({
    message: "Protected Route accessed",
    user: req.user
  });
});

/* ===========================
   FORGOT PASSWORD
=========================== */

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {

      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

      db.query(
        "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
        [resetToken, expiry, email],
        (updateErr) => {

          if (updateErr) {
            return res.status(500).json({ message: "Update failed" });
          }

          console.log(
            `Reset link: http://localhost:3000/reset-password/${resetToken}`
          );

          return res.json({
            message: "Reset link generated. Check backend console."
          });
        }
      );
    }
  );
});

/* ===========================
   RESET PASSWORD
=========================== */

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log("Token from URL:", token);

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  db.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
    [token],
    async (err, results) => {

        console.log("DB Results:", results);

      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "Invalid or expired token"
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        db.query(
          "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
          [hashedPassword, results[0].id],
          (updateErr) => {

            if (updateErr) {
              return res.status(500).json({
                message: "Password update failed"
              });
            }

            return res.json({
              message: "Password reset successful"
            });
          }
        );

      } catch (hashError) {
        return res.status(500).json({
          message: "Password hashing failed"
        });
      }
    }
  );
});

router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, decoded) => {

      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      db.query(
        "SELECT * FROM users WHERE id = ? AND refresh_token = ?",
        [decoded.id, refreshToken],
        (dbErr, results) => {

          if (dbErr || results.length === 0) {
            return res.status(403).json({ message: "Invalid token in DB" });
          }

          const newAccessToken = jwt.sign(
            { id: decoded.id, role: results[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
          );

          res.json({ accessToken: newAccessToken });
        }
      );
    }
  );
});


export default router;
