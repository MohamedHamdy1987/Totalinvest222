import { formatDate } from '../../utils/helpers'

export default function TimelineView({ events }) {
  if (!events || events.length === 0) return null

  return (
    <div style={{ position: 'relative', paddingRight: '24px' }}>
      <div style={{
        position: 'absolute', right: '8px', top: '8px', bottom: '8px',
        width: '2px', background: 'var(--border)', borderRadius: '1px',
      }} />
      {events.map((event, i) => (
        <div key={i} style={{
          position: 'relative', marginBottom: '20px',
          paddingRight: '24px', animation: `fadeIn 0.4s ease ${i * 0.1}s forwards`,
          opacity: 0,
        }}>
          <div style={{
            position: 'absolute', right: '-20px', top: '4px',
            width: '12px', height: '12px', borderRadius: '50%',
            background: event.type === 'income' ? 'var(--success)' : 'var(--accent)',
            border: '3px solid var(--bg-card)',
            boxShadow: `0 0 0 3px ${event.type === 'income' ? 'var(--success-light)' : 'var(--accent-light)'}`,
          }} />
          <div style={{
            background: 'var(--bg-card)', borderRadius: 'var(--radius)',
            padding: '14px 16px', border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {event.name}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                  {event.category && `${event.category} · `}{formatDate(event.date)}
                </p>
              </div>
              <span style={{
                fontWeight: 700, fontSize: '0.9rem',
                color: event.type === 'income' ? 'var(--success)' : 'var(--danger)',
              }}>
                {event.type === 'income' ? '+' : '-'}{Number(event.amount).toLocaleString()}
              </span>
            </div>
            {event.notes && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '6px', borderTop: '1px solid var(--border-light)', paddingTop: '6px' }}>
                {event.notes}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}