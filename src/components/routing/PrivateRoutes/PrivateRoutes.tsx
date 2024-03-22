import useUser from "@/hooks/user";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoutes = ({ adminRoute = false }) => {
  const { user, admin, loading } = useUser();

  const location = useLocation();

  return loading ? (
    <div>Loading...</div>
  ) : !user ? (
    <Navigate to="/login" state={{ from: location.pathname }} />
  ) : !admin && adminRoute ? (
    <div>Forbidden</div>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
