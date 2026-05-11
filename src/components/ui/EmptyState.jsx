export default function EmptyState({ icon = '📭', title, description, action }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '48px 24px', textAlign: 'center',
      animation: 'fadeIn 0.5s ease forwards',
    }}>
      <span style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{icon}</span>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '20px', maxWidth: '280px' }}>
        {description}
      </p>
      {action}
    </div>
  )
}