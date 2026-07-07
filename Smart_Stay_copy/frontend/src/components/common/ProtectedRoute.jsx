import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuth } from "../../features/auth/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const {
    isAuthenticated,
    initialized,
    loading,
  } = useSelector((state) => state.auth);

  const { fetchCurrentUser } = useAuth();

  useEffect(() => {
    if (!initialized) {
      fetchCurrentUser();
    }
  }, [initialized]);

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg font-semibold text-slate-600">
          Loading...
        </h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;