import Container from "react-bootstrap/Container";
import { confirmToast } from "../utils/confirmToast";
import { useCart } from "../context/CartContext";
import { Button, Card, TabPane } from "react-bootstrap";
import { useMemo } from "react";

function Cart() {
  const {
    cart,
    updateQuantity,
    clearCart,
  } = useCart();

  // const handlePlaceOrder = () => {
  //   const order = {
  //     id: Date.now(),
  //     date: new Date().toLocaleDateString(),
  //     items: cart,
  //     total: cart.reduce(
  //       (sum, item) => sum + item.price * item.quantity * 80,
  //       0
  //     ),
  //   };

  //   // 👉 adjust if you store user differently
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   const existingOrders =
  //     JSON.parse(localStorage.getItem(`orders_${user?.email}`)) || [];

  //   localStorage.setItem(
  //     `orders_${user?.email}`,
  //     JSON.stringify([...existingOrders, order])
  //   );

  //   clearCart();
  // };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      const totalAmount = cart.reduce(
        (sum, item) =>
          sum + Number(item.price) * Number(item.quantity),
        0
      );

      const res = await fetch("http://127.0.0.1:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          totalAmount
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to place order");
        return;
      }

      alert("Order placed successfully!");

      clearCart(); // clear cart context
    } catch (error) {
      alert("Server error");
    }
  };


  // const totalAmount = useMemo(() => {
  //   return cart.reduce(
  //     (sum, item) => sum + item.price * item.quantity * 80,
  //     0
  //   );
  // }, [cart]);

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.quantity),
      0
    );
  }, [cart]);


  return (
    <Container className="cart-page my-4">
      {cart.length === 0 && (
        <h4>
          <p className="text-center mt-4">
            Your cart is empty 🛒
          </p>
        </h4>
      )}

      {cart.map((item) => (
        <div
          key={`${item.productId}-${item.size}`}
          className="cart-item"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="cart-item-image"
          />

          {/* Details */}
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p className="cart-price">
              ₹{Math.round(item.price * 80)}
            </p>
            <p className="cart-size">
              Size: {item.size}
            </p>
          </div>

          {/* Quantity controls */}
          <div className="cart-qty-controls">
            <button
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.size,
                  item.quantity - 1
                )
              }
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.size,
                  item.quantity + 1
                )
              }
            >
              +
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <Card className="mt-4 p-3">
          <h5>Price Details</h5>
          <hr />

          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <Button
            variant="dark"
            className="place-order-btn mt-3 w-100"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>

          <Button
            variant="outline-danger"
            className="mt-2 w-100"
            onClick={() =>
              confirmToast(
                "Clear all items from cart?",
                clearCart
              )
            }
          >
            Clear Cart
          </Button>
        </Card>
      )}
    </Container>
  );
}

export default Cart;
