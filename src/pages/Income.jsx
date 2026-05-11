import { useState, useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import { calcTotals, formatCurrency, formatDate } from '../utils/helpers'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import InsightCard from '../components/ui/InsightCard'
import IncomeForm from '../components/forms/IncomeForm'

export default function Income() {
  const { incomes, expenses, dispatch, addToast, currency } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const { totalIncome, netProfit, isProfitable } = calcTotals(expenses, incomes)

  const handleSave = (data) => {
    if (editing) {
      dispatch({ type: 'UPDATE_INCOME', payload: data })
    } else {
      dispatch({ type: 'ADD_INCOME', payload: data })
    }
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <Card style={{ background: 'var(--gradient-2)', color: '#fff', border: 'none' }}>
          <p style={{ fontSize: '0.7rem', opacity: 0.85 }}>إجمالي الإيرادات</p>
          <p style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '4px' }}>
            {formatCurrency(totalIncome, currency)}
          </p>
        </Card>
        <Card style={{
          background: isProfitable ? 'var(--success-light)' : 'var(--danger-light)',
          border: `1px solid ${isProfitable ? 'var(--success)' : 'var(--danger)'}`
        }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>صافي الربح</p>
          <p style={{
            fontSize: '1.35rem', fontWeight: 800, marginTop: '4px',
            color: isProfitable ? 'var(--success)' : 'var(--danger)'
          }}>
            {formatCurrency(netProfit, currency)}
          </p>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>سجل الإيرادات</h3>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>➕ إضافة إيراد</Button>
      </div>

      {incomes.length === 0 ? (
        <EmptyState icon="💰" title="لا توجد إيرادات بعد"
          description="عندما يبدأ المشروع بتحقيق أرباح، أضف أول إيراد هنا"
          action={<Button onClick={() => setShowForm(true)}>➕ إضافة أول إيراد</Button>} />
      ) : (
        incomes.map((inc) => (
          <Card key={inc.id} style={{ padding: '14px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{inc.name}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                  {formatDate(inc.date)} {inc.client && `· ${inc.client}`}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '0.9rem' }}>
                  +{formatCurrency(inc.amount, currency)}
                </span>
                <button onClick={() => { setEditing(inc); setShowForm(true) }} style={iconBtn}>✏️</button>
                <button onClick={() => setDeleteId(inc.id)} style={iconBtn}>🗑️</button>
              </div>
            </div>
          </Card>
        ))
      )}

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditing(null) }}
        title={editing ? 'تعديل الإيراد' : 'إضافة إيراد جديد'}>
        <IncomeForm initialData={editing} onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }} />
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="تأكيد الحذف">
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>حذف هذا الإيراد؟</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="danger" onClick={() => {
            dispatch({ type: 'DELETE_INCOME', payload: deleteId })
            addToast('تم الحذف 🗑️', 'warning')
            setDeleteId(null)
          }}>🗑️ حذف</Button>
          <Button variant="secondary" onClick={() => setDeleteId(null)}>إلغاء</Button>
        </div>
      </Modal>
    </div>
  )
}
const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '4px', borderRadius: '6px', color: 'var(--text-tertiary)' }