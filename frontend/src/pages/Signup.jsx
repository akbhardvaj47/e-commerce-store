import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Signup() {
  const URL='http://localhost:8080/api/auth/signup'
  const navigate= useNavigate()
  const [user, setUser]=useState({
    name:"",
    email:"",
    phone:"",
    password:"",
  })

  const handleChange=async(e)=>{
    setUser(
    {  ...user,
      [e.target.name] : e.target.value}
    )
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if(!res.ok){
        toast.error("Failed to sign up")
        // console.log("Failed to sign up");
      }
      const data=await res.json()
      toast.success("User registered successfully")
      // console.log(data);
      navigate('/login')
    } catch (error) {
      toast.error("Something went wrong!")
      // console.log("Sign Up error",error);
    }
  }
  // console.log(user)
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 bg-gray-100"
      style={{
        backgroundImage: `url(${assets.login_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-6xl">
        {/* Left - Register Form */}
        <div className="col-span-1 flex items-center justify-center p-8">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 mb-4 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 mb-4 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full p-3 mb-4 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />

            <input
              type="text"
              name="answer"
              placeholder="Which is your favourite sport?"
              className="w-full p-3 mb-6 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 mb-6 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-pink-600 text-white font-bold p-3 rounded-md hover:bg-pink-700 transition duration-300"
            >
              Register
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-600 hover:underline">
                Login
              </NavLink>
            </p>
          </form>
        </div>

        <div
          className="sm:col-span-1 lg:col-span-2 bg-cover bg-center relative hidden sm:block min-h-[60vh]"
          style={{ backgroundImage: `url(${assets.login_bg2})` }}
        >
          <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center p-10 text-white text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Welcome!</h2>
            <p className="text-lg max-w-md font-bold">
              Join us today to access exclusive features and stay connected with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
