import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // ✅ Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const text = params.get("text") || params.get("q") || "";
    setQuery(text);
  }, [location.search]);

  // ✅ Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        const data = await res.json();
        if (data && data.products) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter products based on search query (title or description)
  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
    } else {
      const lower = query.toLowerCase();
      const filteredResults = allProducts.filter(
        (item) =>
          item.name?.toLowerCase().includes(lower) ||
          item.description?.toLowerCase().includes(lower)
      );
      setFiltered(filteredResults);
    }
  }, [query, allProducts]);

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h1>

      {query.trim() !== "" && filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : query.trim() === "" ? (
        <p className="text-gray-500">Please enter something to search.</p>
      ) : (
       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
  {filtered.map((item) => (
    <div
      key={item._id}
      onClick={() => handleProductClick(item.slug)}
      className="group bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Optional: Category Tag (if available) */}
        {item.categoryName && (
          <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
            {item.categoryName}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-3 w-full">
        <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-600">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {item.description}
        </p>
        <p className="text-lg font-bold text-blue-600 mt-2">₹{item.price}</p>
      </div>

      {/* Hover Action Button */}
      <div className="absolute bottom-0 left-0 w-full bg-blue-600 text-white py-2 opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm font-medium transition-all duration-300 rounded-b-2xl">
        View Details
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default SearchPage;
