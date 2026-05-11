export default function BarChart({ data, height = 220 }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1)
  const barWidth = Math.max(24, Math.min(40, (window.innerWidth - 100) / data.length - 8))

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height, paddingTop: '8px', overflowX: 'auto' }}>
      {data.map((d, i) => {
        const h = (d.value / maxVal) * (height - 40)
        return (
          <div key={i} style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: barWidth }}>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {d.value.toLocaleString()}
            </span>
            <div style={{
              width: '100%', height: Math.max(h, 4),
              borderRadius: '8px 8px 4px 4px',
              background: d.color || 'var(--accent)',
              transition: 'height 0.5s ease',
              minHeight: '4px',
            }} />
            <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.2 }}>
              {d.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}