import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const res = await fetch("http://localhost:8080/api/cart", {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    if (!window.confirm("Remove this item from your cart?")) return;
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      await fetch(`http://localhost:8080/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      toast.success('Item has been removed!')
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      await fetch(`http://localhost:8080/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId, quantity: newQty }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-600">Loading cart...</p>;
  if (!cart || cart.products.length === 0)
    return <p className="text-center py-20 text-gray-500 text-xl">🛒 Your cart is empty.</p>;

  // calculate totals
  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.product.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Cart Items */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {cart.products.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 py-5 gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.image || "/placeholder.jpg"}
                  alt={item.product.name}
                  className="w-24 h-24 object-contain rounded-md border"
                />
                <div>
                  <h2 className="font-semibold text-gray-800 text-lg">{item.product.name}</h2>
                  <p className="text-gray-500 text-sm line-clamp-1">
                    {item.product.description}
                  </p>
                  <p className="text-pink-600 font-bold text-lg mt-1">
                    ₹{item.product.discountedPrice}.00
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex justify-center items-center text-lg"
                >
                  −
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex justify-center items-center text-lg"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.product._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Right Section - Summary */}
        <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t border-gray-300 my-3"></div>
          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <button onClick={()=>navigate('/checkout')} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
