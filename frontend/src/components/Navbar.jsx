import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";

import { assets } from "../assets/assets";
import {
  Home,
  ShoppingBag,
  Info,
  Phone,
  Search,
  ShoppingCart,
  User,
  LogOut,
  LogIn,
  UserPlus,
  X,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false); // avatar dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile nav
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false); // mobile search toggle
  const [search, setSearch] = useState("");
  const { auth, setAuth } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "", email: "", userId: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  useEffect(() => {
    const fetchCartLength = async () => {
      if (!auth?.userId) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/${auth.userId}`,{
            headers:{
              Authorization:auth.token
            }
          }
        );
        if (res.data.success) {
          setCartCount(res.data.count);
        }
      } catch (error) {
        console.log("Error fetching cart count:", error);
      }
    };
    fetchCartLength();
  },[cartCount,auth?.userId]);

  const onSearchSubmit = (e) => {
    e?.preventDefault();
    const text = search.trim();
    if (!text) return;
    navigate(`/search?text=${encodeURIComponent(text)}`);
    setSearch("");
    setMobileSearchOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <NavLink to="/" className="text-2xl font-bold italic text-pink-600">
          AkTechMart
        </NavLink>

        {/* Center - Desktop nav + search */}
        <div className="hidden md:flex items-center gap-8 w-full max-w-3xl justify-center">
          <div className="flex items-center gap-6 font-medium">
            <NavLink
              to="/"
              className="hover:text-pink-600 flex items-center gap-1"
            >
              <Home size={18} /> Home
            </NavLink>
            <NavLink
              to="/shop"
              className="hover:text-pink-600 flex items-center gap-1"
            >
              <ShoppingBag size={18} /> Shop
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-pink-600 flex items-center gap-1"
            >
              <Info size={18} /> About
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-pink-600 flex items-center gap-1"
            >
              <Phone size={18} /> Contact
            </NavLink>
          </div>

          {/* Search - visible on md+ */}
          <form
            onSubmit={onSearchSubmit}
            className="hidden lg:flex items-center w-2/3"
            aria-label="Site search"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full px-4 py-2 rounded-l-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="submit"
              className="px-4 py-3  cursor-pointer rounded-r-2xl bg-pink-600 text-white font-semibold hover:bg-pink-700"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Mobile search toggle - visible on small screens */}
          <button
            onClick={() => {
              setMobileSearchOpen((s) => !s);
              setIsMenuOpen(false);
            }}
            className="md:hidden text-gray-600 hover:text-pink-600"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative text-gray-600 hover:text-pink-600"
            aria-label="View cart"
          >
            <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount>0?cartCount:0}
              </span>
          </NavLink>

          {/* Admin quick nav - shows on md+ as a simple button */}
          {auth?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <User size={16} /> Admin
            </button>
          )}

          {/* Auth section */}
          {!auth?.token ? (
            <div className="hidden lg:flex gap-2">
              <NavLink
                to="/signup"
                className="flex items-center gap-1 bg-pink-600 px-4 py-2 rounded-2xl text-white font-bold"
              >
                <UserPlus size={16} /> Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className="flex items-center gap-1 bg-green-600 px-4 py-2 rounded-2xl text-white font-bold"
              >
                <LogIn size={16} /> Login
              </NavLink>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMenu((s) => !s)}
                aria-haspopup="true"
                aria-expanded={showMenu}
              >
                <img
                  src={assets.sare}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="profile"
                />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <button
                    onClick={() => navigate("/user")}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} /> Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => {
              setIsMenuOpen((s) => !s);
              setMobileSearchOpen(false);
            }}
            className="lg:hidden text-gray-600 hover:text-pink-600"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search (collapsible) */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 border-b">
          <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-l-2xl border border-gray-200 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-2xl bg-pink-600 text-white font-semibold"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-6 space-y-3">
          <div className="flex flex-col gap-2 pt-3">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <Home size={16} /> Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <ShoppingBag size={16} /> Shop
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <Info size={16} /> About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <Phone size={16} /> Contact
            </NavLink>

            {/* Mobile search quick input */}
            <form
              onSubmit={onSearchSubmit}
              className="flex items-center gap-2 px-3"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 rounded-l-lg border border-gray-200 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-r-lg bg-pink-600 text-white"
                aria-label="Search"
              >
                <Search size={14} />
              </button>
            </form>

            {/* Cart & Admin */}
            <div className="flex items-center justify-between px-3 pt-1">
              <NavLink
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Cart
                <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  2
                </span>
              </NavLink>

              {auth?.role === "admin" && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/admin");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User size={14} /> Admin
                </button>
              )}
            </div>

            {/* Auth actions */}
            {!auth?.token ? (
              <div className="flex flex-col gap-2 px-3 pt-2">
                <NavLink
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-pink-600 px-4 py-2 rounded-2xl text-white font-bold"
                >
                  <UserPlus size={16} /> Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-green-600 px-4 py-2 rounded-2xl text-white font-bold"
                >
                  <LogIn size={16} /> Login
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-3 pt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/user");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-left"
                >
                  <User size={16} /> Dashboard
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
