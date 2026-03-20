
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { notifySuccess } from "../utils/notify";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {

  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <h4 className="text-center mt-4">Your wishlist is empty ❤️</h4>;
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">My Wishlist</h2>

      <Row className="g-4">
        {wishlist.map((item) => (
          <Col
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Card className="wishlist-card h-100">
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                className="wishlist-img"
              />


              <Card.Body className="d-flex flex-column">
                <Card.Title className="wishlist-title">
                  {item.name}
                </Card.Title>

                <Card.Text className="fw-bold">
                  ₹{Math.round(item.price * 80)}
                </Card.Text>

                <Button
                  variant="outline-danger"
                  className="mt-auto"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Wishlist;
