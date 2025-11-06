import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-pink-600">
          User Dashboard
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <NavLink
                to="/user"
                end
                className={({ isActive }) =>
                  `block px-6 py-3 rounded transition ${
                    isActive
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/user/profile"
                className={({ isActive }) =>
                  `block px-6 py-3 rounded transition ${
                    isActive
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/user/orders"
                className={({ isActive }) =>
                  `block px-6 py-3 rounded transition ${
                    isActive
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'
                  }`
                }
              >
                My Orders
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/user/settings"
                className={({ isActive }) =>
                  `block px-6 py-3 rounded transition ${
                    isActive
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'
                  }`
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl text-center text-pink-600 font-semibold mb-6">
          Welcome, {auth?.username || "User"}
        </h1>
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
