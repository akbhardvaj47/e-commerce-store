import React from "react";
import { useAuth } from "../context/auth";
import { motion } from "framer-motion";
import { LogOut, Mail, User, Settings } from "lucide-react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 800);
  };

  const avatarLetter = auth?.user?.charAt(0)?.toUpperCase() || "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <User className="text-pink-600" /> Your Profile
        </h2>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          <LogOut size={18} />
          Log Out
        </motion.button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-28 h-28 bg-gradient-to-br from-pink-500 to-pink-700 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg mb-4"
        >
          {avatarLetter}
        </motion.div>

        {/* User Info */}
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {auth?.user || "Unknown User"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
          <Mail size={16} />
          {auth?.email || "No Email"}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 dark:border-gray-700 mb-6" />

      {/* Account Info Section */}
      <div className="space-y-5">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <Settings className="text-pink-600" /> Account Information
        </h4>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span className="text-pink-600 font-semibold">
                {auth?.user}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span className="text-pink-600 font-semibold">
                {auth?.email}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Role:</span>
              <span className="text-pink-600 font-semibold">
                {auth?.role || "User"}
              </span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <NavLink
          to="/user/settings"
          className="w-full text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-5 py-3 rounded-xl font-medium transition-all duration-200"
        >
          Edit Profile
        </NavLink>

        <NavLink
          onClick={handleLogout}
          className="w-full flex justify-center items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
        >
          <LogOut size={18} /> Logout
        </NavLink>
      </div>
    </motion.div>
  );
};

export default UserProfile;
