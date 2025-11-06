import React from 'react';

// Sample static orders — replace with real API data if available
const orders = [
  {
    id: 'ORD123456',
    date: '2025-09-20',
    total: '$150.00',
    status: 'Delivered',
    items: [
      { name: 'Product A', qty: 1 },
      { name: 'Product B', qty: 2 },
    ],
  },
  {
    id: 'ORD123457',
    date: '2025-08-15',
    total: '$80.00',
    status: 'Processing',
    items: [
      { name: 'Product C', qty: 1 },
    ],
  },
];

const UserOrders = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-gray-700">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <ul className="list-disc ml-5 mb-2">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} &times; {item.qty}
                    </li>
                  ))}
                </ul>
                <p className="font-medium text-gray-800">Total: {order.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
