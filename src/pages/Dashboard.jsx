
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ProductSkeleton from "../Components/ProductSkeleton";

// function Dashboard({
//   cart,
//   searchQuery,
// }) {

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [selectedSizes, setSelectedSizes] = useState({});
//   const [category, setCategory] = useState("all");
//   const [priceRange, setPriceRange] = useState("all");
//   const [sortBy, setSortBy] = useState("relevance");
//   const [discount, setDiscount] = useState(0);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(5000);
//   const [debouncedSearch, setDebouncedSearch] = useState("");

  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);


//   useEffect(() => {
//     const fetchClothing = async () => {
//       try {

//         setLoading(true);


//         const men = await axios.get(
//           "http://127.0.0.1:5000/api/products"
//         );
//         const womenTops = await axios.get(
//           "http://127.0.0.1:5000/api/products"
//         );  
//         const womenDresses = await axios.get(
//           "http://127.0.0.1:5000/api/products"
//         );

//         const allProducts = [
//           ...men.data.products,
//           ...womenTops.data.products,
//           ...womenDresses.data.products,
//         ];

//         setProducts(allProducts);

//         localStorage.setItem(
//           "products",
//           JSON.stringify(allProducts)
//       );
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClothing();
//   }, []);

//   const handleSizeChange = (id, size) => {
//     setSelectedSizes((prev) => ({ ...prev, [id]: size }));
//   };

//   const handleSearchClick = () => {
//     setDebouncedSearch(searchQuery);
//   }

//   const getQuantity = (id, size) => {
//     if (!cart) return 0;

//     const item = cart.find(
//       (i) => i.id === id && i.size === size
//     );
//     return item ? item.quantity : 0;
//   };



//   const filteredProducts = products.filter((product) => {
//     if (category === "men" && product.category !== "mens-shirts") {
//       return false;
//     }
//     if (category === "men" && !product.category.startsWith("mens")) {
//       return false;
//     }
//     if (
//       category === "women" &&
//       product.category !== "womens-dresses" &&
//       product.category !== "tops"
//     ) {
//       return false;
//     }

//     if (debouncedSearch) {
//       const query = debouncedSearch.toLowerCase();

//       const titleMatch = product.title
//         .toLowerCase()
//         .includes(query);

//       const categoryMatch = product.category
//         .toLowerCase()
//         .includes(query);

//       if (query.includes("men") && !product.category.startsWith("mens")) {
//         return false;
//       }

//       if (
//         query.includes("women") &&
//         !product.category.startsWith("womens") &&
//         product.category !== "tops"
//       ) {
//         return false;
//       }

//       if (!titleMatch && !categoryMatch) {
//         return false;
//       }
//     }

//   const priceInRupees = Math.round(product.price * 80);

//   if (priceRange === "below1000" && priceInRupees >= 1000) {
//     return false;
//   }

//   if (
//     priceRange === "1000to2000" &&
//     (priceInRupees < 1000 || priceInRupees > 2000)
//   ) {
//     return false;
//   }

//   if (priceRange === "above2000" && priceInRupees <= 2000) {
//     return false;
//   }

//   if (priceInRupees < minPrice || priceInRupees > maxPrice) {
//     return false;
//   }

//   if (discount > 0 && product.discountPercentage < discount) {
//     return false;
//   }

//     return true;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === "low-high") return a.price - b.price;
//     if (sortBy === "high-low") return b.price - a.price;
//     return 0;
//   });

//   const clearFilters = () =>{
//     setCategory("all");
//     setMinPrice("0");
//     setMaxPrice("5000");
//     setDiscount("all");;
//     setSortBy("relevance");
//     setPriceRange("all");
//   };

//   return (
//     <>


//       <div className="home-layout">
//         <aside className="filters-panel">
//           <details className="filters-mobile">
//           <summary><strong>Filters</strong></summary>
//           <br />
//           <div className="filter-block">
//             <h4>Category</h4>
//           <label>
//             <input
//               type="radio"
//               checked={category === "all"}
//               onChange={() => setCategory("all")}
//             />
//             All
//           </label>

//           <label>
//             <input
//               type="radio"
//               checked={category === "men"}
//               onChange={() => setCategory("men")}
//             />
//             Men
//           </label>

//           <label>
//             <input
//               type="radio"
//               checked={category === "women"}
//               onChange={() => setCategory("women")}
//             />
//             Women
//           </label>

//           <h4>Sort By</h4>

//           <label>
//             <input 
//               type="radio"
//               checked={sortBy === "relevance"}
//               onChange={() => setSortBy("Relevance")}
//             />
//             Relevance
//           </label>
//           <label>
//             <input
//               type="radio"
//               checked={sortBy === "low-high"}
//               onChange={() => setSortBy("low-high")}
//             />
//             Price: Low → High
//           </label>

//           <label>
//             <input
//               type="radio"
//               checked={sortBy === "high-low"}
//               onChange={() => setSortBy("high-low")}
//             />
//             Price: High → Low
//           </label>
//         </div>

//         <div className="filter-block">
//           <h4>Price</h4>

//           <label>
//             <input 
//               type="range" 
//               min="0"
//               max="5000"
//               step="500"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//             />
//           </label>

//           <div className="price-values"> 
//             <span>₹{minPrice}</span>
//             <span>₹{maxPrice}+</span>
//           </div>

//           <br />

//           <label>
//             <input 
//               type="radio"
//               name="price"
//               checked={priceRange === "all"}
//               onChange={() => setPriceRange("all")}
//             />
//             All
//           </label>

//           <label>
//             <input 
//               type="radio"
//               name="price"
//               checked={priceRange === "below1000"}
//               onChange={() => setPriceRange("below1000")} 
//             />
//             Below ₹1000
//           </label>

//           <label>
//             <input 
//               type="radio"
//               name="price"
//               checked={priceRange === "1000to2000"}
//               onChange={() => setPriceRange("1000to2000")} 
//             />
//             ₹1000 - ₹2000
//           </label>

//           <label>
//             <input 
//               type="radio"
//               name="price"
//               checked={priceRange === "above2000"}
//               onChange={() => setPriceRange("above2000")} 
//             />
//             Above ₹2000
//           </label>

//         </div>
//           <div className="filter-block">
//             <h4>Discount</h4>

//              <label>
//                <input
//                  type="radio"
//                  name="discount"
//                  checked={discount === "all"}
//                  onChange={() => setDiscount("all")}
//                />
//                All
//              </label>

//              <label>
//                 <input 
//                   type="radio" 
//                   name="discount"
//                   checked={discount === 10}
//                   onChange={() => setDiscount(10)}
//                   />
//                   10% & Above
//              </label> 

//              <label>
//                 <input 
//                   type="radio"
//                   name="discount"
//                   checked={discount === 30}
//                   onChange={() => setDiscount(30)} 
//                 />
//                 30% & Above
//              </label>

//              <label>
//                 <input 
//                   type="radio"
//                   name="discount"
//                   checked={discount === 50}
//                   onChange={() => setDiscount(50)} 
//                 />
//                 50% & Above
//              </label>
//           </div>

//           <button className="clear-filters-btn" onClick={clearFilters}>
//             Clear Filter
//           </button>
//           </details>
//         </aside>

//         {/* ---------- PRODUCTS ---------- */}
//         {/* <section className="products">
//           {sortedProducts.map((product) => {
//             const size = selectedSizes[product.id];
//             const qty = getQuantity(product.id, size);

//             return (
//               <div 
//                 className="product-card" 
//                 key={product.id}
//                 style={{ cursor : "pointer"}}
//                 onClick={() =>
//                   navigate(`/product/${product.id}`,{
//                     state: {product},
//                   })
//                 }
//                 >
//                 <img src={product.thumbnail} alt={product.title} />
//                 <h4>{product.title}</h4>
//                 <p>₹{Math.round(product.price * 80)}</p>
//               </div>
//             );
//           })}
//         </section> */}

//         <section className="products">
//           {loading
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <ProductSkeleton key={index} />
//               ))
//             : sortedProducts.map((product) => (
//                 <div
//                   className="product-card"
//                   key={product.id}
//                   style={{ cursor: "pointer" }}
//                   onClick={() =>
//                     navigate(`/product/${product.id}`, {
//                       state: { product },
//                     })
//                   }
//                 >
//                   <img src={product.thumbnail} alt={product.title} />
//                   <h4>{product.title}</h4>
//                   <p>₹{Math.round(product.price * 80)}</p>
//                 </div>
//               ))}
//         </section>



//       </div>
//     </>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../Components/ProductSkeleton";

function Dashboard({ cart, searchQuery }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* ---------------- Debounce Search ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* ---------------- Fetch Products ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- Filters ---------------- */
  const filteredProducts = products.filter((product) => {
    // Category mapping
    if (category === "men" && product.category !== "mens-shirts") {
      return false;
    }

    if (
      category === "women" &&
      product.category !== "womens-dresses" &&
      product.category !== "tops"
    ) {
      return false;
    }

    // Search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      if (
        !product.name.toLowerCase().includes(query) &&
        !product.category.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Price
    const price = Math.round(product.price);

    if (priceRange === "below1000" && price >= 1000) return false;
    if (
      priceRange === "1000to2000" &&
      (price < 1000 || price > 2000)
    )
      return false;
    if (priceRange === "above2000" && price <= 2000) return false;

    if (price < minPrice || price > maxPrice) return false;

    return true;
  });

  /* ---------------- Sorting ---------------- */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return 0;
  });

  const clearFilters = () => {
    setCategory("all");
    setPriceRange("all");
    setMinPrice(0);
    setMaxPrice(5000);
    setSortBy("relevance");
  };

  return (
    <div className="home-layout">
      {/* ---------------- Filters ---------------- */}
      <aside className="filters-panel">
        <details className="filters-mobile">
          <summary>
            <strong>Filters</strong>
          </summary>

          <div className="filter-block">
            <h4>Category</h4>

            <label>
              <input
                type="radio"
                checked={category === "all"}
                onChange={() => setCategory("all")}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                checked={category === "men"}
                onChange={() => setCategory("men")}
              />
              Men
            </label>

            <label>
              <input
                type="radio"
                checked={category === "women"}
                onChange={() => setCategory("women")}
              />
              Women
            </label>
          </div>

          <div className="filter-block">
            <h4>Sort By</h4>

            <label>
              <input
                type="radio"
                checked={sortBy === "relevance"}
                onChange={() => setSortBy("relevance")}
              />
              Relevance
            </label>

            <label>
              <input
                type="radio"
                checked={sortBy === "low-high"}
                onChange={() => setSortBy("low-high")}
              />
              Price: Low → High
            </label>

            <label>
              <input
                type="radio"
                checked={sortBy === "high-low"}
                onChange={() => setSortBy("high-low")}
              />
              Price: High → Low
            </label>
          </div>

          <div className="filter-block">
            <h4>Price</h4>

            <input
              type="range"
              min="0"
              max="5000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />

            <div className="price-values">
              <span>₹{minPrice}</span>
              <span>₹{maxPrice}+</span>
            </div>

            <br />
            <label>
              <input
                type="radio"
                checked={priceRange === "all"}
                onChange={() => setPriceRange("all")}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                checked={priceRange === "below1000"}
                onChange={() => setPriceRange("below1000")}
              />
              Below ₹1000
            </label>

            <label>
              <input
                type="radio"
                checked={priceRange === "1000to2000"}
                onChange={() => setPriceRange("1000to2000")}
              />
              ₹1000 – ₹2000
            </label>

            <label>
              <input
                type="radio"
                checked={priceRange === "above2000"}
                onChange={() => setPriceRange("above2000")}
              />
              Above ₹2000
            </label>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </details>
      </aside>

      {/* ---------------- Products ---------------- */}
      <section className="products">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : sortedProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() =>
                  navigate(`/product/${product.id}`, {
                    state: { product },
                  })
                }
              >
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
              </div>
            ))}
      </section>
    </div>
  );
}

export default Dashboard;
