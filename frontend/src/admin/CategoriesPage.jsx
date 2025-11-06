import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

// Done this page with admin crud

const CategoriesPage = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategories, setNewCategories] = useState({
    categoryName: "",
    categoryImage: ""
  });

  // Fetch all / Read categories
  const fetchAllCategories = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/category/categories', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth.token,
        },
      });
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  // Delete Category
  const deleteCat = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth.token
        },
      });
      const data = await res.json();
      toast.success(data.message);
      fetchAllCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // Update Category
  const updateCategory = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/category/update-category/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth.token,
        },
        body: JSON.stringify(newCategories),
      });
      const data = await res.json();
      toast.success(data.message);
      fetchAllCategories();
      setShowForm(false)
    } catch (error) {
      console.error(error);
    }
  };

  // create category
  const createCategory = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/category/create-category', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          Authorization: auth.token
        },
        body: JSON.stringify(newCategories)
      })
      const data = await res.json()
      setNewCategories(data.category)
      setShowForm(false)
      toast.success("Category added successfully")
      fetchAllCategories()
      setNewCategories({
        categoryImage: "",
        categoryName: ""
      })

    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = async (e) => {
    setNewCategories({
      ...newCategories, [e.target.name]: e.target.value
    })
  }
  return (
    <div className=' relative'>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center p-3">
        <h2 className="text-green-600 text-2xl font-bold mb-2 sm:m-0">All Categories</h2>
        <button
          onClick={() => {
            setShowForm(true)
            setIsEditing(false)
          }}
          className="bg-green-600 cursor-pointer px-4 py-2 text-white font-bold rounded-2xl"
        >
          Add New Category
        </button>
      </div>

      <table className="w-full table-auto border-collapse shadow-md rounded overflow-hidden">
        <thead>
          <tr className="bg-pink-500 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {categories.map((cat) => (
            <tr
              key={cat._id}
              className="border-b cursor-pointer border-gray-200 hover:bg-green-300 transition duration-200"
            >
              <td className="py-3 px-6 text-left font-bold whitespace-nowrap">{cat.categoryName}</td>
              <td className="py-3 px-6">
                <img
                  src={cat.categoryImage}
                  alt={cat.categoryName}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="py-3 px-6">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => {
                      setShowForm(true)
                      setIsEditing(true)
                      setEditCategoryId(cat._id)
                      setNewCategories({
                        categoryName: cat.categoryName,
                        categoryImage: cat.categoryImage
                      })
                    }}
                    className="bg-blue-500 font-bold cursor-pointer hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCat(cat._id)}
                    className="bg-pink-500 font-bold cursor-pointer hover:bg-pink-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="absolute inset-0 bg-opacity-10 flex justify-center items-center -top-50" style={{ background: "#00000044" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              isEditing ? updateCategory(editCategoryId) : createCategory()
            }}
            className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {isEditing ? "Update category" : "Add New Category"}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={newCategories.categoryName}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category Image URL
              </label>
              <input
                type="text"
                name="categoryImage"
                value={newCategories.categoryImage}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
              >
                {isEditing ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-red-600 underline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
