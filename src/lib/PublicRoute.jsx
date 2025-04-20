import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const adminData = sessionStorage.getItem("admin");
  const token = adminData ? JSON.parse(adminData).token : null;

  return token ? <Navigate to="/admin/home" /> : <Outlet />;
};

export default PublicRoute;
