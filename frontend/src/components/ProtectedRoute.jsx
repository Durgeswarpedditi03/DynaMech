import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ authUser, requiredRole, children }) {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && authUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
