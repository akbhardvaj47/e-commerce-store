import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-hot-toast";

function ForgotPassword() {
  const navigate = useNavigate()
  const URL = 'http://localhost:8080/api/auth/forget-password'
  const [user, setUser] = useState({
    email: "",
    password: "",
    answer:"",
  })
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(URL, {
        method: "Post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (!res.ok) {
        toast.error("Failed to login")
        // console.log("Failed to login");
      }
      const data = await res.json();
      toast.success("Password reset successfully")
      navigate('/login')

    } catch (error) {
        toast.error("Something went wrong!")
    //   console.log("Login error", error);
    }
  }
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
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>

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
              type="text"
              name="answer"
              placeholder="Which is your favourite sport?"
              className="w-full p-3 mb-4 border font-bold border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              className="w-full p-3 font-bold mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-pink-600 font-bold cursor-pointer text-white p-3 rounded-md hover:bg-pink-700 transition duration-300"
            >
              Reset Password
            </button>

            {/* Signup Link */}
            <p className="text-sm text-center mt-4 text-gray-600">
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

export default ForgotPassword;
