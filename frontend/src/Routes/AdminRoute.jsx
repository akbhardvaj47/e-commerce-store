import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const AdminRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!auth?.token) return <Navigate to="/login" />;

  if (auth.role !== "admin") return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminRoute;
