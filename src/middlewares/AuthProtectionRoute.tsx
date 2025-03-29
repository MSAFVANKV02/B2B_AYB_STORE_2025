import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./IsAuthenticated";

interface ProtectedRouteProps {
    children: React.ReactNode;
  }

export default function AuthProtectionRoute({ children}:ProtectedRouteProps) {
    const isLogged = isAuthenticated();
    const location = useLocation(); // Access the current location
    const {  state } = location;

    if (isLogged) {
        const redirectTo = state?.from?.pathname || "/dashboard"; // Redirect to previous page or default to dashboard
        return <Navigate to={redirectTo} replace />;
      }
  return (
    <div>{children}</div>
  )
}