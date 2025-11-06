import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets"; // Optional: background image or icon

function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 p-8"
      style={{
        backgroundImage: `url(${assets.login_bg})`, // Optional background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-10 max-w-xl w-full">
        <h1 className="text-6xl font-extrabold text-pink-600 mb-4">Oops ! 404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <NavLink
          to="/"
          className="inline-block bg-pink-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-700 transition duration-300"
        >
          Go Home
        </NavLink>
      </div>
    </div>
  );
}

export default NotFoundPage;
