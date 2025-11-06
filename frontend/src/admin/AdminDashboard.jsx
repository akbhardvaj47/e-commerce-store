import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '../context/auth';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [auth]=useAuth()

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between bg-yellow-500 px-4 py-3 shadow-md">
        <h1 className="text-white text-xl font-bold">Admin Panel</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-yellow-500 mt-8 md:mt-0 w-64 md:sticky fixed z-40 top-0 left-0 h-screen transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out shadow-md`}
      >
        <nav className="mt-6 font-bold text-white">
          <div className="p-6 text-2xl font-bold">
            Admin Panel
          </div>
          <ul>
            <li className="mb-2">
              <NavLink
                to="/admin"
                className="block px-6 py-3 text-white hover:bg-green-100 hover:text-green-700 transition rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/categories"
                className="block px-6 py-3 text-white hover:bg-green-100 hover:text-green-700 transition rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Categories
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/users"
                className="block px-6 py-3 text-white hover:bg-green-100 hover:text-green-700 transition rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/products"
                className="block px-6 py-3 text-white hover:bg-green-100 hover:text-green-700 transition rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Products
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl sm:text-3xl text-center py-3 shadow-md text-pink-600 font-bold border-b border-pink-600">
          Welcome, Admin! {auth.username}
        </h1>
        <div className=' overflow-auto'><Outlet /></div>
      </main>
    </div>
  );
};

export default AdminDashboard;
