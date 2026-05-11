import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
      }} />
      <div style={{
        position: 'relative', background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        padding: '24px', width: '100%', maxWidth: '500px',
        maxHeight: '85vh', overflow: 'auto',
        animation: 'slideUp 0.3s ease forwards',
        boxShadow: 'var(--shadow-lg)',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: 'none', background: 'var(--bg-tertiary)',
            cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-secondary)',
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}