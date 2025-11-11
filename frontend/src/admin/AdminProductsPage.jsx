import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const AdminProductsPage = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  // const [auth] = useAuth();
  const { auth, setAuth } = useAuth();

  const token = auth.token;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/products/`);
      const data = await res.json();
      if (data.status) setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${url}/api/products/delete-product/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (data.status) {
        toast.success(data.message || "Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <>
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
          <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            🛍️ Manage Products
          </h1>
          <p className="text-sm text-gray-500">
            View, edit, or remove your store products
          </p>
        </div>

        <NavLink to="/admin/create-product">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md transition">
            <FaPlus /> Add Product
          </button>
        </NavLink>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
          <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No products available.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => (
                <tr
                  key={prod._id}
                  className={`border-t hover:bg-green-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">{prod.name}</td>
                  <td className="p-3 text-green-700 font-semibold">
                    ₹{prod.discountedPrice || prod.price}
                  </td>
                  <td className="p-3 text-gray-600">{prod.quantity}</td>
                  <td className="p-3 text-gray-600">
                    {prod.category?.categoryName || "-"}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <NavLink to={`/admin/update-product/${prod.slug}`}>
                      <button className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition">
                        <FaEdit /> Edit
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
