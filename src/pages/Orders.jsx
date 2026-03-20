import { Container, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [token]);

  if (orders.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h4>Your orders list is empty 📦</h4>
        <p className="text-muted">
          Looks like you haven’t placed any orders yet.
        </p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">My Orders</h2>

      {orders.map(order => (
        <Card key={order.id} className="mb-3">
          <Card.Body>
            <h6>Order ID: {order.id}</h6>
            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Total: ₹{order.total_amount}</p>
            <p>Status: {order.status}</p>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Orders;
