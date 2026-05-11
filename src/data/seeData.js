import { generateId } from '../utils/helpers'

export function seedData() {
  const now = new Date()
  const months = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(d.toISOString().slice(0, 7))
  }

  const expenses = [
    { name: 'MacBook Pro M3', amount: 12000, category: 'Laptop & Hardware', paymentMethod: 'بطاقة ائتمان', date: `${months[0]}-15`, notes: 'جهاز العمل الأساسي' },
    { name: 'شاشة خارجية 27"', amount: 1800, category: 'Laptop & Hardware', paymentMethod: 'بطاقة ائتمان', date: `${months[0]}-20`, notes: '' },
    { name: 'Claude Pro', amount: 85, category: 'Claude', paymentMethod: 'بطاقة ائتمان', date: `${months[1]}-05`, notes: 'اشتراك شهري' },
    { name: 'ChatGPT Plus', amount: 75, category: 'ChatGPT', paymentMethod: 'بطاقة ائتمان', date: `${months[1]}-05`, notes: '' },
    { name: 'Cursor Pro', amount: 75, category: 'Cursor', paymentMethod: 'بطاقة ائتمان', date: `${months[1]}-10`, notes: 'IDE للبرمجة' },
    { name: 'Cursor Pro - تجديد', amount: 75, category: 'Cursor', paymentMethod: 'بطاقة ائتمان', date: `${months[2]}-10`, notes: '' },
    { name: 'Claude Pro - تجديد', amount: 85, category: 'Claude', paymentMethod: 'بطاقة ائتمان', date: `${months[2]}-05`, notes: '' },
    { name: 'ChatGPT Plus - تجديد', amount: 75, category: 'ChatGPT', paymentMethod: 'بطاقة ائتمان', date: `${months[2]}-05`, notes: '' },
    { name: 'Domain marketsystems.co', amount: 55, category: 'Domains', paymentMethod: 'بطاقة ائتمان', date: `${months[0]}-25`, notes: 'دومين أساسي' },
    { name: 'Hosting - VPS', amount: 120, category: 'Hosting', paymentMethod: 'بطاقة ائتمان', date: `${months[1]}-01`, notes: 'استضافة شهرية' },
    { name: 'Hosting - VPS تجديد', amount: 120, category: 'Hosting', paymentMethod: 'بطاقة ائتمان', date: `${months[2]}-01`, notes: '' },
    { name: 'Hosting - VPS تجديد', amount: 120, category: 'Hosting', paymentMethod: 'بطاقة ائتمان', date: `${months[3]}-01`, notes: '' },
    { name: 'Kimi API', amount: 40, category: 'Kimi', paymentMethod: 'بطاقة ائتمان', date: `${months[2]}-12`, notes: 'رصيد API' },
    { name: 'فايبر شهري', amount: 300, category: 'Internet', paymentMethod: 'تحويل بنكي', date: `${months[3]}-01`, notes: '' },
    { name: 'دورة Next.js متقدمة', amount: 350, category: 'Learning Courses', paymentMethod: 'بطاقة ائتمان', date: `${months[3]}-15`, notes: 'Udemy' },
    { name: 'Google Ads - تجربة', amount: 400, category: 'Marketing', paymentMethod: 'بطاقة ائتمان', date: `${months[4]}-10`, notes: 'حملة أولية' },
    { name: 'Cursor Pro - تجديد', amount: 75, category: 'Cursor', paymentMethod: 'بطاقة ائتمان', date: `${months[3]}-10`, notes: '' },
    { name: 'Claude Pro - تجديد', amount: 85, category: 'Claude', paymentMethod: 'بطاقة ائتمان', date: `${months[3]}-05`, notes: '' },
    { name: 'ChatGPT Plus - تجديد', amount: 75, category: 'ChatGPT', paymentMethod: 'بطاقة ائتمان', date: `${months[3]}-05`, notes: '' },
    { name: 'Cursor Pro - تجديد', amount: 75, category: 'Cursor', paymentMethod: 'بطاقة ائتمان', date: `${months[4]}-10`, notes: '' },
    { name: 'Claude Pro - تجديد', amount: 85, category: 'Claude', paymentMethod: 'بطاقة ائتمان', date: `${months[4]}-05`, notes: '' },
    { name: 'ChatGPT Plus - تجديد', amount: 75, category: 'ChatGPT', paymentMethod: 'بطاقة ائتمان', date: `${months[4]}-05`, notes: '' },
    { name: 'Hosting - VPS تجديد', amount: 120, category: 'Hosting', paymentMethod: 'بطاقة ائتمان', date: `${months[4]}-01`, notes: '' },
    { name: 'فايبر شهري', amount: 300, category: 'Internet', paymentMethod: 'تحويل بنكي', date: `${months[4]}-01`, notes: '' },
  ].map((e) => ({ ...e, id: generateId(), amount: Number(e.amount) }))

  const incomes = [
    { name: 'أول عميل - تصميم موقع', amount: 3000, date: `${months[5]}-20`, client: 'شركة النور', notes: 'مشروع موقع كامل' },
    { name: 'عميل استشارات تقنية', amount: 1500, date: `${months[6]}-10`, client: 'TechStart', notes: 'استشارة شهرية' },
    { name: 'مشروع تطوير منصة', amount: 8000, date: `${months[7]}-05`, client: 'DataFlow', notes: 'دفعة أولى' },
  ].map((i) => ({ ...i, id: generateId(), amount: Number(i.amount) }))

  return {
    expenses,
    incomes,
    categories: [
      'Laptop & Hardware', 'AI Subscriptions', 'Claude', 'ChatGPT', 'Cursor', 'Kimi',
      'Hosting', 'Domains', 'Internet', 'Learning Courses', 'Marketing', 'Team',
      'Transportation', 'Miscellaneous'
    ],
    currency: 'SAR',
  }
}