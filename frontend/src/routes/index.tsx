import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import Permissions from "../pages/Permissions";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
