import db from "../db.js";

// export const getMonthlyRevenue = (req, res) => {
//   const sql = `
//     SELECT 
//       DATE_FORMAT(created_at, '%b') AS month,
//       SUM(total_amount) AS revenue
//     FROM orders
//     GROUP BY MONTH(created_at)
//     ORDER BY MONTH(created_at)
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Server error" });
//     }

//     res.json(results);
//   });
// };
export const getMonthlyRevenue = (req, res) => {
  const sql = `
    SELECT 
      MONTH(created_at) AS monthNumber,
      DATE_FORMAT(created_at, '%b') AS month,
      SUM(total_amount) AS revenue
    FROM orders
    GROUP BY MONTH(created_at), DATE_FORMAT(created_at, '%b')
    ORDER BY MONTH(created_at)
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results);
  });
};

