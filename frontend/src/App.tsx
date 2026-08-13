import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PermissionRoute from "./components/ProtectedRoute/PermissionRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* =========================
            AUTHENTICATED ROUTES
        ========================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* =========================
                USERS
            ========================== */}
            <Route element={<PermissionRoute permission="users.view" />}>
              <Route path="/users" element={<Users />} />
            </Route>

            {/* =========================
                ROLES
            ========================== */}
            <Route element={<PermissionRoute permission="roles.view" />}>
              <Route path="/roles" element={<Roles />} />
            </Route>

            {/* =========================
                PERMISSIONS
            ========================== */}
            <Route element={<PermissionRoute permission="permissions.view" />}>
              <Route path="/permissions" element={<Permissions />} />
            </Route>
          </Route>
        </Route>

        {/* =========================
            FALLBACK
        ========================== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
