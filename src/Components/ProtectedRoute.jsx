
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login"  />;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Logged in but role not allowed
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // Allowed
  return children;
}

export default ProtectedRoute;
