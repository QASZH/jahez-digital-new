export default function AdminDashboard() {
  return (
    <div style={card}>
      <h3 style={{ marginTop: 0 }}>جاهز ديجيتال — لوحة التحكم</h3>
      <p style={{ opacity: 0.85 }}>
        هنا نضيف كل التحكم الكامل: الصفحات، الأقسام، السياسات، الدفع، المستخدمين، الطلبات…
      </p>
      <div style={{ opacity: 0.75, fontSize: 12 }}>
        المرحلة الحالية: منتجات + إعدادات + حماية Admin
      </div>
    </div>
  );
}

const card = {
  padding: 16,
  borderRadius: 16,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
};