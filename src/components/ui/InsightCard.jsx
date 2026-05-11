import Card from './Card'

export default function InsightCard({ icon, title, value, subtitle, color = 'var(--accent)' }) {
  return (
    <Card style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: `${color}15`, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
            {title}
          </p>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {value}
          </p>
          {subtitle && (
            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}