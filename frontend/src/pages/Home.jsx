import ItemCard from "../pages/ItemCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const url = `${import.meta.env.VITE_BACKEND_URL}`


  const fetchAllCategories=async()=>{
    try {
      const res=await fetch(`${url}/api/category`);
      const data=await res.json()
      setCategories(data.categories)
      
    } catch (error) {
      console.log("Error in fetching category",error);
    }
  }

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await fetch(`${url}/api/products`);
      const data = await res.json();
      setProduct(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllProducts();
  }, []);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      // If same category clicked again → clear filter
      setSelectedCategory(null);
      setFilteredProducts(product);
    } else {
      setSelectedCategory(categoryId);
      const filtered = product.filter(
        (p) => p.category && p.category._id === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  

  const banners = [
    "https://graphicsfamily.com/wp-content/uploads/edd/2022/11/Simple-E-commerce-Banner-Design-1024x576.jpg",
    "https://cdn.dribbble.com/users/2254639/screenshots/18358413/media/e8a8db54cafb270e4c29d044a5a3f5dd.jpg?resize=1200x900&vertical=center",
    "https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Shop-Products-Social-Media-Banner-Design-Template-1180x664.jpg",
    "https://image.freepik.com/free-vector/shopping-vector-trendy-banner_36298-512.jpg",
  ];

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-white bg-pink-600 p-2 rounded">
        Buy Products with Latest Categories
      </h1>

      {/* Category Cards */}
      <div className="overflow-x-auto w-full">
        <div className="flex gap-4 mb-8 w-max px-4">
          {categories.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCategoryClick(item._id)}
              className={`cursor-pointer border rounded-lg p-2 flex flex-col items-center justify-center transition-shadow duration-300 ${selectedCategory === item._id
                ? "border-pink-600 shadow-md"
                : "border-gray-300 hover:shadow-md"
                }`}
              style={{ width: "130px", minWidth: "130px" }}>
              <img
                src={item.categoryImage}
                alt={item.categoryName}
                className="h-20 w-full object-cover rounded-md mb-2"
              />
              <span
                className={`text-center font-semibold ${selectedCategory === item._id
                  ? "text-pink-600"
                  : "text-gray-700"
                  }`}>
                {item.categoryName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Banners */}
      {/* <div className="relative">
        <div className="sm:mb-5 md:h-[60vh] sm:h-[40vh] w-full overflow-hidden rounded-lg shadow-lg">
          <div className="flex md:h-[60vh] sm:h-[40vh]">
            {banners.map((banner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mb-5 -z-50 w-full md:h-[60vh] sm:h-[40vh]"
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
      </div> */}

      {/* Clear Filters Button */}
      {selectedCategory && (
        <div className="flex gap-4 mb-8 items-center max-w-xs">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setFilteredProducts(product);
            }}
            className=" bg-green-500 text-white font-bold cursor-pointer rounded px-4 py-2 whitespace-nowrap"
          >
            Clear Filters
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-white bg-pink-600 p-2 rounded">
        {selectedCategory
          ? "Filtered Products"
          : "All Products are here"}
      </h1>

      {/* Product Grid */}
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
