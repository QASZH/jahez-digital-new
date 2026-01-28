import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const empty = {
  title_ar: "",
  title_en: "",
  desc_ar: "",
  desc_en: "",
  category_ar: "",
  category_en: "",
  price: 0,
  status: "draft", // draft | published | hidden
};

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [qText, setQText] = useState("");

  async function load() {
    setLoading(true);
    const qy = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snap = await getDocs(qy);
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = qText.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) =>
      (p.title_ar || "").toLowerCase().includes(q) ||
      (p.title_en || "").toLowerCase().includes(q)
    );
  }, [items, qText]);

  async function save() {
    const payload = {
      ...form,
      price: Number(form.price || 0),
      updatedAt: Date.now(),
    };

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), payload);
    } else {
      await addDoc(collection(db, "products"), { ...payload, createdAt: Date.now() });
    }

    setForm(empty);
    setEditingId(null);
    await load();
  }

  function edit(p) {
    setEditingId(p.id);
    setForm({
      title_ar: p.title_ar || "",
      title_en: p.title_en || "",
      desc_ar: p.desc_ar || "",
      desc_en: p.desc_en || "",
      category_ar: p.category_ar || "",
      category_en: p.category_en || "",
      price: p.price || 0,
      status: p.status || "draft",
    });
  }

  async function remove(id) {
    if (!confirm("متأكد حذف المنتج؟")) return;
    await deleteDoc(doc(db, "products", id));
    await load();
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>إدارة المنتجات</h3>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input value={qText} onChange={(e) => setQText(e.target.value)} placeholder="بحث…" style={inp} />
          <button onClick={load} style={ghost}>تحديث</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        <div style={card}>
          <h4 style={{ marginTop: 0 }}>{editingId ? "تعديل منتج" : "إضافة منتج"}</h4>

          <div style={grid2}>
            <input style={inp} placeholder="العنوان (AR)" value={form.title_ar} onChange={(e)=>setForm(f=>({...f,title_ar:e.target.value}))}/>
            <input style={inp} placeholder="Title (EN)" value={form.title_en} onChange={(e)=>setForm(f=>({...f,title_en:e.target.value}))}/>
            <input style={inp} placeholder="التصنيف (AR)" value={form.category_ar} onChange={(e)=>setForm(f=>({...f,category_ar:e.target.value}))}/>
            <input style={inp} placeholder="Category (EN)" value={form.category_en} onChange={(e)=>setForm(f=>({...f,category_en:e.target.value}))}/>
            <input style={inp} placeholder="السعر (SAR)" type="number" value={form.price} onChange={(e)=>setForm(f=>({...f,price:e.target.value}))}/>
            <select style={inp} value={form.status} onChange={(e)=>setForm(f=>({...f,status:e.target.value}))}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <textarea style={ta} placeholder="الوصف (AR)" value={form.desc_ar} onChange={(e)=>setForm(f=>({...f,desc_ar:e.target.value}))}/>
          <textarea style={ta} placeholder="Description (EN)" value={form.desc_en} onChange={(e)=>setForm(f=>({...f,desc_en:e.target.value}))}/>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={save} style={primary}>{editingId ? "حفظ التعديل" : "إضافة"}</button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm(empty); }} style={ghost}>إلغاء</button>
            )}
          </div>

          <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
            ملاحظة: الربط بملف المنتج (Storage) بنضيفه في الخطوة الجاية.
          </div>
        </div>

        <div style={card}>
          <h4 style={{ marginTop: 0 }}>المنتجات الحالية</h4>
          {loading ? (
            <div style={{ opacity: 0.8 }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ opacity: 0.8 }}>لا يوجد منتجات</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {filtered.map((p) => (
                <div key={p.id} style={row}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{p.title_ar || "—"} <span style={{ opacity: 0.7, fontWeight: 700 }}>({p.status})</span></div>
                    <div style={{ opacity: 0.75, fontSize: 12 }}>{p.title_en || ""}</div>
                    <div style={{ opacity: 0.75, fontSize: 12 }}>{(p.category_ar || "")} / {(p.category_en || "")} • {p.price || 0} SAR</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => edit(p)} style={ghost}>تعديل</button>
                    <button onClick={() => remove(p.id)} style={danger}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const card = { padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inp = { padding: "12px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)", color: "#fff", outline: "none", minWidth: 180 };
const ta = { ...inp, minWidth: "100%", height: 90, marginTop: 10 };
const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 };
const row = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" };
const primary = { padding: "10px 12px", borderRadius: 12, border: 0, cursor: "pointer", background: "#22c55e", fontWeight: 900 };
const ghost = { padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "#fff", cursor: "pointer", fontWeight: 800 };
const danger = { padding: "10px 12px", borderRadius: 12, border: 0, cursor: "pointer", background: "#ef4444", color: "#fff", fontWeight: 900 };