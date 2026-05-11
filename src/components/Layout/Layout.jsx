import Header from './Header'
import BottomNav from './BottomNav'
import FabButton from '../ui/FabButton'
import Toast from '../ui/Toast'
import { useApp } from '../../contexts/AppContext'

export default function Layout({ children }) {
  const { toasts, dispatch } = useApp()

  return (
    <>
      <Header />
      <main style={{ flex: 1, paddingTop: '70px' }}>
        {children}
      </main>
      <FabButton />
      <BottomNav />
      <div style={{
        position: 'fixed', top: '80px', right: '16px', left: '16px', zIndex: 9999,
        display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none'
      }}>
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => dispatch({ type: 'REMOVE_TOAST', payload: t.id })} />
        ))}
      </div>
    </>
  )
}