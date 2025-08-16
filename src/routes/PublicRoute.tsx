import { Navigate } from "react-router";

interface Props {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const PublicRoute = ({ isAuthenticated, children }: Props) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
