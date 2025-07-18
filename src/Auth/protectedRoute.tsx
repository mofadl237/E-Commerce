import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath,
  children,
}: IProps) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace  />;

  return children;
};

export default ProtectedRoute;
