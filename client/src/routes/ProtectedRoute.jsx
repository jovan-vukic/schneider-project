import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const ProtectedRoute = () => {
  const data = useAuth();

  // Check if user is authenticated
  if (!data.token) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render protected route
  return <Outlet />;
};

export default ProtectedRoute;
