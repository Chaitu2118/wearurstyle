
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../utils/notify";

function AuthRequired() {
  const navigate = useNavigate();

  useEffect(() => {
    notifyError("Please login to continue");
    navigate("/login");
  }, [navigate]);
  
  return null;
}

export default AuthRequired;
