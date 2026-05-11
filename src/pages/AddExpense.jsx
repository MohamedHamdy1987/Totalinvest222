import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import ExpenseForm from '../components/forms/ExpenseForm'
import Card from '../components/ui/Card'

export default function AddExpense() {
  const { dispatch, addToast } = useApp()
  const navigate = useNavigate()

  const handleSave = (data) => {
    dispatch({ type: 'ADD_EXPENSE', payload: data })
    setTimeout(() => navigate('/'), 300)
  }

  return (
    <div className="page-container animate-slide-up">
      <Card>
        <ExpenseForm onSave={handleSave} onCancel={() => navigate('/')} />
      </Card>
    </div>
  )
}