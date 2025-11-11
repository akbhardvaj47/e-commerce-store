import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminUsers = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
//   const [auth] = useAuth();
const { auth, setAuth, loading } = useAuth();

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch Users
  const fetchUsers = async () => {
    if (!auth.token) return;
    try {
      const res = await fetch(`${url}/api/auth/admin/users/`, {
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${auth.token}`,
}

      });
      const data = await res.json();
      if (res.ok) setUsers(data.users || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth.token]);

  // Delete User
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${url}/api/auth/admin/users/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User deleted");
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting user");
    }
  };

  // Handle Edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // Handle Change
  const handleChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  // Update User
  const updateUser = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/api/auth/admin/users/update-user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify(editingUser),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User updated successfully");
        setShowModal(false);
        fetchUsers();
      } else toast.error(data.message || "Failed to update user");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
          <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            👥 User Management
          </h1>
          <p className="text-gray-500 text-sm">
            View, edit, and manage registered users
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={user._id}
                  className={`border-t hover:bg-green-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 text-gray-600">{i + 1}</td>
                  <td className="p-3 font-medium text-gray-800">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3 text-gray-600">{user.phone || "-"}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      user.role === "admin" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
              ✏️ Edit User
            </h2>

            <form onSubmit={(e) => updateUser(e, editingUser._id)}>
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="text"
                  name="phone"
                  value={editingUser.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
