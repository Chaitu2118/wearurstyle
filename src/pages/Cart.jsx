import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Check,
  Lock
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { notifySuccess, notifyInfo, notifyError } from "../utils/notify";

function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, clearCart } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Subtotal Calculation
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = Number(item.price) || 0;
      const q = Number(item.quantity) || 1;
      return sum + p * q;
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * appliedDiscount) / 100);
  }, [subtotal, appliedDiscount]);

  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "ATELIER40") {
      setAppliedDiscount(40);
      notifySuccess("Privilege voucher 'ATELIER40' applied! 40% discount deducted.");
    } else if (code === "STYLE15") {
      setAppliedDiscount(15);
      notifySuccess("Club voucher 'STYLE15' applied! 15% discount deducted.");
    } else {
      notifyError("Invalid or expired promo code");
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      setIsPlacingOrder(true);
      const token = localStorage.getItem("accessToken");

      const res = await fetch("http://127.0.0.1:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalAmount: finalTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        notifyError(data.message || "Unable to process order. Please verify credentials.");
        return;
      }

      notifySuccess("Order confirmed successfully! Your atelier dispatch is being prepared.");
      clearCart();
      navigate("/orders");
    } catch (error) {
      notifyError("Order processing failed. Please check server connection.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page-root">
        <div className="cart-empty-content-box">
          <div className="empty-cart-icon-wrapper">
            <ShoppingBag size={38} />
          </div>
          <h2 className="empty-cart-heading font-serif">Your Shopping Bag is Empty</h2>
          <p className="empty-cart-text">
            Explore our curated ready-to-wear runway silhouettes, crisp Oxford weaves, and organic linen overshirts.
          </p>
          <button
            type="button"
            className="btn-empty-cart-explore"
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
    <div className="cart-page-root">
      {/* 1. Header Banner */}
      <div className="cart-header-strip">
        <div className="cart-header-container">
          <h1 className="cart-main-heading font-serif">Shopping Bag</h1>
          <span className="cart-items-count-tag">
            {cart.length} {cart.length === 1 ? "Silhouette" : "Silhouettes"}
          </span>
        </div>
      </div>

      <div className="cart-main-container">
        {/* Free Shipping Progress Indicator */}
        <div className="free-shipping-meter-card">
          <div className="meter-label-row">
            {subtotal >= freeShippingThreshold ? (
              <span className="shipping-qualified-text">
                <Check size={16} /> You have qualified for <strong>Complimentary Express Dispatch</strong>
              </span>
            ) : (
              <span className="shipping-need-text">
                Add <strong>₹{amountNeededForFreeShipping}</strong> more to unlock <strong>Complimentary Express Dispatch</strong>
              </span>
            )}
          </div>
          <div className="meter-progress-track">
            <div
              className="meter-progress-bar"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="cart-two-col-layout">
          {/* Left Column: Itemized List */}
          <div className="cart-items-column">
            <div className="cart-items-table-header">
              <span>Garment</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => {
                const itemPrice = Math.round(Number(item.price) || 0);
                const lineTotal = itemPrice * item.quantity;

                return (
                  <div key={`${item.productId}-${item.size}`} className="cart-item-row">
                    {/* Image & Title */}
                    <div className="cart-item-primary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-thumbnail"
                      />
                      <div className="cart-item-details">
                        <h4 className="cart-item-title">{item.name}</h4>
                        <div className="cart-item-meta-badges">
                          <span className="size-badge">Size: {item.size}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-remove-item"
                          onClick={() => updateQuantity(item.productId, item.size, 0)}
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="cart-item-unit-price">
                      <span>₹{itemPrice}</span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="cart-item-quantity-stepper">
                      <div className="table-stepper-box">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="cart-item-line-total">
                      <span>₹{lineTotal}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-footer-actions-row">
              <Link to="/dashboard" className="link-continue-shopping">
                ← Continue Exploring Silhouettes
              </Link>
              <button
                type="button"
                className="btn-clear-bag"
                onClick={clearCart}
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="cart-summary-column">
            <div className="order-summary-panel">
              <h3 className="summary-title font-serif">Order Summary</h3>

              {/* Promo Voucher Section */}
              <div className="summary-coupon-box">
                <label className="coupon-label">Promotional Voucher</label>
                <form onSubmit={handleApplyCoupon} className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="e.g. ATELIER40"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="btn-apply-coupon">
                    Apply
                  </button>
                </form>

                {appliedDiscount === 0 && (
                  <div className="coupon-hint-strip">
                    <Tag size={12} />
                    <span>
                      Use code <strong onClick={() => setCouponCode("ATELIER40")}>ATELIER40</strong> for 40% off
                    </span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="summary-breakdown-list">
                <div className="summary-line">
                  <span>Bag Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="summary-line text-emerald">
                    <span>Privilege Discount ({appliedDiscount}%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>Express Dispatch</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald">COMPLIMENTARY</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="summary-line">
                  <span>Estimated Taxes & Packaging</span>
                  <span className="text-muted">Included</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-line-total">
                  <span>Total Amount</span>
                  <span className="total-amount-tag">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                className="btn-proceed-checkout"
                disabled={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                <Lock size={16} />
                <span>
                  {isPlacingOrder ? "Confirming Order..." : "Proceed To Secure Checkout"}
                </span>
              </button>

              {/* Trust Notes */}
              <div className="summary-trust-perks">
                <div className="trust-perk-item">
                  <Truck size={14} />
                  <span>Doorstep delivery in 2-4 business days</span>
                </div>
                <div className="trust-perk-item">
                  <RotateCcw size={14} />
                  <span>14-day hassle-free size exchanges</span>
                </div>
                <div className="trust-perk-item">
                  <ShieldCheck size={14} />
                  <span>Encrypted 256-bit secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
