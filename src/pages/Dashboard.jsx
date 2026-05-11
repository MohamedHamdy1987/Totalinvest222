import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { calcTotals, groupByCategory, formatCurrency } from '../utils/helpers'
import Card from '../components/ui/Card'
import InsightCard from '../components/ui/InsightCard'
import PieChart from '../components/charts/PieChart'

export default function Dashboard() {
  const { expenses, incomes, currency } = useApp()
  const navigate = useNavigate()
  const { totalExpenses, totalIncome, netProfit, remainingToBreakEven, isProfitable } = calcTotals(expenses, incomes)
  const catGroups = groupByCategory(expenses)
  const topCategory = catGroups[0]
  const recentExpenses = expenses.slice(0, 5)

  return (
    <div className="page-container animate-fade-in">
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <Card style={{ background: 'var(--gradient-1)', color: '#fff', border: 'none' }}>
          <p style={{ fontSize: '0.7rem', opacity: 0.85 }}>إجمالي الإنفاق</p>
          <p style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '4px' }}>
            {formatCurrency(totalExpenses, currency)}
          </p>
        </Card>
        <Card style={{
          background: isProfitable ? 'var(--gradient-2)' : 'var(--bg-card)',
          color: isProfitable ? '#fff' : 'var(--text-primary)', border: isProfitable ? 'none' : undefined
        }}>
          <p style={{ fontSize: '0.7rem', opacity: isProfitable ? 0.85 : 1, color: isProfitable ? undefined : 'var(--text-tertiary)' }}>
            {isProfitable ? 'صافي الربح' : 'صافي الخسارة'}
          </p>
          <p style={{
            fontSize: '1.35rem', fontWeight: 800, marginTop: '4px',
            color: !isProfitable ? 'var(--danger)' : undefined
          }}>
            {formatCurrency(Math.abs(netProfit), currency)}
          </p>
        </Card>
      </div>

      {/* Break-even Progress */}
      {!isProfitable && totalIncome > 0 && (
        <Card style={{ marginBottom: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>التقدم نحو التعادل</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)' }}>
              {((totalIncome / totalExpenses) * 100).toFixed(1)}%
            </span>
          </div>
          <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '10px',
              background: 'var(--gradient-2)',
              width: `${Math.min((totalIncome / totalExpenses) * 100, 100)}%`,
              transition: 'width 0.5s ease',
            }} />
          </div>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '6px' }}>
            متبقي للتعادل: {formatCurrency(remainingToBreakEven, currency)}
          </p>
        </Card>
      )}

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <InsightCard icon="📋" title="عدد العمليات" value={expenses.length} />
        <InsightCard icon="💰" title="الإيرادات" value={formatCurrency(totalIncome, currency)}
          color="var(--success)" />
      </div>

      {/* Most Spent Category */}
      {topCategory && (
        <Card style={{ marginBottom: '16px', padding: '16px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>أكثر تصنيف صرفًا</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{topCategory[0]}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
            {formatCurrency(topCategory[1], currency)}
          </p>
        </Card>
      )}

      {/* Pie Chart */}
      <Card style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>توزيع المصروفات</h3>
        <PieChart data={catGroups.map(([label, value]) => ({ label, value }))} size={180} />
      </Card>

      {/* Recent Expenses */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>آخر المصروفات</h3>
          <button onClick={() => navigate('/transactions')} style={{
            background: 'none', border: 'none', color: 'var(--accent)',
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer'
          }}>عرض الكل →</button>
        </div>
        {recentExpenses.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '32px', color: 'var(--text-tertiary)' }}>
            <p>لا توجد مصروفات بعد</p>
          </Card>
        ) : (
          recentExpenses.map((e) => (
            <Card key={e.id} style={{ padding: '14px', marginBottom: '8px' }}
              onClick={() => navigate('/transactions')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{e.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                    {e.category} · {e.date}
                  </p>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--danger)', fontSize: '0.9rem' }}>
                  -{formatCurrency(e.amount, currency)}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}