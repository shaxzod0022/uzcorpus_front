import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { AdminHome } from "./screens/admin/AdminHome";
import AdminAuth from "./components/admin/AdminAuth";
import PublicRoute from "./lib/PublicRoute";
import ProtectedRoute from "./lib/ProtectedRoute";

const Navigate = () => {
  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<Home />} />

      {/* Admin */}
      <Route element={<PublicRoute />}>
        <Route path="/admin" element={<AdminAuth />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<AdminHome />} />
      </Route>
    </Routes>
  );
};

export default Navigate;
