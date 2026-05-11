export default function LoadingState() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px'
    }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          height: '80px', borderRadius: 'var(--radius)',
          background: 'var(--bg-tertiary)',
          animation: 'shimmer 2s infinite',
          backgroundImage: 'linear-gradient(90deg, var(--bg-tertiary) 0%, var(--bg-card-hover) 50%, var(--bg-tertiary) 100%)',
          backgroundSize: '200% 100%',
        }} />
      ))}
    </div>
  )
}