import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const url = `${import.meta.env.VITE_BACKEND_URL}`;

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization:auth.token
         },
        body: JSON.stringify(loginUser),
      });

      const data = await res.json();
      

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // ✅ Save to Context
      setAuth({
        user: data.user,
        token: data.token,
        email: data.email,
        userId: data.userId,
        role: data.role, // ✅
      });

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: data.user,
          token: data.token,
          email: data.email,
          userId: data.userId,
          role: data.role, // ✅
        })
      );

      toast.success("User logged in successfully ✅");
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate(location.state?.from || "/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div
      className="min-h-screen p-8 flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${assets.login_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-6xl">
        <div
          className="sm:col-span-1 lg:col-span-2 bg-cover bg-center relative hidden sm:block min-h-[70vh]"
          style={{ backgroundImage: `url(${assets.login_bg2})` }}
        >
          <div className="absolute inset-0"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white text-center z-10">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg max-w-md font-bold">
              To keep connected with us, please login with your personal info
            </p>
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-center p-5">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Login
            </h2>

            <div className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                className="w-full cursor-pointer bg-blue-100 text-blue-700 font-semibold p-3 rounded-md hover:bg-blue-200 transition duration-300"
              >
                Login with Phone
              </button>
              <button
                type="button"
                className="w-full cursor-pointer bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 text-sm font-semibold">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Email & Password */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border font-bold border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 font-bold mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-pink-600 font-bold cursor-pointer text-white p-3 rounded-md hover:bg-pink-700 transition duration-300"
            >
              Login
            </button>

            <div className=" text-right mb-1 text-blue-600 underline">
              <NavLink to="/forget-password">Forgot Password</NavLink>
            </div>

            {/* Signup Link */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-blue-600 hover:underline">
                Signup
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
