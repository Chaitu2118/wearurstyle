import "./ProductSkeleton.css";

function ProductSkeleton() {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton-img"></div>
      <div className="skeleton-text title"></div>
      <div className="skeleton-text price"></div>
    </div>
  );
}

export default ProductSkeleton;
