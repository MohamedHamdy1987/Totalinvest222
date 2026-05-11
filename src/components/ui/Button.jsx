export default function Button({
  children, onClick, variant = 'primary', fullWidth = false,
  disabled = false, style = {}, type = 'button', loading = false
}) {
  const variants = {
    primary: { bg: 'var(--accent)', color: '#fff', border: 'none' },
    secondary: { bg: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border)' },
    danger: { bg: 'var(--danger)', color: '#fff', border: 'none' },
    ghost: { bg: 'transparent', color: 'var(--accent)', border: 'none' },
  }
  const v = variants[variant]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: v.bg, color: v.color, border: v.border,
        borderRadius: 'var(--radius)', padding: '12px 20px',
        fontSize: '0.9rem', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto', opacity: disabled ? 0.5 : 1,
        transition: 'var(--transition-fast)', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', gap: '8px',
        ...style,
      }}
    >
      {loading && <span style={{ animation: 'pulse 1.5s infinite' }}>⏳</span>}
      {children}
    </button>
  )
}