export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export function formatCurrency(amount, currency = 'SAR') {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatDateShort(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })
}

export function getMonthName(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })
}

export function groupByMonth(expenses) {
  const groups = {}
  expenses.forEach((e) => {
    const key = e.date.slice(0, 7)
    if (!groups[key]) groups[key] = []
    groups[key].push(e)
  })
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
}

export function groupByCategory(expenses) {
  const groups = {}
  expenses.forEach((e) => {
    if (!groups[e.category]) groups[e.category] = 0
    groups[e.category] += Number(e.amount)
  })
  return Object.entries(groups).sort((a, b) => b[1] - a[1])
}

export function calcTotals(expenses, incomes) {
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0)
  return {
    totalExpenses,
    totalIncome,
    netProfit: totalIncome - totalExpenses,
    breakEvenPoint: totalExpenses,
    remainingToBreakEven: Math.max(0, totalExpenses - totalIncome),
    isProfitable: totalIncome >= totalExpenses,
  }
}