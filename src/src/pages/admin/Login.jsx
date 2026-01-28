import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  async function login(e) {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/admin", { replace: true });
    } catch (e) {
      setErr("فشل تسجيل الدخول. تأكد من البيانات.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0f19", color: "#fff" }}>
      <form onSubmit={login} style={{ width: 360, padding: 18, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <h2 style={{ marginTop: 0 }}>لوحة التحكم</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={inp}
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          type="password"
          style={inp}
        />

        {err && <div style={{ marginTop: 10, color: "#ffb4b4" }}>{err}</div>}

        <button style={btn} type="submit">دخول</button>

        <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
          ملاحظة: لازم حسابك يكون role=admin في Firestore
        </div>
      </form>
    </div>
  );
}

const inp = {
  width: "100%",
  marginTop: 10,
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  outline: "none",
};

const btn = {
  width: "100%",
  marginTop: 12,
  padding: "12px 12px",
  borderRadius: 12,
  border: 0,
  cursor: "pointer",
  background: "#6ee7ff",
  fontWeight: 800,
};