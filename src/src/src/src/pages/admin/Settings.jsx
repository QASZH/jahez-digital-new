import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminSettings() {
  const ref = doc(db, "site", "settings");
  const [data, setData] = useState({ brand: "Jahez Digital", defaultLang: "ar", whatsapp: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(ref);
      if (snap.exists()) setData((d) => ({ ...d, ...snap.data() }));
    })();
  }, []);

  async function save() {
    setSaving(true);
    await setDoc(ref, { ...data, updatedAt: Date.now() }, { merge: true });
    setSaving(false);
    alert("تم حفظ الإعدادات ✅");
  }

  return (
    <div style={card}>
      <h3 style={{ marginTop: 0 }}>إعدادات الموقع</h3>

      <div style={grid}>
        <input style={inp} placeholder="Brand Name" value={data.brand} onChange={(e)=>setData(d=>({...d,brand:e.target.value}))}/>
        <select style={inp} value={data.defaultLang} onChange={(e)=>setData(d=>({...d,defaultLang:e.target.value}))}>
          <option value="ar">AR</option>
          <option value="en">EN</option>
        </select>
        <input style={inp} placeholder="WhatsApp Link" value={data.whatsapp} onChange={(e)=>setData(d=>({...d,whatsapp:e.target.value}))}/>
      </div>

      <button onClick={save} style={primary} disabled={saving}>
        {saving ? "جارٍ الحفظ…" : "حفظ"}
      </button>

      <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
        بنضيف هنا لاحقًا: الشعار، الألوان، SEO، الصفحات، السياسات… (كل شيء)
      </div>
    </div>
  );
}

const card = { padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginTop: 10, marginBottom: 12 };
const inp = { padding: "12px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" };
const primary = { padding: "10px 12px", borderRadius: 12, border: 0, cursor: "pointer", background: "#6ee7ff", fontWeight: 900 };