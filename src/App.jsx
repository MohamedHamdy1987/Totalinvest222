import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpense'
import Transactions from './pages/Transactions'
import Statistics from './pages/Statistics'
import Income from './pages/Income'
import Settings from './pages/Settings'
import Timeline from './pages/Timeline'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/income" element={<Income />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}