import { useMemo, useState } from "react";

const PRODUCTS = [
  {
    id: "cv-pack",
    title_ar: "حزمة قوالب سيرة ذاتية",
    title_en: "CV Templates Bundle",
    price: 29,
    category_ar: "قوالب",
    category_en: "Templates",
    desc_ar: "قوالب جاهزة + نسخ قابلة للتعديل.",
    desc_en: "Ready-to-use templates + editable versions.",
  },
  {
    id: "social-bundle",
    title_ar: "حزمة تصاميم سوشال",
    title_en: "Social Design Bundle",
    price: 49,
    category_ar: "تصاميم",
    category_en: "Designs",
    desc_ar: "بوستات وستوري قابلة للتخصيص.",
    desc_en: "Customizable posts & stories.",
  },
  {
    id: "toolkit",
    title_ar: "عدة أدوات رقمية",
    title_en: "Digital Toolkit",
    price: 39,
    category_ar: "أدوات",
    category_en: "Tools",
    desc_ar: "ملفات مساعدة وإعدادات جاهزة.",
    desc_en: "Helpful files and ready configurations.",
  },
];

function formatSAR(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const I18N = {
  ar: {
    dir: "rtl",
    brand: "Jahez Digital",
    title: "متجر المنتجات الرقمية",
    subtitle: "نسخة تجريبية: منتجات + سلة (بدون دفع الآن)",
    search: "ابحث عن منتج…",
    all: "الكل",
    cart: "السلة",
    items: "عنصر",
    checkout: "متابعة الشراء",
    checkoutSoon: "قريبًا: الدفع + تسليم تلقائي للملفات الرقمية",
    details: "تفاصيل",
    detailsSoon: "قريبًا: صفحة المنتج + المعاينة",
    add: "إضافة للسلة",
    cartContent: "محتويات السلة",
    emptyCart: "السلة فاضية… لا تخليها كذا 😄",
    remove: "حذف",
    demo: "نسخة تجريبية",
  },
  en: {
    dir: "ltr",
    brand: "Jahez Digital",
    title: "Digital Products Store",
    subtitle: "Demo: Products + Cart (no payments yet)",
    search: "Search for a product…",
    all: "All",
    cart: "Cart",
    items: "items",
    checkout: "Checkout",
    checkoutSoon: "Coming soon: payments + automatic file delivery",
    details: "Details",
    detailsSoon: "Coming soon: product page + preview",
    add: "Add to cart",
    cartContent: "Cart items",
    emptyCart: "Cart is empty… add something 😄",
    remove: "Remove",
    demo: "Demo",
  },
};

export default function App() {
  const [lang, setLang] = useState("ar"); // "ar" | "en"
  const t = I18N[lang];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(t.all);
  const [cart, setCart] = useState([]);

  // categories depend on language
  const categories = useMemo(() => {
    const key = lang === "ar" ? "category_ar" : "category_en";
    const set = new Set(PRODUCTS.map((p) => p[key]));
    return [I18N[lang].all, ...Array.from(set)];
  }, [lang]);

  // when language changes, reset category to "All"
  useMemo(() => {
    setCategory(I18N[lang].all);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const titleKey = lang === "ar" ? "title_ar" : "title_en";
    const descKey = lang === "ar" ? "desc_ar" : "desc_en";
    const catKey = lang === "ar" ? "category_ar" : "category_en";

    return PRODUCTS.filter((p) => {
      const matchQ =
        !q ||
        String(p[titleKey]).toLowerCase().includes(q) ||
        String(p[descKey]).toLowerCase().includes(q);

      const matchC = category === I18N[lang].all || p[catKey] === category;

      return matchQ && matchC;
    });
  }, [query, category, lang]);

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

  const titleKey = lang === "ar" ? "title_ar" : "title_en";
  const descKey = lang === "ar" ? "desc_ar" : "desc_en";
  const catKey = lang === "ar" ? "category_ar" : "category_en";

  return (
    <div dir={t.dir} style={{ minHeight: "100vh", background: "#0b0f19", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 18px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ opacity: 0.75, fontSize: 12 }}>{t.demo}</div>

          <button
            onClick={() => setLang((p) => (p === "ar" ? "en" : "ar"))}
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginTop: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{t.brand}</div>
            <h1 style={{ margin: "6px 0 0", fontSize: 28 }}>{t.title}</h1>
            <div style={{ marginTop: 6, opacity: 0.85 }}>{t.subtitle}</div>
          </div>

          {/* Cart box */}
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
              <span style={{ opacity: 0.85 }}>{t.cart}</span>
              <span style={{ opacity: 0.85 }}>
                {cart.length} {t.items}
              </span>
            </div>
            <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700 }}>{formatSAR(total)}</div>
            <button
              onClick={() => alert(t.checkoutSoon)}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "0",
                cursor: "pointer",
                background: "#6ee7ff",
                fontWeight: 800,
              }}
            >
              {t.checkout}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
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

        {/* Products */}
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
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>{p[catKey]}</div>
                  <div style={{ marginTop: 6, fontSize: 18, fontWeight: 800 }}>{p[titleKey]}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{formatSAR(p.price)}</div>
              </div>

              <div style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.5 }}>{p[descKey]}</div>

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
                  {t.add}
                </button>

                <button
                  onClick={() => alert(t.detailsSoon)}
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
                  {t.details}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart list */}
        <div style={{ marginTop: 18 }}>
          <h2 style={{ fontSize: 18, marginBottom: 10 }}>{t.cartContent}</h2>

          {cart.length === 0 ? (
            <div style={{ opacity: 0.8 }}>{t.emptyCart}</div>
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
                    borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{item[titleKey]}</div>
                    <div style={{ opacity: 0.75, fontSize: 12 }}>{item[catKey]}</div>
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
                      {t.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 22, opacity: 0.65, fontSize: 12 }}>
          © {new Date().getFullYear()} {t.brand}
        </div>
      </div>
    </div>
  );
}
