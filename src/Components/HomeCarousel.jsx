import Carousel from "react-bootstrap/Carousel";
import one from "../assets/one.jpg";
import three from "../assets/three.jpg"


function HomeCarousel() {
  return (
    <Carousel interval={3000} fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={one}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Lowest Prices</h3>
          <p>Best quality fashion at affordable prices</p>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item>
        <img
          className="d-block w-100"
          src={three}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Free Delivery</h3>
          <p>No minimum order value</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
