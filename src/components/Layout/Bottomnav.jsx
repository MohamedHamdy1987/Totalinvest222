import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { path: '/', icon: '📊', label: 'الرئيسية' },
  { path: '/transactions', icon: '📋', label: 'العمليات' },
  { path: '/statistics', icon: '📈', label: 'إحصائيات' },
  { path: '/income', icon: '💰', label: 'الإيرادات' },
  { path: '/timeline', icon: '🕐', label: 'الرحلة' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--bg-glass)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)',
      padding: '6px 8px', paddingBottom: 'max(6px, env(safe-area-inset-bottom))',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {navItems.map((item) => {
        const active = location.pathname === item.path
        return (
          <button key={item.path} onClick={() => navigate(item.path)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '2px', padding: '6px 10px', borderRadius: '12px',
            border: 'none', background: active ? 'var(--accent-light)' : 'transparent',
            cursor: 'pointer', transition: 'var(--transition-fast)',
            minWidth: '56px', color: active ? 'var(--accent)' : 'var(--text-tertiary)',
          }}>
            <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
            <span style={{ fontSize: '0.65rem', fontWeight: active ? 600 : 400 }}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}