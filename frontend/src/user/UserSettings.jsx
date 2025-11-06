import React, { useState } from 'react';
import { useAuth } from '../context/auth';

const UserSettings = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState(auth?.user?.name || '');
  const [email] = useState(auth?.user?.email || ''); // read-only
  const [password, setPassword] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    // 🔧 Replace this with your actual API call later
    console.log('Saving settings...', { name, password });

    // Optional: update context or show success message
    const updatedUser = { ...auth.user, name };
    setAuth({ ...auth, user: updatedUser });

    // Update localStorage too
    localStorage.setItem(
      'auth',
      JSON.stringify({
        ...auth,
        user: updatedUser,
      })
    );

    alert('Settings saved (mock)');
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Settings</h2>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-200 bg-gray-100 rounded px-3 py-2 cursor-not-allowed"
            value={email}
            disabled
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">New Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Leave blank to keep current"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
