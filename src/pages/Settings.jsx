import { useState, useRef } from 'react'
import { useApp } from '../contexts/AppContext'
import { useTheme } from '../contexts/ThemeContext'
import { backupData, restoreData } from '../utils/db'
import { exportToCSV, exportToJSON } from '../utils/exportData'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

export default function Settings() {
  const { currency, categories, dispatch, addToast, expenses, incomes } = useApp()
  const { theme, toggleTheme } = useTheme()
  const [newCat, setNewCat] = useState('')
  const [showReset, setShowReset] = useState(false)
  const fileRef = useRef()

  const handleAddCategory = () => {
    if (newCat.trim() && !categories.includes(newCat.trim())) {
      dispatch({ type: 'ADD_CATEGORY', payload: newCat.trim() })
      setNewCat('')
      addToast('تمت إضافة التصنيف ✅')
    }
  }

  const handleRestore = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const data = await restoreData(file)
        dispatch({ type: 'RESTORE_DATA', payload: data })
        addToast('تم استعادة البيانات ✅')
      } catch {
        addToast('فشل استعادة الملف ❌', 'error')
      }
    }
  }

  const handleReset = () => {
    dispatch({ type: 'RESET_DATA' })
    setShowReset(false)
    addToast('تم حذف جميع البيانات 🗑️', 'warning')
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Theme */}
      <Card style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: 600 }}>المظهر</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              {theme === 'dark' ? 'داكن 🌙' : 'فاتح ☀️'}
            </p>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ فاتح' : '🌙 داكن'}
          </Button>
        </div>
      </Card>

      {/* Currency */}
      <Card style={{ marginBottom: '14px' }}>
        <p style={{ fontWeight: 600, marginBottom: '8px' }}>العملة</p>
        <select
          style={selectStyle}
          value={currency}
          onChange={(e) => dispatch({ type: 'SET_CURRENCY', payload: e.target.value })}
        >
          {['SAR', 'USD', 'EUR', 'EGP', 'AED', 'KWD', 'QAR'].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Card>

      {/* Categories */}
      <Card style={{ marginBottom: '14px' }}>
        <p style={{ fontWeight: 600, marginBottom: '10px' }}>التصنيفات</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {categories.map((cat) => (
            <span key={cat} style={chipStyle}>
              {cat}
              <button onClick={() => dispatch({ type: 'DELETE_CATEGORY', payload: cat })}
                style={{ marginRight: '4px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                ×
              </button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input style={inputStyle} value={newCat} onChange={(e) => setNewCat(e.target.value)}
            placeholder="تصنيف جديد..." onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} />
          <Button onClick={handleAddCategory}>➕ إضافة</Button>
        </div>
      </Card>

      {/* Export */}
      <Card style={{ marginBottom: '14px' }}>
        <p style={{ fontWeight: 600, marginBottom: '10px' }}>تصدير البيانات</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => exportToCSV(expenses, incomes, currency)}>
            📄 CSV
          </Button>
          <Button variant="secondary" onClick={() => exportToJSON(expenses, incomes)}>
            📋 JSON
          </Button>
          <Button variant="secondary" onClick={backupData}>
            💾 نسخة احتياطية
          </Button>
        </div>
      </Card>

      {/* Restore */}
      <Card style={{ marginBottom: '14px' }}>
        <p style={{ fontWeight: 600, marginBottom: '10px' }}>استعادة النسخة الاحتياطية</p>
        <input type="file" ref={fileRef} onChange={handleRestore} accept=".json"
          style={{ display: 'none' }} />
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          📂 استعادة من ملف
        </Button>
      </Card>

      {/* Reset */}
      <Card>
        <p style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--danger)' }}>حذف جميع البيانات</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '10px' }}>
          هذا الإجراء لا يمكن التراجع عنه
        </p>
        <Button variant="danger" onClick={() => setShowReset(true)}>🗑️ حذف الكل</Button>
      </Card>

      <Modal isOpen={showReset} onClose={() => setShowReset(false)} title="تأكيد الحذف الكامل">
        <p style={{ marginBottom: '16px', color: 'var(--danger)', fontWeight: 600 }}>
          ⚠️ سيتم حذف جميع المصروفات والإيرادات والبيانات
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="danger" onClick={handleReset}>نعم، احذف الكل</Button>
          <Button variant="secondary" onClick={() => setShowReset(false)}>إلغاء</Button>
        </div>
      </Modal>

      <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '24px', marginBottom: '16px' }}>
        Market Systems Investment Tracker v1.0
      </p>
    </div>
  )
}

const inputStyle = {
  flex: 1, padding: '10px 12px', borderRadius: 'var(--radius)',
  border: '1px solid var(--border)', background: 'var(--bg-tertiary)',
  color: 'var(--text-primary)', fontSize: '0.85rem',
}
const selectStyle = {
  ...inputStyle, width: '100%',
}
const chipStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '4px',
  padding: '6px 10px', borderRadius: '20px', fontSize: '0.75rem',
  background: 'var(--bg-tertiary)', color: 'var(--text-secondary)',
  border: '1px solid var(--border)',
}