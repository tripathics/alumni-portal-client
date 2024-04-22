import { PageHeaderSkeleton } from "@/components/Skeletons/Skeletons";
import useUser from "@/hooks/user";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoutes = ({ adminRoute = false }) => {
  const { user, loading } = useUser();

  const location = useLocation();

  return loading ? (
    <PageHeaderSkeleton />
  ) : !user ? (
    <Navigate to="/login" state={{ from: location.pathname }} />
  ) : !user.role.includes("admin") && adminRoute ? (
    <div>Forbidden</div>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
