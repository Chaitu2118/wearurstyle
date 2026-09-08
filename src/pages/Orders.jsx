import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="orders-loading-root">
        <div className="orders-spinner"></div>
        <p>Loading your atelier orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty-page-root">
        <div className="orders-empty-content-box">
          <div className="empty-orders-icon-wrapper">
            <Package size={38} />
          </div>
          <h2 className="empty-orders-heading font-serif">No Order History Found</h2>
          <p className="empty-orders-text">
            You haven't placed any atelier orders yet. Explore our curated catalog to begin building your bespoke wardrobe.
          </p>
          <button
            type="button"
            className="btn-empty-orders-explore"
            onClick={() => navigate("/dashboard")}
          >
            <span>Explore The Collection</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page-root">
      {/* 1. Header Strip */}
      <div className="orders-header-strip">
        <div className="orders-header-container">
          <span className="orders-overhead-label">ORDER DISPATCH ARCHIVE</span>
          <h1 className="orders-main-heading font-serif">My Order History</h1>
          <p className="orders-header-desc">
            Review your past purchases, track active courier consignments, and download invoices.
          </p>
        </div>
      </div>

      <div className="orders-main-container">
        <div className="orders-list-wrapper">
          {orders.map((order, idx) => {
            const dateStr = order.created_at
              ? new Date(order.created_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Recent Order";

            const status = order.status || "Processing";
            const isDelivered = status.toLowerCase() === "delivered";

            return (
              <div key={order.id || idx} className="order-summary-card">
                {/* Order Top Bar */}
                <div className="order-card-header">
                  <div className="order-id-group">
                    <span className="order-id-label">ORDER REFERENCE</span>
                    <span className="order-id-val">#ATELIER-{order.id || 1000 + idx}</span>
                  </div>
                  <div className="order-date-group">
                    <span className="order-date-label">ORDER PLACED</span>
                    <span className="order-date-val">{dateStr}</span>
                  </div>
                  <div className="order-total-group">
                    <span className="order-total-label">TOTAL AMOUNT</span>
                    <span className="order-total-val">₹{order.total_amount || 0}</span>
                  </div>
                  <div className="order-status-badge-wrap">
                    <span className={`order-status-pill ${status.toLowerCase()}`}>
                      {status}
                    </span>
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="order-tracking-strip">
                  <div className="tracking-step is-complete">
                    <div className="step-icon-circle"><CheckCircle2 size={14} /></div>
                    <span className="step-label">Order Confirmed</span>
                  </div>
                  <div className="tracking-line is-complete"></div>
                  <div className="tracking-step is-complete">
                    <div className="step-icon-circle"><Package size={14} /></div>
                    <span className="step-label">Tailored & Packed</span>
                  </div>
                  <div className="tracking-line"></div>
                  <div className={`tracking-step ${isDelivered ? "is-complete" : ""}`}>
                    <div className="step-icon-circle"><Truck size={14} /></div>
                    <span className="step-label">In Transit</span>
                  </div>
                  <div className="tracking-line"></div>
                  <div className={`tracking-step ${isDelivered ? "is-complete" : ""}`}>
                    <div className="step-icon-circle"><CheckCircle2 size={14} /></div>
                    <span className="step-label">Delivered</span>
                  </div>
                </div>

                {/* Order Card Footer */}
                <div className="order-card-footer">
                  <div className="footer-perk-note">
                    <ShieldCheck size={14} />
                    <span>Eligible for 14-Day Doorstep Size Exchange</span>
                  </div>
                  <button
                    type="button"
                    className="btn-order-support"
                    onClick={() => navigate("/dashboard")}
                  >
                    <span>Reorder Silhouettes</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
