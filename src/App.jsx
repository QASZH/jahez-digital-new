import { useMemo, useState } from "react";

const PRODUCTS = [
  {
    id: "cv-pack",
    title: "حزمة قوالب سيرة ذاتية",
    price: 29,
    category: "قوالب",
    desc: "قوالب جاهزة + نسخ قابلة للتعديل.",
  },
  {
    id: "social-bundle",
    title: "حزمة تصاميم سوشال",
    price: 49,
    category: "تصاميم",
    desc: "بوستات وستوري قابلة للتخصيص.",
  },
  {
    id: "toolkit",
    title: "عدة أدوات رقمية",
    price: 39,
    category: "أدوات",
    desc: "ملفات مساعدة وإعدادات جاهزة.",
  },
];

function formatSAR(amount) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [cart, setCart] = useState([]);

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.category));
    return ["الكل", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q);
      const matchC = category === "الكل" || p.category === category;
      return matchQ && matchC;
    });
  }, [query, category]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  function addToCart(product) {
    setCart((prev) => [...prev, product]);
  }

  function removeFromCart(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f19", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 18px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Jahez Digital</div>
            <h1 style={{ margin: "6px 0 0", fontSize: 28 }}>
              متجر المنتجات الرقمية
            </h1>
            <div style={{ marginTop: 6, opacity: 0.85 }}>
              نسخة تجريبية: منتجات + سلة (بدون دفع الآن)
            </div>
          </div>

          <div
            style={{
              padding: 12,
              borderRadius: 14,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              minWidth: 260,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ opacity: 0.85 }}>السلة</span>
              <span style={{ opacity: 0.85 }}>{cart.length} عنصر</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700 }}>
              {formatSAR(total)}
            </div>
            <button
              onClick={() =>
                alert("قريبًا: الدفع + تسليم تلقائي للملفات الرقمية")
              }
              style={{
                marginTop: 10,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "0",
                cursor: "pointer",
                background: "#6ee7ff",
                fontWeight: 700,
              }}
            >
              متابعة الشراء
            </button>
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتج…"
            style={{
              flex: "1 1 260px",
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none",
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none",
              minWidth: 160,
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c} style={{ color: "#000" }}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {filtered.map((p) => (
            <div
              key={p.id}
              style={{
                padding: 16,
                borderRadius: 16,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    {p.category}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 18, fontWeight: 800 }}>
                    {p.title}
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>
                  {formatSAR(p.price)}
                </div>
              </div>

              <div style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.5 }}>
                {p.desc}
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "0",
                    cursor: "pointer",
                    background: "#22c55e",
                    fontWeight: 800,
                  }}
                >
                  إضافة للسلة
                </button>
                <button
                  onClick={() => alert("قريبًا: صفحة المنتج + المعاينة")}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.18)",
                    cursor: "pointer",
                    background: "transparent",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  تفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart list */}
        <div style={{ marginTop: 18 }}>
          <h2 style={{ fontSize: 18, marginBottom: 10 }}>محتويات السلة</h2>

          {cart.length === 0 ? (
            <div style={{ opacity: 0.8 }}>
              السلة فاضية… لا تخليها كذا 😄
            </div>
          ) : (
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 12,
                    background: "rgba(255,255,255,0.06)",
                    borderTop:
                      idx === 0 ? "none" : "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{item.title}</div>
                    <div style={{ opacity: 0.75, fontSize: 12 }}>
                      {item.category}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ fontWeight: 800 }}>{formatSAR(item.price)}</div>
                    <button
                      onClick={() => removeFromCart(idx)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "transparent",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 22, opacity: 0.65, fontSize: 12 }}>
          © {new Date().getFullYear()} Jahez Digital — نسخة تجريبية
        </div>
      </div>
    </div>
  );
}
