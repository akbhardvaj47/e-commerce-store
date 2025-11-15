import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddItems from "./pages/AddItems";
import Contact from "./pages/Contact";
import "./index.css";
import NotFoundPage from "./components/NotFoundPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import toast, { Toaster } from "react-hot-toast";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import UserOrders from "./user/UserOrders";
import UserSettings from "./user/UserSettings";
import UserProfile from "./user/UserProfile";
import UserDashboard from "./user/UserDashboard";
import CategoriesPage from "./admin/CategoriesPage";
import AdminProductsPage from "./admin/AdminProductsPage";
import CreateProduct from "./admin/CreateProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Shop from "./pages/Shop";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import AdminRoute from "./Routes/AdminRoute";
import SearchPage from "./pages/SearchPage";

export default function App() {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:slug" element={<ProductDetails />} />z
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="/orders" element={<OrdersPage />} /> */}
        <Route path="/cart" element={<ProtectedRoute />}>
          <Route index element={<CartPage />} />
        </Route>
        {/* Protected User Routes */}
        <Route path="/user" element={<ProtectedRoute />}>
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          {/* <Route path="contacts" element={<Profile />} /> */}
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="update-product/:slug" element={<UpdateProduct />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {token && <Footer />}
    </>
  );
}
