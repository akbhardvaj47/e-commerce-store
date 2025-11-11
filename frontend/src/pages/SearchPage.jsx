import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

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
              className="border rounded-lg p-3 shadow hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <p className="text-sm font-semibold text-gray-800">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
