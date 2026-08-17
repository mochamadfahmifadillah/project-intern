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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Pages */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/softwares" element={<Software />} />
          <Route
            path="/software-categories"
            element={<SoftwareCategories />}
          />
          <Route
            path="/software-pricings"
            element={<SoftwarePricings />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;