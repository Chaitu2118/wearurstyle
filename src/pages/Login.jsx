

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { notifyError, notifySuccess } from "../utils/notify";

function Login({ setPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      notifyError("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        notifyError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      login(data.user, data.token);

      notifySuccess("Login Successful");

      // 🔥 ROLE-BASED REDIRECT
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      notifyError("Server not responding");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <a href="/Signup">Don’t have an account?</a> */}

        <button onClick={handleLogin}>Login</button>

        {/* <p
          style={{ cursor: "pointer", color: "black"}}
          onClick={() => navigate("/Signup")}
        >
          Don't have an account?
        </p>
        <p
          style={{ cursor: "pointer", color: "black" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p> */}

        <div className="auth-links">
          <p
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <p 
            className="signup-text"
            onClick={() => navigate("/Signup")}
          >
            Don't have an account?
          </p>
        </div>


      </div>
    </div>
  );
}

export default Login;
