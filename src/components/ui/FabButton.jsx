import { useNavigate } from 'react-router-dom'

export default function FabButton() {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/add')} style={{
      position: 'fixed', bottom: '90px', left: '20px', zIndex: 90,
      width: '52px', height: '52px', borderRadius: '50%',
      background: 'var(--gradient-1)', border: 'none',
      color: '#fff', fontSize: '1.6rem', cursor: 'pointer',
      boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'var(--transition)',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      ＋
    </button>
  )
}