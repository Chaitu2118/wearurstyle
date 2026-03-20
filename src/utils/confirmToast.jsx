// import { toast } from "react-toastify";

// export const confirmToast = (message, onConfirm) => {
//   toast(
//     ({ closeToast }) => (
//       <div>
//         <p style={{ marginBottom: "10px" }}>{message}</p>
//         <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
//           <button
//             onClick={() => {
//               onConfirm();
//               closeToast();
//             }}
//             style={{
//               background: "#dc3545",
//               color: "#fff",
//               border: "none",
//               padding: "6px 12px",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             Yes
//           </button>

//           <button
//             onClick={closeToast}
//             style={{
//               background: "#6c757d",
//               color: "#fff",
//               border: "none",
//               padding: "6px 12px",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     ),
//     {
//       autoClose: false,
//       closeOnClick: false,
//       draggable: false,
//     }
//   );
// };

import { toast } from "react-toastify";

export const confirmToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div className="confirm-toast">
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button
            className="confirm-btn"
            onClick={() => {
              onConfirm();
              closeToast();
            }}
          >
            Yes
          </button>

          <button
            className="cancel-btn"
            onClick={closeToast}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      position: "top-center",
    }
  );
};
