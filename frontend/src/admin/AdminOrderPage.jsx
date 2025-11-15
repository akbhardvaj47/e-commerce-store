import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;

        const res = await fetch(`${url}/api/orders/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="p-5 border rounded-lg shadow bg-white">
            <h2 className="font-bold">Order ID: {order._id}</h2>
            <p>User: {order.user?.name} ({order.user?.email})</p>
            <p>Total Amount: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>

            <div className="mt-3">
              {order.products.map((item) => (
                <div key={item._id} className="flex justify-between border-b py-2">
                  <span>{item.product?.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.product?.discountedPrice}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
