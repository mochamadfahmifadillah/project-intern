import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
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
        <Route path="/login" element={<Login />} />

        {/* =========================
            AUTHENTICATED ROUTES
        ========================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

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
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
