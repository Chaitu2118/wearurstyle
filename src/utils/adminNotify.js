import { toast } from "react-toastify";

export const adminSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
  });
};

export const adminError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const adminWarning = (msg) => {
  toast.warn(msg, {
    position: "top-right",
    autoClose: 2500,
  });
};
