import { useState, useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import { formatCurrency, formatDate } from '../utils/helpers'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import ExpenseForm from '../components/forms/ExpenseForm'

export default function Transactions() {
  const { expenses, dispatch, addToast, categories } = useApp()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [editing, setEditing] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const filtered = useMemo(() => {
    let list = [...expenses]
    if (search) list = list.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    if (filterCat) list = list.filter((e) => e.category === filterCat)
    if (sortBy === 'date-desc') list.sort((a, b) => new Date(b.date) - new Date(a.date))
    if (sortBy === 'date-asc') list.sort((a, b) => new Date(a.date) - new Date(b.date))
    if (sortBy === 'amount-desc') list.sort((a, b) => b.amount - a.amount)
    if (sortBy === 'amount-asc') list.sort((a, b) => a.amount - b.amount)
    return list
  }, [expenses, search, filterCat, sortBy])

  const handleDelete = () => {
    if (deleteId) {
      dispatch({ type: 'DELETE_EXPENSE', payload: deleteId })
      addToast('تم حذف المصروف 🗑️', 'warning')
      setDeleteId(null)
    }
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <input
          style={inputStyle}
          placeholder="🔍 بحث..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select style={{ ...inputStyle, width: 'auto' }} value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
          <option value="">كل التصنيفات</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={{ ...inputStyle, width: 'auto' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">الأحدث</option>
          <option value="date-asc">الأقدم</option>
          <option value="amount-desc">المبلغ ↑</option>
          <option value="amount-asc">المبلغ ↓</option>
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState icon="📭" title="لا توجد عمليات"
          description={search || filterCat ? 'لا توجد نتائج تطابق البحث' : 'ابدأ بإضافة أول مصروف'}
          action={<Button onClick={() => window.location.href = '/add'}>➕ إضافة مصروف</Button>} />
      ) : (
        filtered.map((e) => (
          <Card key={e.id} style={{ padding: '14px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{e.name}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                  {e.category} · {formatDate(e.date)} · {e.paymentMethod}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 700, color: 'var(--danger)', fontSize: '0.9rem' }}>
                  -{formatCurrency(e.amount)}
                </span>
                <button onClick={() => setEditing(e)} style={iconBtn} title="تعديل">✏️</button>
                <button onClick={() => setDeleteId(e.id)} style={iconBtn} title="حذف">🗑️</button>
              </div>
            </div>
          </Card>
        ))
      )}

      {/* Edit Modal */}
      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="تعديل المصروف">
        {editing && (
          <ExpenseForm
            initialData={editing}
            onSave={(data) => { dispatch({ type: 'UPDATE_EXPENSE', payload: data }); setEditing(null) }}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="تأكيد الحذف">
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          هل أنت متأكد من حذف هذا المصروف؟
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="danger" onClick={handleDelete}>🗑️ حذف</Button>
          <Button variant="secondary" onClick={() => setDeleteId(null)}>إلغاء</Button>
        </div>
      </Modal>
    </div>
  )
}

const inputStyle = {
  padding: '10px 12px', borderRadius: 'var(--radius)',
  border: '1px solid var(--border)', background: 'var(--bg-tertiary)',
  color: 'var(--text-primary)', fontSize: '0.8rem', flex: 1, minWidth: '100px',
}
const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem',
  padding: '4px', borderRadius: '6px', color: 'var(--text-tertiary)',
}