

// import { createContext, useContext, useEffect, useState } from "react";
// import { notifySuccess } from "../utils/notify";
// import { useAuth } from "./AuthContext";
// import axios from "axios";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// const API = "http://127.0.0.1:5000/api/cart";

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   /* ---------------- FETCH CART ---------------- */
//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get(API, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCart(res.data);
//     } catch (err) {
//       console.error("Failed to fetch cart", err);
//     }
//   };

//   /* ---------------- LOAD CART ON LOGIN ---------------- */
//   useEffect(() => {
//     if (user) {
//       fetchCart();
//     } else {
//       setCart([]);
//     }
//   }, [user]);

//   /* ---------------- ADD TO CART (ONLY FIRST TIME) ---------------- */
//   const addToCart = async (productId, size) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       await axios.post(
//         `${API}/add`,
//         {
//           productId,
//           size,
//           quantity: 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       notifySuccess("Product added to cart");
//       fetchCart();
//     } catch (err) {
//       console.error("Add to cart failed", err);
//     }
//   };

//   /* ---------------- UPDATE QUANTITY (+ / -) ---------------- */
//   const updateQuantity = async (productId, size, quantity) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       await axios.put(
//         `${API}/update`,
//         { productId, size, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       fetchCart();
//     } catch (err) {
//       console.error("Update quantity failed", err);
//     }
//   };

//   /* ---------------- CLEAR CART (BACKEND) ---------------- */
//   const clearCart = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       await axios.delete(`${API}/clear`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCart([]);
//     } catch (err) {
//       console.error("Clear cart failed", err);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQuantity,
//         clearCart,
//         fetchCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import { createContext, useContext, useEffect, useState } from "react";
import { notifySuccess } from "../utils/notify";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const API = "http://127.0.0.1:5000/api/cart";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  /* ---------------- FETCH CART ---------------- */
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // ✅ changed
      if (!token) return;

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  /* ---------------- LOAD CART ON LOGIN ---------------- */
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (productId, size) => {
    try {
      const token = localStorage.getItem("accessToken"); // ✅ changed
      if (!token) return;

      await axios.post(
        `${API}/add`,
        { productId, size, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notifySuccess("Product added to cart");
      fetchCart();
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateQuantity = async (productId, size, quantity) => {
    try {
      const token = localStorage.getItem("accessToken"); // ✅ changed
      if (!token) return;

      await axios.put(
        `${API}/update`,
        { productId, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  /* ---------------- CLEAR CART ---------------- */
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // ✅ changed
      if (!token) return;

      await axios.delete(`${API}/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart([]);
    } catch (err) {
      console.error("Clear cart failed", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
