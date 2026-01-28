import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Pas connecté
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Rôle requis mais incorrect
  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  // Tout est OK → afficher la page
  return children;
}
