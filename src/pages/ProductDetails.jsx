
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import axios from "axios";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { notifyInfo } from "../utils/notify";
// import ProductDetailsSkeleton from "../Components/ProductDetailsSkeleton";

// function ProductDetails() {
//   const { cart, addToCart, removeFromCart } = useCart();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedSize , setSelectedSize] = useState("");
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(
//           `https://dummyjson.com/products/${id}`
//         );
//         setProduct(res.data);
//         setSelectedImage(res.data.thumbnail);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return <ProductDetailsSkeleton />;
//   }
  
//   if (!product) {
//     return (
//       <div className="text-center py-5">
//         <h4>Product not found</h4>
//         <Button onClick={() => navigate("/dashboard")}>
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//     const cartItem = cart?.find(
//     (item) =>
//       item.id === product.id &&
//       item.size === selectedSize
//   );

//   const quantity = cartItem ? cartItem.quantity : 0;

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       notifyInfo("Please select a size");
//       return;
//     }

//     addToCart({
//       id: product.id,
//       name: product.title,
//       price: product.price,
//       image: product.thumbnail,
//       size: selectedSize,
//     });
//   };

//   return (
//     <Container className="py-5">
//       <div className="bg-white rounded shadow-sm p-4">
//       <Row>
//         {/* Image */}
//         <Col md={5} className="product-image-col">
//           <div className="product-image-wrapper">
//           <img
//             src={selectedImage}
//             alt={product.title}
//             className="img-fluid rounded main-product-image"
//           />

//           <div className="thumbnail-list mt-3">
//             {product.images?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`thumbnail-${index}`}
//                 className={`thumbnail ${
//                   selectedImage === img ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//           </div>

//           </div>
//         </Col>

//         {/* Details */}
//         <Col md={7}>
//           <h2>{product.title}</h2>
//           <h4 className="text-success">
//             ₹ {Math.round(product.price * 80)}
//           </h4>

//           <p className="mt-3">{product.description}</p>

//           {/* Sizes (static, since API doesn’t give sizes) */}
//           <div className="my-3">
//             <strong>Select Size:</strong>
//             <div className="d-flex gap-2 mt-2">
//               {["S", "M", "L", "XL"].map((size) => (
//                 <Button 
//                   key={size}
//                   size="sm"
//                   variant={
//                     selectedSize === size
//                       ? "dark"
//                       : "outline-dark"
//                   }
//                   onClick={() => setSelectedSize(size)}
//                   >
//                   {size}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="d-flex align-items-center gap-3 mt-4">
//           {quantity === 0 ? (
//               <Button variant="dark" onClick={handleAddToCart}>
//                 Add to Cart
//               </Button>
//           ) : (
//               <div className="d-flex align-items-center gap-3">
//                 <Button
//                   variant="outline-dark"
//                   onClick={() =>
//                     removeFromCart(product.id, selectedSize)
//                   }
//                 >
//                   -
//                 </Button>

//                 <strong>{quantity}</strong>
//                 <Button
//                   variant="outline-dark"
//                   onClick={handleAddToCart}
//                 >
//                   +
//                 </Button>
//               </div>
//           )}
//               <Button
//                 variant="outline-danger"
//                 onClick={() => addToWishlist(product)}
//               >
//                 ❤️ Wishlist
//               </Button>
//             </div>

//         </Col>
//       </Row>
//       </div>
//     </Container>
//   );
// }

// export default ProductDetails;

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { notifyInfo } from "../utils/notify";
import ProductDetailsSkeleton from "../Components/ProductDetailsSkeleton";

function ProductDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { cart, addToCart, updateQuantity } = useCart();
  const { addToWishlist } = useWishlist();

  const product = state?.product;

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    product?.image || ""
  );

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-5">
        <h4>Product not found</h4>
        <Button onClick={() => navigate("/dashboard")}>
          Go Back
        </Button>
      </div>
    );
  }

  // ✅ FIXED: correct cart matching
  const cartItem = cart.find(
    (item) =>
      item.productId === product.id &&
      item.size === selectedSize
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  /* -------- Add product (first time only) -------- */
  const handleAddToCart = () => {
    if (!selectedSize) {
      notifyInfo("Please select a size");
      return;
    }

    addToCart(product.id, selectedSize);
  };

  return (
    <Container className="py-5">
      <div className="bg-white rounded shadow-sm p-4">
        <Row>
          <Col md={5} className="product-image-col">
            <div className="product-image-wrapper">
              <img
                src={selectedImage}
                alt={product.name}
                className="img-fluid rounded main-product-image"
              />
            </div>
          </Col>

          <Col md={7}>
            <h2>{product.name}</h2>

            <h4 className="text-success">
              ₹ {Math.round(product.price)}
            </h4>

            <p className="mt-3">{product.description}</p>

            <div className="my-3">
              <strong>Select Size:</strong>
              <div className="d-flex gap-2 mt-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={
                      selectedSize === size
                        ? "dark"
                        : "outline-dark"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mt-4">
              {quantity === 0 ? (
                <Button variant="dark" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <Button
                    variant="outline-dark"
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        selectedSize,
                        quantity - 1
                      )
                    }
                  >
                    −
                  </Button>

                  <strong>{quantity}</strong>

                  <Button
                    variant="outline-dark"
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        selectedSize,
                        quantity + 1
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              )}

              <Button
                variant="outline-danger"
                onClick={() => addToWishlist(product)}
              >
                ❤️ Wishlist
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProductDetails;
