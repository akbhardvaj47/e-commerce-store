import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "../pages/ItemCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const location = useLocation();

  const PRODUCT_URL = "http://localhost:8080/api/products/";

  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_URL);
      const data = await res.json();
      setProducts(data.products);
      setFiltered(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery && products.length > 0) {
      const q = searchQuery.toLowerCase();

      const filteredItems = products.filter((p) => {
        const name = p.name?.toLowerCase() || "";
        const desc = p.description?.toLowerCase() || "";
        const catName = p.category?.categoryName?.toLowerCase() || "";
        const catDesc = p.category?.description?.toLowerCase() || "";

        return (
          name.includes(q) ||
          desc.includes(q) ||
          catName.includes(q) ||
          catDesc.includes(q)
        );
      });
      setFiltered(filteredItems);
    } else {
      setFiltered(products);
    }
  }, [location.search, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-white bg-pink-600 p-2 rounded">
        Shop Products
      </h1>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filtered.map((item, i) => (
            <ItemCard key={i} product={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No matching products found.</p>
      )}
    </div>
  );
}
