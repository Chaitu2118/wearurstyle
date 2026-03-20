// import db from "../db.js";

// export const addProduct = (req, res) => {
//   const { name, description, price, image, category, type } = req.body;

//   if (!name || !price || !category || !type) {
//     return res.status(400).json({ message: "Required fields missing" });
//   }

//   const sql = `
//     INSERT INTO products (name, description, price, image, category, type)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     sql,
//     [name, description, price, image, category, type],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Failed to add product" });
//       }

//       res.status(201).json({
//         message: "Product added successfully",
//         productId: result.insertId
//       });
//     }
//   );
// };

import db from "../db.js";

export const getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch products" });
    }

    res.status(200).json(results);
  });
};

export const addProduct = (req, res) => {
  const { name, description, price, image, category, type } = req.body;

  if (!name || !price || !category || !type) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const sql = `
    INSERT INTO products (name, description, price, image, category, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, image, category, type],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to add product" });
      }

      res.status(201).json({
        message: "Product added successfully",
        productId: result.insertId
      });
    }
  );
};
