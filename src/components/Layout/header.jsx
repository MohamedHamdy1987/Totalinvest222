import { useLocation } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'

const pageTitles = {
  '/': 'Market Systems',
  '/add': 'إضافة مصروف',
  '/transactions': 'العمليات',
  '/statistics': 'الإحصائيات',
  '/income': 'الإيرادات',
  '/timeline': 'الرحلة الزمنية',
  '/settings': 'الإعدادات',
}

export default function Header() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const title = pageTitles[location.pathname] || 'Market Systems'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--bg-glass)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)',
      padding: '12px 16px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: '64px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'var(--gradient-1)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', fontWeight: 700, color: '#fff'
        }}>M</div>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {title}
          </h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', margin: 0 }}>
            Investment Tracker
          </p>
        </div>
      </div>
      <button onClick={toggleTheme} style={{
        width: '40px', height: '40px', borderRadius: '12px',
        border: '1px solid var(--border)', background: 'var(--bg-card)',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.2rem',
        color: 'var(--text-secondary)', transition: 'var(--transition-fast)'
      }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}