import React, { useEffect, useState } from "react";
import toast, { ToastBar } from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const token = auth.token;
  const createdByUserId = auth.userId;
  const url = `${import.meta.env.VITE_BACKEND_URL}`;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPercentage: "",
    quantity: "",
    shipping: true,
    category: "",
    image: "",
    createdBy: createdByUserId,
  });

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${url}/api/products/create-product/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.status) {
        toast.success("✅ Product Created Successfully");
        navigate("/admin/products");
      } else {
        toast.error(data.message || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/api/category/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });

      const data = await res.json();
      if (!data.status){
        toast.error(data.message)
      }
      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
          <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          🛍️ Create New Product
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none resize-none"
            ></textarea>
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          </div>

          {/* Quantity & Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                name="shipping"
                checked={formData.shipping}
                onChange={handleChange}
                className="h-5 w-5 accent-green-500"
              />
              <label className="text-gray-700">Requires Shipping</label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Category
            </label>
            <select
              name="category"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Product Image URL
            </label>
            <input
              type="text"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
