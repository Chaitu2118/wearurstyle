import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ShieldCheck, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="atelier-footer-root">
      {/* 1. Main Footer Grid */}
      <div className="atelier-footer-container">
        <div className="footer-columns-grid">
          {/* Col 1: Brand & Manifesto */}
          <div className="footer-col-brand">
            <div className="footer-brand-logo" onClick={() => navigate("/")}>
              <span className="footer-brand-title font-serif">WEARURSTYLE</span>
              <span className="footer-brand-subtitle">ATELIER</span>
            </div>
            <p className="footer-brand-narrative">
              Handcrafted contemporary silhouettes, bespoke Oxford tailoring, and luxury textiles crafted for enduring poise and comfortable seasonal wear.
            </p>
            <div className="footer-atelier-contact">
              <div className="contact-row">
                <MapPin size={14} className="contact-icon" />
                <span>Showroom: 14 Runway Atelier Boulevard, Bandra West, Mumbai</span>
              </div>
              <div className="contact-row">
                <Mail size={14} className="contact-icon" />
                <span>concierge@wearurstyle.com</span>
              </div>
              <div className="contact-row">
                <Phone size={14} className="contact-icon" />
                <span>+91 98765 43210 (Mon-Sat, 10am - 8pm)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Curated Collections */}
          <div className="footer-col-nav">
            <h4 className="footer-nav-title">Curated Collections</h4>
            <ul className="footer-links-list">
              <li><Link to="/dashboard">Men's Atelier & Overshirts</Link></li>
              <li><Link to="/dashboard">Women's Runway Couture</Link></li>
              <li><Link to="/dashboard">Tops, Knits & Daywear</Link></li>
              <li><Link to="/dashboard">Heritage Jacquard Edition</Link></li>
              <li><Link to="/dashboard">The Autumn / Winter Lookbook</Link></li>
              <li><Link to="/dashboard">New Arrivals Drop</Link></li>
            </ul>
          </div>

          {/* Col 3: Client Care & Sizing */}
          <div className="footer-col-nav">
            <h4 className="footer-nav-title">Client Concierge</h4>
            <ul className="footer-links-list">
              <li><Link to="/orders">Order Tracking & Dispatch</Link></li>
              <li><Link to="/cart">Complimentary Shipping & Returns</Link></li>
              <li><Link to="/wishlist">Saved Atelier Wishlist</Link></li>
              <li><a href="#size-guide" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>Bespoke Sizing & Measurements</a></li>
              <li><a href="#fabric-care" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>Textile & Garment Care Guide</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>Frequently Asked Inquiries</a></li>
            </ul>
          </div>

          {/* Col 4: Sustainability & Ethics */}
          <div className="footer-col-nav">
            <h4 className="footer-nav-title">House Standards</h4>
            <ul className="footer-links-list">
              <li><span className="footer-highlight-text">✓ 100% Organic Supima Cotton</span></li>
              <li><span className="footer-highlight-text">✓ Zero-Discharge Botanical Dyes</span></li>
              <li><span className="footer-highlight-text">✓ Recyclable Atelier Packaging</span></li>
              <li><span className="footer-highlight-text">✓ Fair Wage Artisan Workshops</span></li>
            </ul>

            <div className="footer-promo-box">
              <span className="promo-box-title">Welcome Privilege</span>
              <p className="promo-box-text">Use code <strong>ATELIER40</strong> at checkout for 40% off your initial order.</p>
            </div>
          </div>
        </div>

        {/* 2. Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-text">
            © {new Date().getFullYear()} WEARURSTYLE ATELIER. All rights reserved. Designed with classic craft and contemporary engineering.
          </div>

          <div className="footer-legal-links">
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <span className="legal-dot">•</span>
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <span className="legal-dot">•</span>
            <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
