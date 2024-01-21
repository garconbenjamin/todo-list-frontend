import { Navigate, Outlet } from "react-router-dom";

import { User } from "../types/User";

const ProtectedRoutes = ({ user }: { user: User }) => {
  return user.id ? <Outlet /> : <Navigate to="/auth" replace/>;
};

export default ProtectedRoutes;
