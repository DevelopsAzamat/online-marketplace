// src/routes/AdminRoute.tsx
import { useUserStore } from "../store/userStore";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;
  if (!user.is_admin) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminRoute;
