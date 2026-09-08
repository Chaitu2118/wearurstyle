import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Shirt,
  ShoppingBag,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw
} from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("accessToken");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized or server error");
      }

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch orders error:", err.message);
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

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      String(o.id).includes(q) ||
      (o.name || "").toLowerCase().includes(q) ||
      (o.email || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin-page-root">
      {/* Admin Header Banner */}
      <div className="admin-header-strip">
        <div className="admin-header-container">
          <div className="admin-header-left">
            <span className="admin-overhead-tag">MANAGEMENT CONSOLE</span>
            <h1 className="admin-main-heading font-serif">Client Order Archive</h1>
          </div>
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-admin-secondary"
              onClick={fetchOrders}
            >
              <RotateCcw size={14} />
              <span>Refresh Orders</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Subnav Tabs */}
      <div className="admin-subnav-strip">
        <div className="admin-subnav-container">
          <Link to="/admin/dashboard" className="admin-tab-item">
            <Layers size={14} />
            <span>Overview</span>
          </Link>
          <Link to="/admin/products" className="admin-tab-item">
            <Shirt size={14} />
            <span>Garment Catalog</span>
          </Link>
          <Link to="/admin/orders" className="admin-tab-item is-active">
            <ShoppingBag size={14} />
            <span>Client Orders</span>
          </Link>
          <Link to="/admin/users" className="admin-tab-item">
            <Users size={14} />
            <span>User Accounts</span>
          </Link>
        </div>
      </div>

      <div className="admin-main-container">
        {/* Controls */}
        <div className="admin-controls-card">
          <div className="admin-search-input-group">
            <Search size={15} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by Order ID, client name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <span className="admin-count-text">
            <strong>{filteredOrders.length}</strong> total orders recorded
          </span>
        </div>

        {/* Orders Table */}
        <div className="admin-table-card">
          {loading ? (
            <div className="admin-table-loading">
              <p>Loading client orders...</p>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Order Reference</th>
                    <th>Client Name</th>
                    <th>Email Address</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Date Placed</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((o) => (
                      <tr key={o.id}>
                        <td>
                          <span className="order-sku-pill">#ATELIER-{o.id}</span>
                        </td>
                        <td>
                          <span className="client-name-bold">{o.name || "Atelier Guest"}</span>
                        </td>
                        <td>
                          <span className="client-email-sub">{o.email}</span>
                        </td>
                        <td>
                          <span className="admin-price-tag">₹{o.total_amount}</span>
                        </td>
                        <td>
                          <span className={`order-status-pill ${(o.status || "processing").toLowerCase()}`}>
                            {o.status || "Processing"}
                          </span>
                        </td>
                        <td>
                          <span className="order-date-text">
                            {o.created_at
                              ? new Date(o.created_at).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "-"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No client orders match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
