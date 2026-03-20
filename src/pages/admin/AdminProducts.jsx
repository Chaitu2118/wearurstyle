// import { useEffect, useState } from "react";
// import { adminSuccess, adminWarning } from "../../utils/adminNotify";
// import "./AdminProducts.css";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: "",
//     category: "",
//     type: ""
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/admin/products", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, [token]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleEditClick = (product) => {
//     setForm({
//       name: product.name,
//       description: product.description || "",
//       price: product.price,
//       image: product.image || "",
//       category: product.category || "",
//       type: product.type || ""
//     });
//     setEditingId(product.id);
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     fetch(`http://127.0.0.1:5000/api/admin/products/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(() => {
//         adminWarning("Product deleted");
//         window.location.reload();
//       });
//   };

//   const handleSubmit = () => {
//     const url = editingId
//       ? `http://127.0.0.1:5000/api/admin/products/${editingId}`
//       : "http://127.0.0.1:5000/api/admin/products";

//     const method = editingId ? "PUT" : "POST";

//     fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(form)
//     })
//       .then(res => res.json())
//       .then(() => {
//         adminSuccess(editingId ? "Product updated" : "Product added");
//         window.location.reload();
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Manage Products</h2>

//       {/* FORM CARD */}
//       <div className="card mb-4">
//         <div className="card-body">
//           <h5 className="card-title">
//             {editingId ? "Edit Product" : "Add Product"}
//           </h5>

//           <div className="row g-3">
//             <div className="col-md-6">
//               <input
//                 className="form-control"
//                 name="name"
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-3">
//               <input
//                 className="form-control"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-3">
//               <input
//                 className="form-control"
//                 name="category"
//                 placeholder="Category"
//                 value={form.category}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-3">
//               <input
//                 className="form-control"
//                 name="type"
//                 placeholder="Type"
//                 value={form.type}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-9">
//               <input
//                 className="form-control"
//                 name="image"
//                 placeholder="Image URL"
//                 value={form.image}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-12">
//               <textarea
//                 className="form-control"
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-12">
//               <button className="btn btn-add" onClick={handleSubmit}>
//                 {editingId ? "Update Product" : "Add Product"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCTS TABLE */}
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Products List</h5>

//           <table className="table table-striped table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Type</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(p => (
//                 <tr key={p.id}>
//                   <td>{p.name}</td>
//                   <td>₹{p.price}</td>
//                   <td>{p.category}</td>
//                   <td>{p.type}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-edit me-2"
//                       onClick={() => handleEditClick(p)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(p.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminProducts;

import { useEffect, useState } from "react";
import { adminSuccess, adminWarning } from "../../utils/adminNotify";
import { confirmToast } from "../../utils/confirmToast";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    type: ""
  });

  const token = localStorage.getItem("accessToken");

  // ✅ Fetch Products Function
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://127.0.0.1:5000/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized or Server Error");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditClick = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image: product.image || "",
      category: product.category || "",
      type: product.type || ""
    });
    setEditingId(product.id);
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this product?"))
  //     return;

  //   try {
  //     const res = await fetch(
  //       `http://127.0.0.1:5000/api/admin/products/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );

  //     if (!res.ok) throw new Error("Delete failed");

  //     adminWarning("Product deleted");

  //     // ✅ Update state without reload
  //     setProducts(products.filter((p) => p.id !== id));
  //   } catch (err) {
  //     console.error(err);
  //     adminWarning("Delete failed");
  //   }
  // };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      adminWarning("Product deleted");

      // Update state without reload
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      adminWarning("Delete failed");
    }
  };

  const handleDelete = (id) => {
    confirmToast(
      "Are you sure you want to delete this product?",
      () => deleteProduct(id)
    );
  };



  const handleSubmit = async () => {
    try {
      const url = editingId
        ? `http://127.0.0.1:5000/api/admin/products/${editingId}`
        : "http://127.0.0.1:5000/api/admin/products";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Save failed");

      adminSuccess(
        editingId ? "Product updated successfully" : "Product added successfully"
      );

      // ✅ Reset form
      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        type: ""
      });

      setEditingId(null);

      // ✅ Refresh products without reload
      fetchProducts();
    } catch (err) {
      console.error(err);
      adminWarning("Save failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Products</h2>

      {/* FORM CARD */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {editingId ? "Edit Product" : "Add Product"}
          </h5>

          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                name="type"
                placeholder="Type"
                value={form.type}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-9">
              <input
                className="form-control"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <button className="btn btn-add" onClick={handleSubmit}>
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Products List</h5>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>₹{p.price}</td>
                      <td>{p.category}</td>
                      <td>{p.type}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-edit me-2"
                          onClick={() => handleEditClick(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
