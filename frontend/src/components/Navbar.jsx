import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.jsx';
import { useAuth } from '../context/auth.jsx';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState(""); // 🔹 new state
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate('/login');
  };

  // 🔹 Search submit handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="bg-white border-b shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            AK-Shop
          </NavLink>
        </div>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-md mx-6" role="search">
          <input
            type="text"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            placeholder="Search products..."
            className="flex-grow border rounded-l-md px-3 py-1 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 border-0 text-white px-4 rounded-r-md shadow-md"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
              />
            </svg>
          </button>
        </form>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <NavLink to="/" className="">
            Home
          </NavLink>
          <NavLink to="/shop" className="">
            Shop
          </NavLink>
          <NavLink to="/about" className="">
            About
          </NavLink>
          <NavLink to="/contact" className="">
            Contact
          </NavLink>
        </div>

        {/* Cart & Profile Icons */}
        <div className="flex items-center space-x-4 relative">
          {/* Cart */}
          <div className="relative">
            <NavLink to="/cart" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
              </svg>
            </NavLink>
            {/* Static badge just for demo */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </div>

          {/* Profile */}
          <div className="relative">
            <button className="cursor-pointer text-gray-600 hover:text-blue-600" aria-label="User profile menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </button>
          </div>
          <div>

            {!auth.token ? <>
              <NavLink to={'/signup'} className=' bg-pink-600 px-4 mr-1 py-2 rounded-2xl text-white font-bold cursor-pointer'>
                Sign Up
              </NavLink>
              <NavLink to={'/login '} className=' bg-green-600 px-4 py-2 rounded-2xl text-white font-bold cursor-pointer'>
                Login
              </NavLink>
            </> :
              <button onClick={()=>setShowMenu(true)}>
                <img src={assets.sare} className=' cursor-pointer rounded-full w-10 h-10' alt="" />
              </button>}
               {showMenu && (
              <div onMouseEnter={()=>setShowMenu(true)} onMouseLeave={()=>setShowMenu(false)}  className="origin-top-right font-bold absolute top-10    right-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    onClick={() => navigate("/user")}
                    className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}


          </div>

          {/* Mobile Menu Icon  */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600" aria-label="Toggle mobile menu">
              {isMenuOpen ? 'X' : <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>}

            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (<div className="md:hidden text-center px-4 pt-2 space-y-2">
        <form onSubmit={handleSearch} className="mb-2" role="search">
          <input
            type="text"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            placeholder="Search products..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        <div className="flex gap-x-2 flex-wrap ">
          <NavLink to="/" className="font-semibold flex-1 text-center">
            Home
          </NavLink>
          <NavLink to="/shop" className="font-semibold flex-1 text-center">
            Shop
          </NavLink>
          <NavLink to="/about" className="font-semibold flex-1 text-center">
            About
          </NavLink>
          <NavLink to="/contact" className="font-semibold flex-1 text-center">
            Contact
          </NavLink>
        </div>

      </div>)
      }

    </nav >
  );
}
