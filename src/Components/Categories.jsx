function Categories() {
  const categories = [
    "Ethnic Wear",
    "Western",
    "Menswear",
    "Footwear",
    "Home Decor",
    "Beauty",
    "Accessories",
  ];

  return (
    <div className="categories">
      {categories.map((cat) => (
        <div key={cat} className="category-item">
          {cat}
        </div>
      ))}
    </div>
  );
}

export default Categories;
