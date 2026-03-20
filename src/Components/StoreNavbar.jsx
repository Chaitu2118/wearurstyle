

import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import UserIcon from "../assets/user.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { notifySuccess } from "../utils/notify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

const StoreNavbar = ({ cartCount, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const wishlistCount = wishlist.length;

  const handleLogout = () => {
    toast.warning(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: "10px" }}>
            Do you want to logout?
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                padding: "6px 12px",
                background: "#222",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                logout();
                closeToast();
                navigate("/");
                notifySuccess("Logged out successfully");
              }}
            >
              Yes
            </button>

            <button
              style={{
                padding: "6px 12px",
                background: "#ddd",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                closeToast();
                if (user?.role === "admin") {
                  navigate("/admin/dashboard");
                } else {
                  navigate("/dashboard");
                }
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" style={{ minHeight: "80px" }}>
      <Container fluid className="px-3">

        {/* LEFT */}
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (user?.role === "admin") {
              navigate("/admin/dashboard");
            } else {
              navigate("/Dashboard");
            }
          }}
        >
          <h2>WearUrStyle</h2>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />

        <Navbar.Collapse id="navbar-content">

          {/* CENTER SEARCH (USER ONLY) */}
          {user && user.role === "user" && (
            <Form
              className="d-flex mx-lg-auto align-items-center gap-2 flex-nowrap"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                document.activeElement.blur();
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search products"
                className="me-2 search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <Button
                variant="outline-light"
                className="me-2 search-btn"
                type="submit"
              >
                Search
              </Button>
            </Form>
          )}


          {/* RIGHT */}
          <Nav className="ms-auto align-items-lg-center gap-2">

            {/* GUEST */}
            {!user && (
              <div className="auth-buttons">
                <Button
                  variant="outline-light"
                  className="me-2 auth-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  className="auth-btn me-2"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </div>
            )}

            {user && (
  <div className="nav-icons-row">

    {/* USER ONLY ICONS */}
    {user.role === "user" && (
      <>
        <Nav.Link
          onClick={() => navigate("/wishlist")}
          className="d-inline-flex align-items-center position-relative me-2"
        >
          ❤️ Wishlist
          {wishlistCount > 0 && (
            <span className="badge rounded-pill bg-light text-dark position-absolute top-0 start-100 translate-middle">
              {wishlistCount}
            </span>
          )}
        </Nav.Link>

        <Nav.Link
          onClick={() => navigate("/cart")}
          className="d-inline-flex align-items-center position-relative me-2"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="badge rounded-pill bg-light text-dark position-absolute top-0 start-100 translate-middle">
              {cartCount}
            </span>
          )}
        </Nav.Link>
      </>
    )}

    {/* ADMIN QUICK LINKS */}
    {user.role === "admin" && (
      <>
        <Nav.Link onClick={() => navigate("/admin/products")} className="me-3">
          🛍️ Manage Products
        </Nav.Link>

        <Nav.Link onClick={() => navigate("/admin/orders")} className="me-3">
          📦 View Orders
        </Nav.Link>

        <Nav.Link onClick={() => navigate("/admin/users")} className="me-3">
          👥 Manage Users
        </Nav.Link>
      </>
    )}

    {/* COMMON PROFILE DROPDOWN */}
    <div className="profile-wrapper">
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="outline-light"
          size="sm"
          className="d-flex align-items-center profile-toggle"
        >
          <img
            src={UserIcon}
            alt="profile"
            width="32"
            height="32"
            className="rounded-circle"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="profile-dropdown">

          {/* Header */}
          <div className="px-3 py-2">
            <div className="fw-semibold">
              {user.role === "admin" ? user.name : `Hi, ${user.name}`}
            </div>
            <div className="text-muted small">
              {user.role === "admin" ? "Admin" : user.email}
            </div>
          </div>

          <Dropdown.Divider />

          {/* Theme Toggle */}
          <Dropdown.Item as="button" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Dropdown.Item>

          {/* User Orders */}
          {user.role === "user" && (
            <Dropdown.Item onClick={() => navigate("/orders")}>
              📦 My Orders
            </Dropdown.Item>
          )}

          {/* Logout */}
          <Dropdown.Item
            as="button"
            className="dropdown-logout"
            onClick={handleLogout}
          >
          🚪 Logout
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    </div>

  </div>
)}


            {/* USER NAVBAR
            {user && user.role === "user" && (
              <div className="nav-icons-row">

                <Nav.Link
                  onClick={() => navigate("/wishlist")}
                  className="d-inline-flex align-items-center position-relative me-2"
                >
                  ❤️ Wishlist
                  {wishlistCount > 0 && (
                    <span className="badge rounded-pill bg-light text-dark position-absolute top-0 start-100 translate-middle">
                      {wishlistCount}
                    </span>
                  )}
                </Nav.Link>

                <Nav.Link
                  onClick={() => navigate("/cart")}
                  className="d-inline-flex align-items-center position-relative me-2"
                >
                  🛒 Cart
                  {cartCount > 0 && (
                    <span className="badge rounded-pill bg-light text-dark position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </span>
                  )}
                </Nav.Link>

                <div className="profile-wrapper">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-light"
                      size="sm"
                      className="d-flex align-items-center profile-toggle"
                    >
                      <img
                        src={UserIcon}
                        alt="profile"
                        width="48"
                        height="30"
                        className="rounded-circle px-2"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="profile-dropdown">
                      <div className="px-5 py-2">
                        <div className="fw-semibold">Hi, {user.name}</div>
                        <div className="text-muted small">{user.email}</div>
                      </div>

                      <Dropdown.Divider />

                      <Button
                        variant="outline-light"
                        onClick={toggleTheme}
                        className="theme-toggle-btn"
                      >
                        {theme === "dark" ? "☀️" : "🌙"}
                      </Button>

                      <Dropdown.Item onClick={() => navigate("/orders")}>
                        📦 My Orders
                      </Dropdown.Item>

                      <Dropdown.Item className="outline-danger" as="button" onClick={handleLogout}>
                        🚪 Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            )}

            {/* ADMIN NAVBAR */}
            {/* {user && user.role === "admin" && (
              <div className="nav-icons-row">
                <Nav.Link
                  onClick={() => navigate("/admin/products")}
                  className="me-3"
                >
                  🛍️ Manage Products
                </Nav.Link>

                <Nav.Link
                  onClick={() => navigate("/admin/orders")}
                  className="me-3"
                >
                  📦 View Orders
                </Nav.Link>

                <Nav.Link
                  onClick={() => navigate("/admin/users")}
                >
                  👥 Manage Users
                </Nav.Link>

                <div className="profile-wrapper">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-light"
                      size="sm"
                      className="d-flex align-items-center profile-toggle"
                    >
                      <img
                        src={UserIcon}
                        alt="profile"
                        width="48"
                        height="30"
                        className="rounded-circle px-2"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="px-4 py-2">
                        <div className="fw-semibold">{user.name}</div>
                        <div className="text-muted small">Admin</div>
                      </div>

                      <Dropdown.Divider />

                      <Dropdown.Item as="button" className="outline-danger"  onClick={handleLogout}>
                        🚪 Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            )}  */}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StoreNavbar;
