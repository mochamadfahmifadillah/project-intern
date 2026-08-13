import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PermissionRouteProps {
  permission: string;
}

function PermissionRoute({ permission }: PermissionRouteProps) {
  const { loading, user, hasPermission } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PermissionRoute;
