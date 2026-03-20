import { notifySuccess } from "../utils/notify";

function ProductCard({
  product,
  selectedSize,
  onSizeChange,
  getQuantity,
  addToCart,
  removeFromCart,
  isWishlisted,
  addToWishlist,
  removeFromWishlist,
}) {
  const quantity = getQuantity(product.id, selectedSize);

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <img src={product.image} alt={product.title}/>

      <h4>{product.title}</h4>
      <p>₹{Math.round(product.price * 80)}</p>

      <select
        value={selectedSize || ""}
        onChange={(e) =>
          onSizeChange(product.id, e.target.value)
        }
      >
        <option value="">Select Size</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>

      {quantity === 0 ? (
        <button
          disabled={!selectedSize}
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              image: product.thumbnail,
              size: selectedSize,
            });
            notifySuccess("Product added to cart!");
          }}
        >
          Add to Cart
        </button>
      ) : (
        <div className="qty-controls">
          <button
            disabled={!selectedSize}
            onClick={() =>
              removeFromCart(
                product.id,
                selectedSize
              )
            }
          >
            ➖
          </button>

          <span>Added ({quantity})</span>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.thumbnail,
                size: selectedSize,
              })
            }
          >
            ➕
          </button>
        </div>
      )}

      <button
        className="wishlist-btn"
        onClick={() =>
          isWishlisted(product.id)
            ? removeFromWishlist(product.id)
            : addToWishlist({
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.thumbnail,
              })
        }
      >
        {isWishlisted(product.id) ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default ProductCard;


