import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function AdminLayout() {
  const nav = useNavigate();

  async function logout() {
    await signOut(auth);
    nav("/admin/login", { replace: true });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f19", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Admin</h2>
          <button onClick={logout} style={ghost}>تسجيل خروج</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <NavLink to="/admin" end style={link}>الرئيسية</NavLink>
          <NavLink to="/admin/products" style={link}>المنتجات</NavLink>
          <NavLink to="/admin/settings" style={link}>الإعدادات</NavLink>
        </div>

        <div style={{ marginTop: 14 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const link = ({ isActive }) => ({
  padding: "10px 12px",
  borderRadius: 12,
  textDecoration: "none",
  color: "#fff",
  background: isActive ? "rgba(110,231,255,0.18)" : "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  fontWeight: 800,
});

const ghost = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 800,
};