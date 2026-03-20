import { toast } from "react-toastify";

export const showLogoutToast = (onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p style={{ marginBottom: "10px" }}>
          Do you want to logout?
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            style={{
              background: "#e74c3c",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
            }}
          >
            Yes
          </button>

          <button
            onClick={closeToast}
            style={{
              background: "#bdc3c7",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
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
    }
  );
};
