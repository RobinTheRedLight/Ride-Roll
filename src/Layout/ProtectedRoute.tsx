import { Navigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const user = useAppSelector(selectCurrentUser);

  let userRole;
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userRole = (user as any).role;
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== userRole) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
