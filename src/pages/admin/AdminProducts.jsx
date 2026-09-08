import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Shirt,
  ShoppingBag,
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Image as ImageIcon,
  DollarSign,
  Tag
} from "lucide-react";
import { notifySuccess, notifyError, notifyInfo } from "../../utils/notify";

const CATEGORIES = [
  { id: "mens-shirts", label: "Men's Shirts" },
  { id: "womens-dresses", label: "Women's Dresses" },
  { id: "tops", label: "Tops & Knits" },
];

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "mens-shirts",
    type: "clothing",
  });

  const token = localStorage.getItem("accessToken");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching admin products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "mens-shirts",
      type: "clothing",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setForm({
      name: prod.name || prod.title || "",
      description: prod.description || "",
      price: prod.price || "",
      image: prod.image || prod.thumbnail || "",
      category: prod.category || "mens-shirts",
      type: prod.type || "clothing",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this garment from the atelier catalog?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        notifySuccess("Silhouette removed from catalog");
        fetchProducts();
      } else {
        notifyError("Failed to delete product");
      }
    } catch (err) {
      notifyError("Server error deleting product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      notifyError("Please fill in the product name, price, and image URL");
      return;
    }

    try {
      const url = editingProduct
        ? `http://127.0.0.1:5000/api/admin/products/${editingProduct.id}`
        : "http://127.0.0.1:5000/api/admin/products";

      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      if (res.ok) {
        notifySuccess(editingProduct ? "Garment details updated" : "New silhouette added to atelier");
        setIsModalOpen(false);
        fetchProducts();
      } else {
        notifyError("Failed to save product changes");
      }
    } catch (err) {
      notifyError("Server error saving product");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        (p.name || p.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(search.toLowerCase());
      const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, search, categoryFilter]);

  return (
    <div className="admin-page-root">
      {/* Admin Header Banner */}
      <div className="admin-header-strip">
        <div className="admin-header-container">
          <div className="admin-header-left">
            <span className="admin-overhead-tag">MANAGEMENT CONSOLE</span>
            <h1 className="admin-main-heading font-serif">Garment Catalog Manager</h1>
          </div>
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-admin-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={15} />
              <span>Add New Silhouette</span>
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
          <Link to="/admin/products" className="admin-tab-item is-active">
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
        {/* Filter & Search Bar */}
        <div className="admin-controls-card">
          <div className="admin-search-input-group">
            <Search size={15} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search garments by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-category-filter-group">
            <button
              type="button"
              className={`admin-filter-pill ${categoryFilter === "all" ? "is-active" : ""}`}
              onClick={() => setCategoryFilter("all")}
            >
              All Categories ({products.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`admin-filter-pill ${categoryFilter === cat.id ? "is-active" : ""}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table Card */}
        <div className="admin-table-card">
          {loading ? (
            <div className="admin-table-loading">
              <p>Loading garments catalog...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="admin-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Piece</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Rating</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id}>
                      {/* Product Thumbnail & Title */}
                      <td>
                        <div className="admin-product-cell">
                          <img
                            src={prod.image || prod.thumbnail}
                            alt={prod.name || prod.title}
                            className="admin-product-thumb"
                          />
                          <div>
                            <span className="admin-product-name">{prod.name || prod.title}</span>
                            <span className="admin-product-id">SKU: #{prod.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="admin-badge-category">
                          {(prod.category || "").replace("-", " ")}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <span className="admin-price-tag">₹{Math.round(prod.price)}</span>
                      </td>

                      {/* Type */}
                      <td>
                        <span className="admin-type-label">{prod.type || "Ready-to-wear"}</span>
                      </td>

                      {/* Rating */}
                      <td>
                        <span className="admin-rating-label">★ {prod.rating || 4.5}</span>
                      </td>

                      {/* Actions */}
                      <td className="text-right">
                        <div className="admin-row-actions">
                          <button
                            type="button"
                            className="btn-admin-action-edit"
                            onClick={() => handleOpenEdit(prod)}
                            title="Edit silhouette"
                          >
                            <Edit2 size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            className="btn-admin-action-delete"
                            onClick={() => handleDelete(prod.id)}
                            title="Delete silhouette"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-empty-state">
              <p>No silhouettes match your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="atelier-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title font-serif">
                {editingProduct ? "Edit Garment Silhouette" : "Add New Garment to Catalog"}
              </h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="form-input-group">
                <label className="form-input-label">Garment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tailored Supima Oxford Overshirt"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="auth-input-control"
                />
              </div>

              <div className="form-grid-two-col">
                <div className="form-input-group">
                  <label className="form-input-label">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="1899"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="auth-input-control"
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-input-label">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="auth-input-control"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-input-group">
                <label className="form-input-label">High-Resolution Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                  className="auth-input-control"
                />
              </div>

              {form.image && (
                <div className="admin-image-preview-box">
                  <span className="preview-label">Image Preview:</span>
                  <img src={form.image} alt="Preview" className="modal-preview-img" />
                </div>
              )}

              <div className="form-input-group">
                <label className="form-input-label">Garment Narrative & Description</label>
                <textarea
                  rows="3"
                  placeholder="Crafted from natural organic linen with tailored shoulder drops..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="auth-input-control textarea-control"
                />
              </div>

              <div className="admin-modal-actions-footer">
                <button
                  type="button"
                  className="btn-admin-modal-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-admin-modal-save"
                >
                  <Check size={16} />
                  <span>{editingProduct ? "Save Changes" : "Create Garment"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
