import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ authUser, requiredRole, children }) {
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && authUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
