import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const url = import.meta.env.VITE_BACKEND_URL;

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;

        const res = await fetch(`${url}/api/cart`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!data?.products) {
          alert("Unable to load cart!");
          return;
        }

        setCart(data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, []);

  if (!cart)
    return (
      <p className="text-center mt-20 text-gray-600">Loading checkout details...</p>
    );

  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.product.discountedPrice * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a valid shipping address.");
      return;
    }

    setLoading(true);

    const token = JSON.parse(localStorage.getItem("auth"))?.token;

    try {
      const res = await fetch(`${url}/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: address,
          paymentMethod,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success) {
        toast.success("Order placed successfully!");
        navigate("/user/orders");
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing your order.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-8">

          {/* Checkout Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Secure Checkout
          </h1>

          {/* Step Indicator */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center">
              {[1, 2, 3].map((n) => (
                <>
                  <div
                    className={`rounded-full w-10 h-10 flex items-center justify-center text-white ${
                      step >= n ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  >
                    {n}
                  </div>
                  {n !== 3 && (
                    <div
                      className={`h-1 w-16 ${
                        step > n ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </>
              ))}
            </div>
          </div>

          {/* Step 1 - Address */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Shipping Address</h2>

              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                placeholder="Enter your full shipping address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>

              <div className="flex justify-between">
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-semibold transition"
                >
                  ← Back to Cart
                </button>

                <button
                  onClick={() => setStep(2)}
                  disabled={!address.trim()}
                  className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
                    address.trim()
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Review Order */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Review Your Order</h2>

              <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg mb-6">
                {cart.products.map((item) => (
                  <div key={item.product._id} className="flex justify-between p-4 items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">
                      ₹{item.product.discountedPrice * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3 text-gray-800">
                <span>Total:</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-semibold transition"
                >
                  ← Edit Address
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Proceed to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Method</h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 p-3 border rounded-lg hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    disabled
                  />
                  <span className="text-gray-500">UPI / Card (coming soon)</span>
                </label>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-semibold transition"
                >
                  ← Review Order
                </button>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  {loading ? "Placing Order..." : "Place Order ✓"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
