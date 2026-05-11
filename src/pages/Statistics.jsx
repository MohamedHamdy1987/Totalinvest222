import { useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import { groupByCategory, groupByMonth, formatCurrency } from '../utils/helpers'
import Card from '../components/ui/Card'
import PieChart from '../components/charts/PieChart'
import BarChart from '../components/charts/BarChart'
import InsightCard from '../components/ui/InsightCard'

export default function Statistics() {
  const { expenses, currency } = useApp()

  const catGroups = useMemo(() => groupByCategory(expenses), [expenses])
  const monthGroups = useMemo(() => groupByMonth(expenses), [expenses])

  const monthlyData = monthGroups.map(([month, items]) => ({
    label: month.slice(5),
    value: items.reduce((s, i) => s + i.amount, 0),
  })).slice(0, 6).reverse()

  const avgMonthly = expenses.length > 0
    ? expenses.reduce((s, e) => s + e.amount, 0) / (monthGroups.length || 1)
    : 0

  const maxExpense = expenses.reduce((max, e) => e.amount > max.amount ? e : max, expenses[0] || { amount: 0, name: '-' })
  const topMonth = monthGroups[0]

  const barColors = ['#3b82f6', '#60a5fa', '#93c5fd', '#8b5cf6', '#a78bfa', '#c4b5fd']

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <InsightCard icon="📊" title="متوسط الصرف الشهري"
          value={formatCurrency(avgMonthly, currency)} />
        <InsightCard icon="🔝" title="أعلى عملية صرف"
          value={formatCurrency(maxExpense.amount, currency)}
          subtitle={maxExpense.name} color="var(--warning)" />
      </div>

      {topMonth && (
        <InsightCard icon="📅" title="أكثر شهر صرفًا"
          value={topMonth[0]} color="var(--accent)"
          subtitle={`${formatCurrency(topMonth[1].reduce((s, e) => s + e.amount, 0), currency)} · ${topMonth[1].length} عملية`} />
      )}

      <Card style={{ marginTop: '16px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>المصروفات الشهرية</h3>
        {monthlyData.length > 0 ? (
          <BarChart data={monthlyData.map((d, i) => ({ ...d, color: barColors[i] }))} height={200} />
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '24px' }}>لا توجد بيانات</p>
        )}
      </Card>

      <Card style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>التصنيفات</h3>
        <PieChart data={catGroups.map(([label, value]) => ({ label, value }))} size={200} />
      </Card>
    </div>
  )
}