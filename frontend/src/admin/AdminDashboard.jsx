import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaThLarge } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth();
  const [data, setData] = useState({ users: 0, products: 0, categories: 0 });
  const [loading, setLoading] = useState(false); // ✅ loading state added
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  const navigate = useNavigate();

  // ✅ Fetch admin dashboard data
  const fetchData = async () => {
    try {
      setLoading(true); // show spinner
      const res = await axios.get(`${url}/api/auth/admin/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });

      if (!res.data.status) {
        toast.error(res.data.message);
        return;
      }

      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false); // hide spinner
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    navigate("/login");
    toast.success("Logged out successfully!");
  };
  return (
    <div className="relative flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
          <div className="w-14 h-14 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-md px-5 py-3 sticky top-0 z-30">
          <h2 className="text-lg text-center font-semibold text-pink-600">
            Admin Dashboard
          </h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* ✅ Welcome + Logout section */}
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, <span className="text-pink-600">{auth.user}</span> 👋
            </h1>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition duration-200"
            >
              Logout
            </button>
          </div>

          {/* ✅ Dashboard Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <NavLink to="/admin/users">
              <StatCard
                title="Total Users"
                value={data.users}
                icon={<FaUsers />}
                color="bg-pink-500"
              />
            </NavLink>

            <NavLink to="/admin/products">
              <StatCard
                title="Products"
                value={data.products}
                icon={<FaBoxOpen />}
                color="bg-green-500"
              />
            </NavLink>

            <NavLink to="/admin/categories">
              <StatCard
                title="Categories"
                value={data.categories}
                icon={<MdCategory />}
                color="bg-blue-500"
              />
            </NavLink>

            <StatCard
              title="Sales Today"
              value="$4,520"
              icon={<FaThLarge />}
              color="bg-yellow-500"
            />
          </div>

          {/* Nested Route Outlet */}
          <div className="bg-white p-6 rounded-lg shadow-md min-h-[50vh] border border-gray-100">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// ✅ Reusable Stat Card
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-200 border border-gray-100">
    <div>
      <p className="text-gray-500 text-sm font-semibold">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
    <div className={`${color} text-white p-3 rounded-full text-xl shadow-md`}>
      {icon}
    </div>
  </div>
);

export default AdminDashboard;
