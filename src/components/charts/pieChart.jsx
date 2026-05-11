export default function PieChart({ data, size = 200 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  if (total === 0) return <EmptyState icon="📊" title="لا توجد بيانات للعرض" />

  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1']
  const cx = size / 2, cy = size / 2, r = size / 2 - 10
  let cumulative = 0

  const slices = data.map((d, i) => {
    const startAngle = (cumulative / total) * 360
    cumulative += d.value
    const endAngle = (cumulative / total) * 360
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180)
    const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180)
    const x2 = cx + r * Math.cos((endAngle - 90) * Math.PI / 180)
    const y2 = cy + r * Math.sin((endAngle - 90) * Math.PI / 180)
    return { path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`, color: colors[i % colors.length], label: d.label, value: d.value, percent: ((d.value / total) * 100).toFixed(1) }
  })

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))' }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="var(--bg-card)" strokeWidth="2" />
        ))}
        <circle cx={cx} cy={cy} r={r * 0.55} fill="var(--bg-card)" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="var(--text-secondary)" fontSize="11">{total.toLocaleString()}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">الإجمالي</text>
      </svg>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
        {slices.slice(0, 6).map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: s.color, flexShrink: 0 }} />
            <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
            <span style={{ fontWeight: 600 }}>{s.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState({ icon, title }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-tertiary)' }}>
      <span style={{ fontSize: '2rem' }}>{icon}</span>
      <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>{title}</p>
    </div>
  )
}