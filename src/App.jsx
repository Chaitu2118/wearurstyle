import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import StoreNavbar from "./Components/StoreNavbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Wishlist from "./pages/Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;


  return (
    <div className="app-wrapper">
      <StoreNavbar 
        cartCount={cartCount} 
        wishlistCount={wishlistCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover
      />

      <div className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />


          <Route
            path="/cart"
            element={
              <ProtectedRoute role="user">
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute role="user">
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute role="user">
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <Dashboard 
                  searchQuery={searchQuery}
                />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard/>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <AdminProducts/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/forgot-password" element={<ForgotPassword/>}
          />

          <Route 
            path="/reset-password" element={< ResetPassword/>}
          />
        </Routes>

        
      </div>
      <Footer />
    </div>
  );
}

export default App;

