import db from "../db.js";

/* ---------------- ADD TO WISHLIST ---------------- */
export const addToWishlist = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product required" });
  }

  const sql = `
    INSERT IGNORE INTO wishlist_items (user_id, product_id)
    VALUES (?, ?)
  `;

  db.query(sql, [userId, productId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Added to wishlist" });
  });
};

/* ---------------- GET WISHLIST ---------------- */
export const getWishlist = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      w.id,
      p.id AS productId,
      p.name,
      p.price,
      p.image
    FROM wishlist_items w
    JOIN products p ON w.product_id = p.id
    WHERE w.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
