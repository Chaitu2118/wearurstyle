import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    title: "Kurti",
    price: 799,
    image: "/images/kurti.jpg",
  },
  {
    id: 2,
    title: "T-Shirt",
    price: 499,
    image: "/images/tshirt.jpg",
  },
];

function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductGrid;
