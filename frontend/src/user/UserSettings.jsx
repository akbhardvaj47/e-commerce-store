import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, Lock, Save } from "lucide-react";

const UserSettings = () => {
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(auth);
  

  useEffect(() => {
    if (auth?.user) setName(auth.user);
  }, [auth]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`,
        { name, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      );

      if (res?.data?.status) {
        const newName=name;
        setAuth({ ...auth, user: newName });

        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: res.data.user.name })
        );
        toast.success("Settings saved successfully!");
        setPassword("");
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <User className="text-pink-600" /> User Settings
      </h2>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              className="w-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl pl-10 pr-3 py-2.5 cursor-not-allowed"
              value={auth?.email || ""}
              disabled
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <Save size={18} />
          {loading ? "Saving..." : "Save Changes"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UserSettings;
