import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const CategoriesPage = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  // const [auth] = useAuth();
  const { auth, setAuth, loading } = useAuth();

  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryImage: "",
  });

  // Fetch all categories
  const fetchAllCategories = async () => {
    try {
      const res = await fetch(`${url}/api/category/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  // Delete category
  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${url}/api/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });
      const data = await res.json();
      toast.success(data.message);
      fetchAllCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // Update category
  const updateCategory = async (id) => {
    try {
      const res = await fetch(`${url}/api/category/update-category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      toast.success(data.message);
      fetchAllCategories();
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Create category
  const createCategory = async () => {
    if (!newCategory.categoryName.trim() || !newCategory.categoryImage.trim()) {
      toast.error("Please fill all fields before submitting");
      return;
    }
    try {
      const res = await fetch(`${url}/api/category/create-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      if (!data.status) {
        toast.error(data.message);
      } else {
        toast.success("Category added successfully");
      }
      fetchAllCategories();
      setShowForm(false);
      setNewCategory({ categoryName: "", categoryImage: "" });
    } catch (error) {
      toast.error("Something went wrong while creating category");
      // console.error("error in creating category");
    }
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative p-6">
    {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
          <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-yellow-600">
          🗂️ Manage Categories
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
          }}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition"
        >
          <FaPlus /> Add New
        </button>
      </div>

      {/* Category Grid */}
      {categories.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No categories available.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <motion.div
              key={cat._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={cat.categoryImage}
                alt={cat.categoryName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {cat.categoryName}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditCategoryId(cat._id);
                      setNewCategory({
                        categoryName: cat.categoryName,
                        categoryImage: cat.categoryImage,
                      });
                      setShowForm(true);
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="flex items-center gap-1 text-pink-600 hover:text-pink-700 font-medium"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                isEditing ? updateCategory(editCategoryId) : createCategory();
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                {isEditing ? "✏️ Update Category" : "➕ Add Category"}
              </h2>

              <label className="block text-gray-600 font-medium mb-1">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={newCategory.categoryName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="Enter category name"
              />

              <label className="block text-gray-600 font-medium mb-1">
                Category Image URL
              </label>
              <input
                type="text"
                name="categoryImage"
                value={newCategory.categoryImage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mb-6 focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="Enter image URL"
              />

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-red-600 font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesPage;
