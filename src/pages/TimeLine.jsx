import { useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import TimelineView from '../components/charts/TimelineView'
import EmptyState from '../components/ui/EmptyState'

export default function Timeline() {
  const { expenses, incomes } = useApp()

  const events = useMemo(() => {
    const all = [
      ...expenses.map((e) => ({ ...e, type: 'expense' })),
      ...incomes.map((i) => ({ ...i, type: 'income' })),
    ]
    all.sort((a, b) => new Date(a.date) - new Date(b.date))
    return all
  }, [expenses, incomes])

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
          🚀 Founder Investment Timeline
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          رحلة الاستثمار منذ البداية
        </p>
      </div>
      {events.length === 0 ? (
        <EmptyState icon="🕐" title="لا توجد أحداث بعد"
          description="ابدأ بإضافة مصروفاتك وإيراداتك لتظهر هنا" />
      ) : (
        <TimelineView events={events} />
      )}
    </div>
  )
}