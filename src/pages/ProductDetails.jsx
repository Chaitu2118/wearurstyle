import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Scissors,
  Check,
  Ruler,
  Share2
} from "lucide-react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { notifySuccess, notifyInfo } from "../utils/notify";
import ProductDetailsSkeleton from "../Components/ProductDetailsSkeleton";

function ProductDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { cart, addToCart, updateQuantity } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [openAccordion, setOpenAccordion] = useState("fabric");
  const [showSizeModal, setShowSizeModal] = useState(false);

  // Fetch product if not passed via router state
  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      try {
        if (!product) {
          setLoading(true);
          const res = await axios.get("http://127.0.0.1:5000/api/products");
          if (res.data) {
            const found = res.data.find((p) => String(p.id) === String(id));
            if (found && isMounted) {
              setProduct(found);
              setSelectedImage(found.image || found.thumbnail);
            }
          }
        } else {
          setSelectedImage(product.image || product.thumbnail);
        }

        // Fetch related products
        const resAll = await axios.get("http://127.0.0.1:5000/api/products");
        if (resAll.data && isMounted) {
          const others = resAll.data
            .filter((p) => String(p.id) !== String(id))
            .slice(0, 4);
          setRelatedProducts(others);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      isMounted = false;
    };
  }, [id, product]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="product-not-found-container">
        <h2 className="font-serif">Garment Not Found</h2>
        <p>The silhouette you are seeking may have been archived or moved to private collections.</p>
        <button
          type="button"
          className="btn-return-catalog"
          onClick={() => navigate("/dashboard")}
        >
          <span>Return To Catalog</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  const title = product.name || product.title || "Tailored Atelier Garment";
  const price = Math.round(product.price);
  const originalPrice = Math.round(price * 1.35);
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
  const category = (product.category || "Apparel").replace("-", " ");
  const description =
    product.description ||
    "Crafted from long-staple natural fibers with double-reinforced French seams and bespoke tailored proportions. Retains comfortable breathable drape across seasonal wear.";
  const rating = product.rating || 4.5;

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Cart item matching
  const cartItem = cart.find(
    (item) => item.productId === product.id && item.size === selectedSize
  );
  const currentCartQty = cartItem ? cartItem.quantity : 0;

  // Wishlist matching
  const wishlisted = wishlist.some(
    (item) => item.id === product.id || item.productId === product.id
  );

  const handleToggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        productId: product.id,
        name: title,
        price: product.price,
        image: product.image || product.thumbnail,
        category: product.category,
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      notifyInfo("Please select a size first");
      return;
    }
    addToCart(product.id, selectedSize);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out the ${title} on WearUrStyle Atelier`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      notifySuccess("Product link copied to clipboard");
    }
  };

  // Mock gallery photos using primary image + variations
  const galleryImages = [
    product.image || product.thumbnail,
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
  ].filter(Boolean);

  return (
    <div className="product-details-page-root">
      {/* 1. Breadcrumb Bar */}
      <div className="product-breadcrumb-bar">
        <div className="breadcrumb-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link to="/dashboard">Catalog</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-cat">{category}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{title}</span>
        </div>
      </div>

      <div className="product-details-container">
        <div className="product-details-layout">
          {/* Left: Gallery Column */}
          <div className="product-gallery-col">
            <div className="main-image-display">
              <span className="gallery-discount-badge">{discountPercent}% OFF</span>
              <img
                src={selectedImage || product.image}
                alt={title}
                className="main-gallery-image"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="gallery-thumbnails-strip">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumbnail-btn ${selectedImage === img ? "is-selected" : ""}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Specifications & Commerce Column */}
          <div className="product-specs-col">
            {/* Category & Action Header */}
            <div className="product-meta-header">
              <span className="product-category-pill">{category}</span>
              <button
                type="button"
                className="btn-share-product"
                onClick={handleShare}
                title="Share this silhouette"
              >
                <Share2 size={16} />
              </button>
            </div>

            <h1 className="product-headline font-serif">{title}</h1>

            {/* Rating Bar */}
            <div className="product-rating-row">
              <div className="rating-stars-cluster">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(rating) ? "#b45309" : "none"}
                    color="#b45309"
                  />
                ))}
                <span className="rating-num-val">{rating}</span>
              </div>
              <span className="rating-separator">•</span>
              <span className="rating-count-text">142 verified client reviews</span>
            </div>

            {/* Pricing Section */}
            <div className="product-pricing-card">
              <div className="price-primary-row">
                <span className="price-tag-large">₹{price}</span>
                <span className="price-tag-strike">₹{originalPrice}</span>
                <span className="price-discount-tag">Save ₹{originalPrice - price}</span>
              </div>
              <span className="price-tax-note">Inclusive of all duties, atelier tailoring, and GST.</span>
            </div>

            {/* Description Text */}
            <p className="product-narrative">{description}</p>

            {/* Size Selector */}
            <div className="product-sizing-box">
              <div className="sizing-header-row">
                <span className="sizing-label-title">Select Garment Size</span>
                <button
                  type="button"
                  className="btn-open-size-guide"
                  onClick={() => setShowSizeModal(true)}
                >
                  <Ruler size={13} />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="size-chips-cluster">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`pdp-size-chip ${selectedSize === size ? "is-selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Commerce Actions Group */}
            <div className="product-actions-cluster">
              {currentCartQty === 0 ? (
                <button
                  type="button"
                  className="btn-pdp-add-bag"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>Add To Shopping Bag • ₹{price}</span>
                </button>
              ) : (
                <div className="pdp-quantity-stepper">
                  <button
                    type="button"
                    className="btn-pdp-step"
                    onClick={() =>
                      updateQuantity(product.id, selectedSize, currentCartQty - 1)
                    }
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="pdp-step-count">{currentCartQty} in Bag</span>
                  <button
                    type="button"
                    className="btn-pdp-step"
                    onClick={() =>
                      updateQuantity(product.id, selectedSize, currentCartQty + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                type="button"
                className={`btn-pdp-wishlist ${wishlisted ? "is-wishlisted" : ""}`}
                onClick={handleToggleWishlist}
                title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={19}
                  fill={wishlisted ? "#dc2626" : "none"}
                  color={wishlisted ? "#dc2626" : "currentColor"}
                />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pdp-guarantees-strip">
              <div className="guarantee-item">
                <Truck size={16} />
                <span>Complimentary 24-48h Express Dispatch</span>
              </div>
              <div className="guarantee-item">
                <RotateCcw size={16} />
                <span>14-Day Doorstep Size Adjustments</span>
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={16} />
                <span>100% Certified Long-Staple Fibers</span>
              </div>
            </div>

            {/* Collapsible Accordions */}
            <div className="pdp-accordions-group">
              {/* Accordion 1 */}
              <div className="accordion-item-box">
                <button
                  type="button"
                  className="accordion-trigger-btn"
                  onClick={() =>
                    setOpenAccordion(openAccordion === "fabric" ? "" : "fabric")
                  }
                >
                  <span>Fabric Composition & Material Care</span>
                  {openAccordion === "fabric" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === "fabric" && (
                  <div className="accordion-content-panel">
                    <ul>
                      <li>Woven from 100% organic French flax linen and combed Supima cotton.</li>
                      <li>Cold machine wash or gentle hand wash at 30°C to preserve fiber elasticity.</li>
                      <li>Do not tumble dry; dry flat in natural shade to maintain tailored drape.</li>
                      <li>Warm iron on reverse while slightly damp.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div className="accordion-item-box">
                <button
                  type="button"
                  className="accordion-trigger-btn"
                  onClick={() =>
                    setOpenAccordion(openAccordion === "tailoring" ? "" : "tailoring")
                  }
                >
                  <span>Bespoke Tailoring & Structural Fit</span>
                  {openAccordion === "tailoring" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === "tailoring" && (
                  <div className="accordion-content-panel">
                    <p>
                      Cut with a relaxed contemporary drop shoulder and subtle tapered hemline. Engineered to balance clean architectural lines with unrestricted freedom of movement.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3 */}
              <div className="accordion-item-box">
                <button
                  type="button"
                  className="accordion-trigger-btn"
                  onClick={() =>
                    setOpenAccordion(openAccordion === "dispatch" ? "" : "dispatch")
                  }
                >
                  <span>Complimentary Shipping & Doorstep Exchanges</span>
                  {openAccordion === "dispatch" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === "dispatch" && (
                  <div className="accordion-content-panel">
                    <p>
                      Orders dispatched within 24 hours in luxury recyclable packaging. Should you require an alternate size, our concierge arranges doorstep exchange with zero courier fees.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Related Runway Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="pdp-related-section">
            <div className="atelier-section-header">
              <span className="section-overhead-label">COMPLETE THE LOOK</span>
              <h2 className="section-title font-serif">Complementary Silhouettes</h2>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="related-item-tile"
                  onClick={() => {
                    navigate(`/product/${prod.id}`, { state: { product: prod } });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="related-media-holder">
                    <img
                      src={prod.image || prod.thumbnail}
                      alt={prod.name || prod.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="related-info-box">
                    <span className="related-cat">{(prod.category || "").replace("-", " ")}</span>
                    <h4 className="related-name">{prod.name || prod.title}</h4>
                    <span className="related-price">₹{Math.round(prod.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizing Modal */}
      {showSizeModal && (
        <div className="atelier-modal-overlay" onClick={() => setShowSizeModal(false)}>
          <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <h3 className="font-serif">Atelier Size & Measurements Guide</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowSizeModal(false)}
              >
                ✕
              </button>
            </div>
            <p className="size-modal-note">
              Measurements in inches. All silhouettes are tailored true to international designer standards.
            </p>

            <table className="size-guide-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (in)</th>
                  <th>Waist (in)</th>
                  <th>Length (in)</th>
                  <th>Shoulder (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>S</strong></td>
                  <td>38</td>
                  <td>32</td>
                  <td>28</td>
                  <td>17.5</td>
                </tr>
                <tr>
                  <td><strong>M</strong></td>
                  <td>40</td>
                  <td>34</td>
                  <td>29</td>
                  <td>18.5</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>42</td>
                  <td>36</td>
                  <td>30</td>
                  <td>19.5</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>44</td>
                  <td>38</td>
                  <td>31</td>
                  <td>20.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
