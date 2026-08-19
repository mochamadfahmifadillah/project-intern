import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Users";
import Roles from "../pages/Roles/index";
import Permissions from "../pages/Permissions/index";
import Profile from "../pages/Profile/index";

import Software from "../pages/Software/index";
import SoftwareCategories from "../pages/SoftwareCategories/index";
import SoftwarePricings from "../pages/SoftwarePricings/index";
import SoftwareIntegrations from "../pages/SoftwareIntegrations/index";
import Vendors from "../pages/Vendors/index";

import SoftwareDirectory from "../pages/SoftwareDirectory/index";
import SoftwareDetail from "../pages/SoftwareDetail/index";
import SoftwareComparison from "../pages/SoftwareComparison/index";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================================================================ */}
        {/* PUBLIC */}
        {/* ================================================================ */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/software-directory" element={<SoftwareDirectory />} />

        <Route path="/software-directory/:slug" element={<SoftwareDetail />} />

        <Route path="/software-comparison" element={<SoftwareComparison />} />

        {/* ================================================================ */}
        {/* ADMIN */}
        {/* ================================================================ */}

        <Route element={<MainLayout />}>
          {/* Admin root → Dashboard */}
          <Route path="/admin" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Management */}
          <Route path="/users" element={<Users />} />

          {/* Role & Permission Management */}
          <Route path="/roles" element={<Roles />} />

          <Route path="/permissions" element={<Permissions />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Software Management */}
          <Route path="/softwares" element={<Software />} />

          {/* Software Categories */}
          <Route path="/software-categories" element={<SoftwareCategories />} />

          {/* Software Pricing */}
          <Route path="/software-pricings" element={<SoftwarePricings />} />

          {/* Software Integrations */}
          <Route
            path="/software-integrations"
            element={<SoftwareIntegrations />}
          />

          {/* Vendors */}
          <Route path="/vendors" element={<Vendors />} />
        </Route>

        {/* ================================================================ */}
        {/* FALLBACK */}
        {/* ================================================================ */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
