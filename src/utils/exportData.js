export function exportToCSV(expenses, incomes, currency) {
  const headers = 'النوع,الاسم,المبلغ,العملة,التصنيف,طريقة الدفع,التاريخ,العميل,ملاحظات\n'
  const expenseRows = expenses.map((e) =>
    `مصروف,"${e.name}",${e.amount},${currency},"${e.category}","${e.paymentMethod || ''}","${e.date}",,"${e.notes || ''}"`
  ).join('\n')
  const incomeRows = incomes.map((i) =>
    `إيراد,"${i.name}",${i.amount},${currency},,,"${i.date}","${i.client || ''}","${i.notes || ''}"`
  ).join('\n')
  downloadFile(headers + expenseRows + '\n' + incomeRows, 'ms-tracker-export.csv', 'text/csv;charset=utf-8;')
}

export function exportToJSON(expenses, incomes) {
  downloadFile(JSON.stringify({ expenses, incomes }, null, 2), 'ms-tracker-export.json', 'application/json')
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob(['\uFEFF' + content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}