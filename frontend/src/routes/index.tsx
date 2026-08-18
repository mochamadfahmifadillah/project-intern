import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------------------------------------------------------- */}
        {/* Public Pages */}
        {/* ---------------------------------------------------------------- */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        {/* ---------------------------------------------------------------- */}
        {/* Public Software Directory */}
        {/* ---------------------------------------------------------------- */}

        <Route path="/software-directory" element={<SoftwareDirectory />} />

        {/* ---------------------------------------------------------------- */}
        {/* Public Software Detail */}
        {/* ---------------------------------------------------------------- */}

        <Route path="/software-directory/:slug" element={<SoftwareDetail />} />

        {/* ---------------------------------------------------------------- */}
        {/* Admin Pages */}
        {/* ---------------------------------------------------------------- */}

        <Route element={<MainLayout />}>
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
