
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeCarousel from "../Components/HomeCarousel";

function Home() {
  return (
    <>
      <div className="bg-dark text-white text-center py-5 w-100 px-0">
        <h1 className="fw-bold">Clothing Collection</h1>
        <p>Lowest prices | Best quality </p>
      </div>

      {/* Categories */}
      <div className="w-100 px-0 border-bottom">
        <div className="d-flex justify-content-around py-3">
          <span>Men</span>
          <span>Women</span>
          <span>Ethnic Wear</span>
          <span>Western</span>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-100 px-0">
        <HomeCarousel />
      </div>


      {/* 🎁 Offers Section */}
      <Container fluid className="py-4">
        <Row className="text-center g-3">
          <Col md={4}>
            <div className="border rounded p-3">
              🔥 50% OFF on First Order
            </div>
          </Col>
          <Col md={4}>
            <div className="border rounded p-3">
              🚚 All at your one step
            </div>
          </Col>
          <Col md={4}>
            <div className="border rounded p-3">
              🆕 New Arrivals
            </div>
          </Col>
        </Row>
      </Container>

      {/* 🔐 Login Hint */}
      <Container className="text-center py-5">
        <h4>Please <a href="Login">login</a> to start shopping</h4>
      </Container>
    </>
  );
}

export default Home;

