// import { createContext, useContext, useState } from "react";
// import { notifyInfo, notifySuccess } from "../utils/notify";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState(
//     JSON.parse(localStorage.getItem("wishlist")) || []
//   );

//   const addToWishlist = (product) => {
//     setWishlist((prev) => {
//       const exists = prev.find(
//         (item) => item.id === product.id
//       );

//       if (exists) {
//         notifyInfo("Product already in wishlist");
//         return prev;
//       }

//       const updatedWishlist = [...prev, product];
//       localStorage.setItem(
//         "wishlist",
//         JSON.stringify(updatedWishlist)
//       );
//       notifySuccess("Added to wishlist");
//       return updatedWishlist;
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => {
//       const updatedWishlist = prev.filter(
//         (item) => item.id !== id
//       );
//       localStorage.setItem(
//         "wishlist",
//         JSON.stringify(updatedWishlist)
//       );
//       return updatedWishlist;
//     });
//   };

//   const clearWishlist = () => {
//     setWishlist([]);
//     localStorage.removeItem("wishlist");
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         clearWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () =>
//   useContext(WishlistContext);

import { createContext, useContext, useEffect, useState } from "react";
import { notifyInfo, notifySuccess } from "../utils/notify";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // 🔹 Load wishlist when user changes
  useEffect(() => {
    if (user) {
      const storedWishlist =
        JSON.parse(
          localStorage.getItem(`wishlist_${user.email}`)
        ) || [];
      setWishlist(storedWishlist);
    } else {
      setWishlist([]);
    }
  }, [user]);

  // 🔹 Save wishlist when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `wishlist_${user.email}`,
        JSON.stringify(wishlist)
      );
    }
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        notifyInfo("Product already in wishlist");
        return prev;
      }

      notifySuccess("Added to wishlist");
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
    if (user) {
      localStorage.removeItem(`wishlist_${user.email}`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
