import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Shirt,
  ShoppingBag,
  Users,
  Search,
  Trash2,
  Shield,
  User,
  RotateCcw
} from "lucide-react";
import { notifySuccess, notifyWarning, notifyError } from "../../utils/notify";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("accessToken");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleRoleChange = async (id, role) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        notifySuccess(`Client role updated to ${role.toUpperCase()}`);
        fetchUsers();
      } else {
        notifyError("Failed to update user role");
      }
    } catch (err) {
      notifyError("Server error updating user role");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this user account?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        notifyWarning("User account deleted");
        fetchUsers();
      } else {
        notifyError("Failed to delete user");
      }
    } catch (err) {
      notifyError("Server error deleting user");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      String(u.id).includes(q) ||
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.role || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin-page-root">
      {/* Admin Header Banner */}
      <div className="admin-header-strip">
        <div className="admin-header-container">
          <div className="admin-header-left">
            <span className="admin-overhead-tag">MANAGEMENT CONSOLE</span>
            <h1 className="admin-main-heading font-serif">Registered Client Accounts</h1>
          </div>
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-admin-secondary"
              onClick={fetchUsers}
            >
              <RotateCcw size={14} />
              <span>Refresh Accounts</span>
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
          <Link to="/admin/orders" className="admin-tab-item">
            <ShoppingBag size={14} />
            <span>Client Orders</span>
          </Link>
          <Link to="/admin/users" className="admin-tab-item is-active">
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
              placeholder="Search clients by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <span className="admin-count-text">
            <strong>{filteredUsers.length}</strong> total registered accounts
          </span>
        </div>

        {/* Users Table */}
        <div className="admin-table-card">
          {loading ? (
            <div className="admin-table-loading">
              <p>Loading accounts...</p>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Account ID</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Security Role</th>
                    <th>Registered On</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <span className="order-sku-pill">#{u.id}</span>
                        </td>
                        <td>
                          <div className="client-user-cell">
                            <div className="client-avatar-circle">
                              {u.role === "admin" ? <Shield size={13} /> : <User size={13} />}
                            </div>
                            <span className="client-name-bold">{u.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="client-email-sub">{u.email}</span>
                        </td>
                        <td>
                          <select
                            className={`admin-role-select ${u.role === "admin" ? "is-admin" : ""}`}
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          >
                            <option value="user">Member (User)</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </td>
                        <td>
                          <span className="order-date-text">
                            {u.created_at
                              ? new Date(u.created_at).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "-"}
                          </span>
                        </td>
                        <td className="text-right">
                          <button
                            type="button"
                            className="btn-admin-action-delete"
                            onClick={() => handleDeleteUser(u.id)}
                            title="Delete user"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No client accounts match your query.
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

export default AdminUsers;
