import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate=useNavigate()
const [category, setCategory] = useState(null);

  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const url = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(`${url}/api/products/product/${slug}`, {
          headers: { Authorization: token },
        });
        const data = await res.json();
        setProduct(data.product);
        
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [slug]);



useEffect(() => {
  if (!product?._id) return;

  const getCategoryByProduct = async () => {
    try {
      const res = await axios.get(`${url}/api/category/${product._id}`);
      // console.log(res.data);
      
      if (res.data.success) {
        setCategory(res.data.categoryName); // store category data
      } else {
        console.warn("Category fetch failed:", res.data.message);
      }

    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  getCategoryByProduct();
}, [product?._id]);


  const handleAddToCart = async () => {
    try {
      if (!token) {
        alert("Please login to add items to cart.");
        return;
      }

      const res = await fetch(`${url}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (data.success) toast.success("Product added to cart successfully!");
      else toast.error("Failed to add product to cart.");
    } catch (err) {
      console.error(err);
      toast.error("Error adding product to cart.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading product...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-2xl">
        {/* ---------- Left: Product Image ---------- */}
        <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-10 relative">
          <img
            src={product?.image || "/placeholder.jpg"}
            alt={product?.name || "Product"}
            className="object-contain max-h-[450px] w-full transition-transform duration-500 hover:scale-105"
          />

            {/* <span className="absolute top-6 left-6 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {category}
            </span> */}
        </div>

        {/* ---------- Right: Product Details ---------- */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Pricing Section */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-2xl font-bold text-blue-600">
                  ₹{product.discountedPrice}.00
                </p>
                <p className="text-gray-400 line-through text-lg">
                  ₹{product.price}.00
                </p>
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  Save {product.discountPercentage}% on this item
                </p>
              )}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Category:</span>
                <p className="mt-1">{category}</p>
              </div>
              <div>
                <span className="font-semibold">Availability:</span>
                <p className="mt-1 text-green-600 font-medium">
                  In Stock
                </p>
              </div>
            </div>
          </div>

          {/* ---------- Action Buttons ---------- */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              🛒 Add to Cart
            </button>
            <button onClick={()=>navigate('/checkout')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Similar Products Section (Optional Placeholder) ---------- */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          You may also like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 opacity-60">
          <div className="h-48 bg-gray-100 rounded-xl"></div>
          <div className="h-48 bg-gray-100 rounded-xl"></div>
          <div className="h-48 bg-gray-100 rounded-xl"></div>
          <div className="h-48 bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
