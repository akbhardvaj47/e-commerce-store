import ItemCard from "../pages/ItemCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  const url = import.meta.env.VITE_BACKEND_URL;

  const banners = [
    "https://graphicsfamily.com/wp-content/uploads/edd/2022/11/Simple-E-commerce-Banner-Design-1024x576.jpg",
    "https://cdn.dribbble.com/users/2254639/screenshots/18358413/media/e8a8db54cafb270e4c29d044a5a3f5dd.jpg?resize=1200x900&vertical=center",
    "https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Shop-Products-Social-Media-Banner-Design-Template-1180x664.jpg",
    "https://image.freepik.com/free-vector/shopping-vector-trendy-banner_36298-512.jpg",
  ];

  // Auto-scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Fetch categories
  const fetchAllCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/category`);
      const data = await res.json();
      setCategories(data.categories || []);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching category", error);
      setLoading(false);
    }
  };

  // Fetch products
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/products`);
      const data = await res.json();
      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllProducts();
  }, []);

  // Handle category filter
  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setFilteredProducts(products);
    } else {
      setSelectedCategory(categoryId);
      const filtered = products.filter(
        (p) => p.category && p.category._id === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading)
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
        <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="mx-auto p-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8 text-white bg-pink-600 p-2 rounded text-center">
        Buy Products with Latest Categories
      </h1>

      {/* Categories */}
      <div className="overflow-x-auto w-full mb-8">
        <div className="flex gap-4 w-max px-4">
          {categories.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCategoryClick(item._id)}
              className={`cursor-pointer border rounded-lg p-2 flex flex-col items-center justify-center transition-shadow duration-300 ${
                selectedCategory === item._id
                  ? "border-pink-600 shadow-md"
                  : "border-gray-300 hover:shadow-md"
              }`}
              style={{ width: "130px", minWidth: "130px" }}
            >
              <img
                src={item.categoryImage}
                alt={item.categoryName}
                className="h-20 w-full object-cover rounded-md mb-2"
              />
              <span
                className={`text-center font-semibold ${
                  selectedCategory === item._id
                    ? "text-pink-600"
                    : "text-gray-700"
                }`}
              >
                {item.categoryName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Banners Carousel */}
      <div className="relative mb-8">
        <div className="overflow-hidden rounded-lg shadow-lg w-full md:h-[60vh] sm:h-[40vh]">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentBanner * 100}%)`,
              width: `${banners.length * 100}%`,
            }}
          >
            {banners.map((banner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:h-[60vh] sm:h-[40vh]"
              >
                <img
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                currentBanner === index ? "bg-pink-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {selectedCategory && (
        <div className="flex gap-4 mb-8 items-center max-w-xs">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setFilteredProducts(products);
            }}
            className="bg-green-500 text-white font-bold cursor-pointer rounded px-4 py-2 whitespace-nowrap"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products Header */}
      <h1 className="text-3xl font-bold mb-8 text-white bg-pink-600 p-2 rounded text-center">
        {selectedCategory ? "Filtered Products" : "All Products are here"}
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => <ItemCard key={i} product={item} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
