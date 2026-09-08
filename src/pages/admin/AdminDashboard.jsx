import { useEffect, useState } from "react";
import AdminRevenueChart from "./AdminRevenueChart";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, [token]);

  return ( 
    <div className="container mt-4">
      <h2>📊 Admin Dashboard</h2>

      <div className="row g-4 mt-2">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Users</h5>
              <h3>{stats.users}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Products</h5>
              <h3>{stats.products}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Orders</h5>
              <h3>{stats.orders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Revenue</h5>
              <h3>₹{stats.revenue}</h3>
            </div>
          </div>
        </div>
        <AdminRevenueChart/>
      </div>
    </div>
  );
}

export default AdminDashboard;
