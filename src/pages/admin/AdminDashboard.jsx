import { useEffect, useState } from "react";
import AdminRevenueChart from "./AdminRevenueChart";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:5000/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStats();
  }, [token]);

  return (
    <div className="admin-page-root">
      {/* Admin Header Banner */}
      <div className="admin-header-strip">
        <div className="admin-header-container">
          <div className="admin-header-left">
            <span className="admin-overhead-tag">MANAGEMENT CONSOLE</span>
            <h1 className="admin-main-heading font-serif">Executive Atelier Dashboard</h1>
          </div>
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-admin-primary"
              onClick={() => navigate("/admin/products")}
            >
              <Plus size={15} />
              <span>Add New Garment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Subnav Tabs */}
      <div className="admin-subnav-strip">
        <div className="admin-subnav-container">
          <Link to="/admin/dashboard" className="admin-tab-item is-active">
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
          <Link to="/admin/users" className="admin-tab-item">
            <Users size={14} />
            <span>User Accounts</span>
          </Link>
        </div>
      </div>

      <div className="admin-main-container">
        {/* Metric Cards Grid */}
        <div className="admin-stats-grid">
          {/* Revenue */}
          <div className="admin-metric-card">
            <div className="metric-header-row">
              <span className="metric-label">Gross Revenue</span>
              <div className="metric-icon-box bg-emerald">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="metric-value-row">
              <h2 className="metric-number font-serif">₹{stats.revenue.toLocaleString()}</h2>
            </div>
            <span className="metric-delta-tag text-emerald">
              <TrendingUp size={12} /> Live sales revenue
            </span>
          </div>

          {/* Orders */}
          <div className="admin-metric-card">
            <div className="metric-header-row">
              <span className="metric-label">Client Orders</span>
              <div className="metric-icon-box bg-blue">
                <ShoppingBag size={16} />
              </div>
            </div>
            <div className="metric-value-row">
              <h2 className="metric-number font-serif">{stats.orders}</h2>
            </div>
            <span className="metric-delta-tag text-blue">
              <ArrowUpRight size={12} /> Dispatched & active
            </span>
          </div>

          {/* Products */}
          <div className="admin-metric-card">
            <div className="metric-header-row">
              <span className="metric-label">Active Silhouettes</span>
              <div className="metric-icon-box bg-amber">
                <Package size={16} />
              </div>
            </div>
            <div className="metric-value-row">
              <h2 className="metric-number font-serif">{stats.products}</h2>
            </div>
            <span className="metric-delta-tag text-amber">
              <Shirt size={12} /> Ready-to-wear pieces
            </span>
          </div>

          {/* Users */}
          <div className="admin-metric-card">
            <div className="metric-header-row">
              <span className="metric-label">Registered Clients</span>
              <div className="metric-icon-box bg-purple">
                <Users size={16} />
              </div>
            </div>
            <div className="metric-value-row">
              <h2 className="metric-number font-serif">{stats.users}</h2>
            </div>
            <span className="metric-delta-tag text-purple">
              <Users size={12} /> Atelier members
            </span>
          </div>
        </div>

        {/* Revenue Chart Section */}
        <div className="admin-chart-section">
          <AdminRevenueChart />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
