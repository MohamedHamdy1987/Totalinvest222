export default function Card({ children, style = {}, onClick, className = '', glass = false }) {
  return (
    <div
      onClick={onClick}
      className={`${glass ? 'glass-card' : ''} ${className}`}
      style={{
        background: glass ? undefined : 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: 'var(--shadow)',
        transition: 'var(--transition)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  )
}