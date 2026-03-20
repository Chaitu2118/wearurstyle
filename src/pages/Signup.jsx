
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/notify";

function Signup({ setPopup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      notifyError("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        notifyError(data.message || "Signup failed");
        return;
      }

      notifySuccess("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      notifyError("Server not responding");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleSignup}>Register</button>

        <div className="auth-links">
          <p
            className="signup-text"
            onClick={() => navigate("/Login")}
          >
            Have an account?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
