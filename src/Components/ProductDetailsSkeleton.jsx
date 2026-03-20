import "./ProductDetailsSkeleton.css";

function ProductDetailsSkeleton() {
  return (
    <div className="product-details-skeleton">
      <div className="skeleton-image"></div>

      <div className="skeleton-content">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line price"></div>
        <div className="skeleton-line desc"></div>
        <div className="skeleton-line desc short"></div>

        <div className="skeleton-buttons">
          <div className="skeleton-btn"></div>
          <div className="skeleton-btn"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
