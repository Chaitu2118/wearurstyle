import db from "../db.js";

/* ---------------- ADD TO CART (ONLY FOR FIRST ADD) ---------------- */
export const addToCart = (req, res) => {
  const userId = req.user.id;
  const { productId, size, quantity = 1 } = req.body;

  if (!productId || !size) {
    return res.status(400).json({ message: "Product and size required" });
  }

  const checkSql = `
    SELECT * FROM cart_items
    WHERE user_id = ? AND product_id = ? AND size = ?
  `;

  db.query(checkSql, [userId, productId, size], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      // Product exists → increase quantity
      const updateSql = `
        UPDATE cart_items
        SET quantity = quantity + ?
        WHERE id = ?
      `;

      db.query(updateSql, [quantity, result[0].id], (err2) => {
        if (err2) return res.status(500).json(err2);
        res.json({ message: "Cart updated" });
      });
    } else {
      // New product
      const insertSql = `
        INSERT INTO cart_items (user_id, product_id, size, quantity)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertSql, [userId, productId, size, quantity], (err3) => {
        if (err3) return res.status(500).json(err3);
        res.status(201).json({ message: "Added to cart" });
      });
    }
  });
};

/* ---------------- UPDATE QUANTITY (+ / - buttons) ---------------- */
export const updateCartQuantity = (req, res) => {
  const userId = req.user?.id;
  const { productId, size, quantity } = req.body;

  console.log("UPDATE CART:", { userId, productId, size, quantity });

  if (!userId || !productId || !size || quantity === undefined) {
    return res.status(400).json({
      message: "Missing cart update data",
    });
  }

  // 🔥 REMOVE ITEM IF QUANTITY <= 0
  if (quantity <= 0) {
    const deleteSql = `
      DELETE FROM cart_items
      WHERE user_id = ? AND product_id = ? AND size = ?
    `;

    db.query(deleteSql, [userId, productId, size], (err, result) => {
      if (err) {
        console.error("DELETE CART ERROR:", err);
        return res.status(500).json(err);
      }

      return res.json({ message: "Item removed" });
    });

    return; // ✅ VERY IMPORTANT
  }

  // 🔥 UPDATE QUANTITY
  const updateSql = `
    UPDATE cart_items
    SET quantity = ?
    WHERE user_id = ? AND product_id = ? AND size = ?
  `;

  db.query(
    updateSql,
    [quantity, userId, productId, size],
    (err, result) => {
      if (err) {
        console.error("UPDATE CART ERROR:", err);
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Cart item not found",
        });
      }

      return res.json({ message: "Quantity updated" });
    }
  );
};



/* ---------------- GET CART ---------------- */
export const getCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      c.id,
      c.quantity,
      c.size,
      p.id AS productId,
      p.name,
      p.price,
      p.image
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* ---------------- CLEAR CART ---------------- */
export const clearCart = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const sql = `DELETE FROM cart_items WHERE user_id = ?`;

  db.query(sql, [userId], (err) => {
    if (err) {
      console.error("CLEAR CART ERROR:", err);
      return res.status(500).json(err);
    }

    return res.json({ message: "Cart cleared" });
  });
};
