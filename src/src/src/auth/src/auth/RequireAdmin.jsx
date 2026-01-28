import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAdmin({ children }) {
  const { user, role, loading } = useAuth();

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (role !== "admin") return <div style={{ padding: 20 }}>Access denied.</div>;

  return children;
}