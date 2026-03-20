import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch(
      "http://127.0.0.1:5000/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>
      <input
        className="form-control mb-3"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="reset-btn"
        style={{
          backgroundColor: "#222",
          color: "white",
          border: "none"
        }}
        onClick={handleSubmit}>
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;
