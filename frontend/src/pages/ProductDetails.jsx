import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const url=`${import.meta.env.VITE_BACKEND_URL}`
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(`${url}/api/products/product/${slug}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [slug]);


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

    if (data.success) {
      toast.success("Product added to cart successfully!")
    } else {
      toast.error("Failed to add product to cart.")
    }
  } catch (err) {
    console.error(err);
    toast.error("Error adding product to cart.");
  }
};


  if (loading) return <p className="text-center py-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col lg:flex-row border border-gray-200">
        
        {/* Image Section */}
        <div className="lg:w-1/2 bg-gray-100 flex justify-center items-center p-10">
          <img
            src={product?.image || "/placeholder.jpg"}
            alt={product?.name || "Product image"}
            className="object-contain max-h-[400px] w-full"
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-between">
          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-base mb-6 leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
              <div>
                <span className="font-semibold">Price:</span>  
                <p className="text-xl line-through italic text-yellow-600 mt-1">₹{product.price}.00</p>
              </div>
              <div>
                <span className="font-semibold">Discount:</span>
                <p>{product.discountPercentage}%</p>
              </div>
              <div>
                <span className="  font-semibold">Discounted Price:</span>
                <p className="text-2xl font-bold text-blue-600">₹{product.discountedPrice}.00</p>
              </div>
              {/* Optional: Category display */}
              <div>
                <span className="font-semibold">Category:</span>
                <p>{product.category?.categoryName}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full sm:w-auto">
              Add to Cart
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full sm:w-auto">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
