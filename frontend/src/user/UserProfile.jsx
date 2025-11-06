import React from 'react';
import { useAuth } from '../context/auth';

const UserProfile = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '' });
    window.location.href = '/login';
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile</h2>

      <div className="flex flex-col items-center mb-6">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl mb-3">
          {auth?.username?.charAt(0) || 'U'}
        </div>

        {/* User Name */}
        <h3 className="text-lg font-medium text-gray-800">
          {auth?.username || 'Unknown User'}
        </h3>

        {/* Email */}
        <p className="text-gray-600">{auth?.email || 'No Email'}</p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-gray-700 font-bold text-2xl mb-2 text-center">Account Information</h4>
        <ul className="text-gray-600 space-y-2">
          <li className=' text-2xl font-bold'>Name:<span className="font-bold text-green-600"> {auth?.username}</span></li>
          <li className=' text-2xl font-bold'>Email:<span className="font-bold text-green-600">{auth?.email}</span></li>
          {/* Add more fields if available, e.g., phone, address, etc. */}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;
