import { Navigate } from "react-router-dom";

const ProtectedRoute = (element, requiredRole) => {
  const token = localStorage.getItem("access_token");
  const userRole = localStorage.getItem("rol");
  if (token && (!requiredRole || userRole === requiredRole)) {
    return element;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
