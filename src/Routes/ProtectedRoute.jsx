import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    console.log("ProtectedRoute: Loading authentication state...");
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute: No user logged in, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (user.status === "deactivated") {
    console.log(
      `ProtectedRoute: User ${user.email} is deactivated, redirecting to login`
    );
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    console.log(
      `ProtectedRoute: User ${user.email} is not admin, redirecting to home`
    );
    return <Navigate to="/" replace />;
  }

  console.log(`ProtectedRoute: Access granted for user ${user.email}`);
  return children;
}
