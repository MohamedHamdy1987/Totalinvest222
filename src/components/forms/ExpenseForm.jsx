import { useState } from 'react'
import Button from '../ui/Button'
import { useApp } from '../../contexts/AppContext'
import { generateId } from '../../utils/helpers'

export default function ExpenseForm({ initialData, onSave, onCancel }) {
  const { categories, addToast } = useApp()
  const [form, setForm] = useState(initialData || {
    name: '', amount: '', category: categories[0] || 'Miscellaneous',
    paymentMethod: 'بطاقة ائتمان', date: new Date().toISOString().slice(0, 10),
    notes: '', receipt: null
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'مطلوب'
    if (!form.amount || Number(form.amount) <= 0) e.amount = 'مطلوب وقيمته > 0'
    if (!form.date) e.date = 'مطلوب'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const data = {
      ...form,
      id: initialData?.id || generateId(),
      amount: Number(form.amount),
      type: 'expense',
    }
    onSave(data)
    addToast(initialData ? 'تم تحديث المصروف ✅' : 'تمت إضافة المصروف ✅')
    if (!initialData) setForm({ ...form, name: '', amount: '', notes: '' })
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 'var(--radius)',
    border: '1px solid var(--border)', background: 'var(--bg-tertiary)',
    color: 'var(--text-primary)', fontSize: '0.9rem',
    transition: 'var(--transition-fast)',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={labelStyle}>اسم المصروف *</label>
        <input style={{ ...inputStyle, borderColor: errors.name ? 'var(--danger)' : 'var(--border)' }}
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="مثال: اشتراك Claude Pro" />
        {errors.name && <span style={errorStyle}>{errors.name}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>المبلغ *</label>
          <input type="number" step="0.01" style={{ ...inputStyle, borderColor: errors.amount ? 'var(--danger)' : 'var(--border)' }}
            value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00" />
          {errors.amount && <span style={errorStyle}>{errors.amount}</span>}
        </div>
        <div>
          <label style={labelStyle}>التاريخ *</label>
          <input type="date" style={inputStyle}
            value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>التصنيف</label>
        <select style={inputStyle} value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>طريقة الدفع</label>
        <select style={inputStyle} value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
          {['بطاقة ائتمان', 'تحويل بنكي', 'نقد', 'PayPal', 'أخرى'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>ملاحظات</label>
        <textarea style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }}
          value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="ملاحظات إضافية..." />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
        <Button type="submit" fullWidth>💾 حفظ المصروف</Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>إلغاء</Button>}
      </div>
    </form>
  )
}

const labelStyle = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  color: 'var(--text-secondary)', marginBottom: '6px',
}
const errorStyle = {
  fontSize: '0.7rem', color: 'var(--danger)', marginTop: '4px', display: 'block',
}