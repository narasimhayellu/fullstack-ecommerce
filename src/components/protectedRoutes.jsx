import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/auth-context";


const ProtectedRoute = ({ children }) => {
  const { isLogin } = useContext(AuthContext);
  return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
