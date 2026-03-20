// import { useEffect, useState } from "react";

// function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/admin/orders", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => setOrders(data));
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2>View Orders</h2>

//       <table className="table table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>Order ID</th>
//             <th>User</th>
//             <th>Email</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map(o => (
//             <tr key={o.id}>
//               <td>{o.id}</td>
//               <td>{o.name}</td>
//               <td>{o.email}</td>
//               <td>₹{o.total_amount}</td>
//               <td>{o.status}</td>
//               <td>{new Date(o.created_at).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminOrders;

import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FIXED: use accessToken
  const token = localStorage.getItem("accessToken");

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Unauthorized or server error");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container mt-4">
      <h2>View Orders</h2>
    <div className="card">
      <div className="card-body">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.email}</td>
                  <td>₹{o.total_amount}</td>
                  <td>{o.status}</td>
                  <td>
                    {o.created_at
                      ? new Date(o.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
    </div>
    </div>
  );
}

export default AdminOrders;
