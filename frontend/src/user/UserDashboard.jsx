import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const UserDashboard = () => {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 border-b border-pink-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-pink-600 tracking-tight">
            User Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {auth?.user || "User"}
              </p>
              <p className="text-sm text-gray-500">{auth?.email}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold shadow-md">
              {auth?.user
                ? auth.user.charAt(0).toUpperCase()
                : auth?.email?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Buttons */}
      <nav className="flex justify-center mt-6 space-x-3 flex-wrap px-4">
        {[
          { to: "/user", label: "Overview" },
          { to: "/user/profile", label: "Profile" },
          { to: "/user/orders", label: "Orders" },
          { to: "/user/settings", label: "Settings" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/user"}
            className={({ isActive }) =>
              `px-6 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-pink-600 text-white border-pink-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-pink-400 hover:text-pink-600"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Overview Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-pink-100 shadow-lg rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome back,{" "}
            <span className="text-pink-600">{auth?.user || "User"}!</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Here’s a quick look at your account — you can manage your details,
            view orders, or update your settings anytime.
          </p>

          {/* Simple Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              { label: "Total Orders", value: "12" },
              { label: "Membership", value: "Premium" },
              { label: "Account Age", value: "8 months" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl border border-gray-100 p-5 text-center hover:shadow-lg transition-all"
              >
                <h3 className="text-3xl font-bold text-pink-600">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Section */}
        <div className="bg-white/80 backdrop-blur-lg border border-pink-100 shadow-lg rounded-2xl p-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 border-t border-pink-100 bg-white/50 backdrop-blur-md">
        © {new Date().getFullYear()} YourApp — Crafted with ❤️ by You.
      </footer>
    </div>
  );
};

export default UserDashboard;
