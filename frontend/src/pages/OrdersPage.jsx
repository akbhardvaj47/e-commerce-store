import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        const res = await fetch("http://localhost:8080/api/orders/myorders", {
          headers: { Authorization: token },
        });
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading your orders...
        </p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
          alt="No Orders"
          className="w-40 h-40 opacity-70 mb-6"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Orders Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t placed any orders yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Start Shopping →
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-200">
        <div className="p-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-700">
                      Order ID:{" "}
                      <span className="text-gray-500 text-sm">{order._id}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-gray-100">
                  {order.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between p-5"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-lg object-cover border"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: ₹{item.product.discountedPrice}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-800">
                        ₹{item.product.discountedPrice * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
                  <div className="text-gray-600 text-sm">
                    <p>Payment: {order.paymentMethod || "COD"}</p>
                    <p>Address: {order.shippingAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
