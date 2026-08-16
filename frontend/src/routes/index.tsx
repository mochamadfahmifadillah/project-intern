import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import Permissions from "../pages/Permissions";
import Profile from "../pages/Profile";
import Software from "../pages/Software";
import SoftwareCategories from "../pages/SoftwareCategories";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main Application */}
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Management */}
          <Route path="/users" element={<Users />} />

          {/* Role Management */}
          <Route path="/roles" element={<Roles />} />

          {/* Permission Management */}
          <Route path="/permissions" element={<Permissions />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Software Management */}
          <Route path="/softwares" element={<Software />} />
          <Route path="/software-categories" element={<SoftwareCategories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
