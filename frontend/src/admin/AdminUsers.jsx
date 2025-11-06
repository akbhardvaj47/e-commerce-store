import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

const AdminUsers = () => {
    const [auth] = useAuth();
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (user) => {  // sent item from edit button and keep it in user parameter form 
        setEditingUser(user); // saved in editing user  state
        setShowModal(true);
    };
    const fetchUsers = async () => {
        if (!auth.token) return;

        try {
            const res = await fetch("http://localhost:8080/api/auth/admin/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth.token,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await res.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [auth.token]);

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/auth/admin/users/delete-user/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth.token
                }
            })
            const data = await res.json()
            if (res.ok) {
                toast.success(data.message);
            }

            fetchUsers()
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setEditingUser({
            ...editingUser,
            [e.target.name]: e.target.value,
        });
    };

    const updateUser = async (e, id) => {
        try {
            e.preventDefault()
            const res = await fetch(`http://localhost:8080/api/auth/admin/users/update-user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth.token
                },
                body: JSON.stringify(editingUser)
            })
            const data = await res.json()
            // console.log(data);
            if (res.ok) {
                toast.success(data.message);
                fetchUsers(); // refresh list
                setShowModal(false);
                setEditingUser(null);
            } else {
                toast.error(data.message || "Failed to update user");
            }
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 relative">
            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl mb-4 text-pink-600 font-bold text-center sm:text-left">
                    User Management
                </h1>

                {/* Wrap table in horizontal scroll container */}
                <div className="w-full sm:overflow-x-auto">
                    <table className=" w-[100%] table-auto border-collapse shadow-md rounded overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700 text-xs sm:text-xl">
                            <tr>
                                <th className="py-3 px-4 text-left">Sr. No</th>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Phone</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Role</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, i) => (
                                <tr
                                    key={item._id}
                                    className="border-b border-cyan-400 hover:bg-green-300 text-xs sm:text-sm"
                                >
                                    <td className="py-3 px-4">{i + 1}</td>
                                    <td className="py-3 px-4 break-words max-w-[100px]">{item._id}</td>
                                    <td className="py-3 px-4">{item.name}</td>
                                    <td className="py-3 px-4">{item.phone}</td>
                                    <td className="py-3 px-4 break-words">{item.email}</td>
                                    <td className="py-3 px-4">
                                        {item.role === 1 ? "Admin" : "User"}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-wrap sm:flex-nowrap gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteUser(item._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>


            {showModal && editingUser && (
                <div className="absolute inset-0 bg-opacity-10 flex justify-center items-center -top-50" style={{ background: "#00000044" }}>
                    <div className="bg-white rounded-lg p-6  max-w-lg">
                        <h2 className="text-xl font-semibold mb-4 text-center p-2 text-green-600 border-b-2 border-green-600">Edit User</h2>
                        <form onSubmit={(e) => updateUser(e, editingUser._id)}>
                            <input
                                type="text"
                                name='name'
                                value={editingUser.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border outline-0 border-pink-500 px-3 py-2 mb-3 rounded"
                            />
                            <input
                                type="email"
                                name='email'
                                value={editingUser.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border outline-0 border-pink-500 px-3 py-2 mb-3 rounded"
                            />
                            <input
                                type="text"
                                name='phone'
                                value={editingUser.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full border outline-0 border-pink-500 px-3 py-2 mb-3 rounded"
                            />
                            <select
                                name='role'
                                value={editingUser.role}
                                onChange={handleChange}
                                className="w-full border outline-0 border-pink-500 px-3 py-2 mb-3 rounded"
                            >
                                <option value="0">User</option>
                                <option value="1">Admin</option>
                            </select>

                            <div className="flex outline-0 justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingUser(null);
                                    }}
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-1 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-1 px-4 rounded"
                                >
                                    {editingUser ? "Update" : "Save"}
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
