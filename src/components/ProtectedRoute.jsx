import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.authentication.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
