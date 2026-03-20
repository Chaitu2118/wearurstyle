import { useParams } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword })
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Enter new password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
