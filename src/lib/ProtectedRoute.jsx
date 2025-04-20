import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const adminData = sessionStorage.getItem("admin");
  const token = adminData ? JSON.parse(adminData).token : null;

  return token ? <Outlet /> : <Navigate to="/admin" />;
};

export default ProtectedRoute;
