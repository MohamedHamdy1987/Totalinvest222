export default function Toast({ toast, onClose }) {
  const colors = {
    success: { bg: 'var(--success-light)', border: 'var(--success)', icon: '✅' },
    error: { bg: 'var(--danger-light)', border: 'var(--danger)', icon: '❌' },
    warning: { bg: 'var(--warning-light)', border: 'var(--warning)', icon: '⚠️' },
  }
  const c = colors[toast.type] || colors.success

  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 'var(--radius)', padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: '10px',
      animation: 'slideUp 0.3s ease forwards',
      pointerEvents: 'auto', boxShadow: 'var(--shadow)',
    }} onClick={onClose}>
      <span>{c.icon}</span>
      <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
        {toast.message}
      </span>
    </div>
  )
}