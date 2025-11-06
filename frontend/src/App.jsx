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
import './index.css'
import NotFoundPage from "./components/NotFoundPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Profile from "./user/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import toast, { Toaster } from 'react-hot-toast';
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

export default function App() {
  const token=JSON.parse(localStorage.getItem("auth"))?.token
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user" element={<ProtectedRoute />}>
          <Route path="" element={<UserDashboard />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Route>


        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<Profile />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="create-product" element={<CreateProduct/>} />
          <Route path="/admin/update-product/:slug" element={<UpdateProduct />} />
        </Route>


        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:slug" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/add-items" element={<AddItems />} />
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {token && <Footer />}
      {/* <Footer/> */}
    </>
  );
}
