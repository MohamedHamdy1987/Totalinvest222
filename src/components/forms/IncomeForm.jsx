import { useState } from 'react'
import Button from '../ui/Button'
import { useApp } from '../../contexts/AppContext'
import { generateId } from '../../utils/helpers'

export default function IncomeForm({ initialData, onSave, onCancel }) {
  const { addToast } = useApp()
  const [form, setForm] = useState(initialData || {
    name: '', amount: '', date: new Date().toISOString().slice(0, 10),
    client: '', notes: ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'مطلوب'
    if (!form.amount || Number(form.amount) <= 0) e.amount = 'مطلوب'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave({ ...form, id: initialData?.id || generateId(), amount: Number(form.amount), type: 'income' })
    addToast(initialData ? 'تم تحديث الإيراد ✅' : 'تمت إضافة الإيراد 💰')
    if (!initialData) setForm({ name: '', amount: '', client: '', notes: '' })
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 'var(--radius)',
    border: '1px solid var(--border)', background: 'var(--bg-tertiary)',
    color: 'var(--text-primary)', fontSize: '0.9rem',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={lbl}>اسم العملية *</label>
        <input style={inputStyle} value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="مثال: تصميم موقع - عميل X" />
        {errors.name && <span style={err}>{errors.name}</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={lbl}>المبلغ *</label>
          <input type="number" step="0.01" style={inputStyle}
            value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          {errors.amount && <span style={err}>{errors.amount}</span>}
        </div>
        <div>
          <label style={lbl}>التاريخ</label>
          <input type="date" style={inputStyle}
            value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
      </div>
      <div>
        <label style={lbl}>العميل</label>
        <input style={inputStyle} value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          placeholder="اسم العميل (اختياري)" />
      </div>
      <div>
        <label style={lbl}>ملاحظات</label>
        <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
          value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="submit" fullWidth>💰 حفظ الإيراد</Button>
        {onCancel && <Button variant="secondary" onClick={onCancel}>إلغاء</Button>}
      </div>
    </form>
  )
}
const lbl = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }
const err = { fontSize: '0.7rem', color: 'var(--danger)', marginTop: '4px', display: 'block' }