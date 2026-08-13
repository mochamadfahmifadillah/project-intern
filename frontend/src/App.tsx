import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";
import Profile from "./pages/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Admin Application */}
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
