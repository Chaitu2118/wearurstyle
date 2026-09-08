import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { notifySuccess } from "../utils/notify";

function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty-page-root">
        <div className="wishlist-empty-content-box">
          <div className="empty-wishlist-icon-wrapper">
            <Heart size={38} />
          </div>
          <h2 className="empty-wishlist-heading font-serif">Your Wishlist is Empty</h2>
          <p className="empty-wishlist-text">
            Save your favorite tailored silhouettes, couture gowns, and luxury essentials to review or purchase later.
          </p>
          <button
            type="button"
            className="btn-empty-wishlist-explore"
            onClick={() => navigate("/dashboard")}
          >
            <span>Explore The Collection</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const handleMoveToCart = (item) => {
    addToCart(item.id || item.productId, "M");
    removeFromWishlist(item.id || item.productId);
    notifySuccess(`Moved "${item.name}" to shopping bag!`);
  };

  return (
    <div className="wishlist-page-root">
      {/* 1. Header Strip */}
      <div className="wishlist-header-strip">
        <div className="wishlist-header-container">
          <span className="wishlist-overhead-label">SAVED SILHOUETTES</span>
          <h1 className="wishlist-main-heading font-serif">My Atelier Wishlist</h1>
          <p className="wishlist-header-desc">
            You have saved <strong>{wishlist.length}</strong> {wishlist.length === 1 ? "piece" : "pieces"} to your private collection.
          </p>
        </div>
      </div>

      <div className="wishlist-main-container">
        <div className="wishlist-items-grid">
          {wishlist.map((item) => {
            const price = Math.round(Number(item.price) || 0);
            const originalPrice = Math.round(price * 1.35);

            return (
              <div key={item.id} className="wishlist-garment-card">
                {/* Media Holder */}
                <div
                  className="wishlist-media-box"
                  onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="wishlist-image"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="btn-wishlist-remove-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Details */}
                <div className="wishlist-details-box">
                  <span className="wishlist-item-cat">
                    {(item.category || "Apparel").replace("-", " ")}
                  </span>
                  <h4
                    className="wishlist-item-title"
                    onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                  >
                    {item.name}
                  </h4>

                  <div className="wishlist-pricing-line">
                    <span className="wishlist-price-current">₹{price}</span>
                    <span className="wishlist-price-strike">₹{originalPrice}</span>
                  </div>

                  {/* Actions */}
                  <div className="wishlist-card-actions">
                    <button
                      type="button"
                      className="btn-move-to-bag"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingBag size={15} />
                      <span>Move To Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
