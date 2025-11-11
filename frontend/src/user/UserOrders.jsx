import React from "react";

// Sample static orders — replace with real API data if available
const orders = [
  {
    id: "ORD123456",
    date: "2025-09-20",
    total: "$150.00",
    status: "Delivered",
    items: [
      { name: "Product A", qty: 1 },
      { name: "Product B", qty: 2 },
    ],
  },
  {
    id: "ORD123457",
    date: "2025-08-15",
    total: "$80.00",
    status: "Processing",
    items: [{ name: "Product C", qty: 1 }],
  },
  {
    id: "ORD123458",
    date: "2025-07-10",
    total: "$210.00",
    status: "Cancelled",
    items: [{ name: "Product D", qty: 1 }],
  },
];

const statusColors = {
  Delivered: "bg-green-100 text-green-700 border-green-300",
  Processing: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
};

const UserOrders = () => {
  return (
    <div className="min-h-[70vh] bg-white/80 backdrop-blur-md border border-pink-100 shadow-lg rounded-2xl p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-3">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center py-12 text-lg">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-800">{order.id}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Details */}
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {order.date}
                </p>

                <div>
                  <p className="font-medium text-gray-700 mb-1">Items:</p>
                  <ul className="list-disc ml-5 space-y-0.5">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.qty}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="font-semibold text-gray-800 pt-2">
                  Total: <span className="text-pink-600">{order.total}</span>
                </p>
              </div>

              {/* Button */}
              <button className="mt-5 w-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium py-2 rounded-lg shadow transition-all">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
