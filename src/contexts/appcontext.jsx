import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { loadData, saveData } from '../utils/db'
import { seedData } from '../data/seedData'

const AppContext = createContext()

const initialState = {
  expenses: [],
  incomes: [],
  categories: [
    'Laptop & Hardware', 'AI Subscriptions', 'Claude', 'ChatGPT', 'Cursor', 'Kimi',
    'Hosting', 'Domains', 'Internet', 'Learning Courses', 'Marketing', 'Team',
    'Transportation', 'Miscellaneous'
  ],
  currency: 'SAR',
  toasts: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload }
    case 'ADD_EXPENSE':
      return { ...state, expenses: [action.payload, ...state.expenses] }
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((e) => (e.id === action.payload.id ? action.payload : e)),
      }
    case 'DELETE_EXPENSE':
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) }
    case 'ADD_INCOME':
      return { ...state, incomes: [action.payload, ...state.incomes] }
    case 'UPDATE_INCOME':
      return {
        ...state,
        incomes: state.incomes.map((i) => (i.id === action.payload.id ? action.payload : i)),
      }
    case 'DELETE_INCOME':
      return { ...state, incomes: state.incomes.filter((i) => i.id !== action.payload) }
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] }
    case 'DELETE_CATEGORY':
      return { ...state, categories: state.categories.filter((c) => c !== action.payload) }
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload }
    case 'RESET_DATA':
      return { ...initialState, expenses: [], incomes: [] }
    case 'RESTORE_DATA':
      return { ...state, ...action.payload }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const saved = loadData()
    if (saved && saved.expenses) {
      dispatch({ type: 'LOAD_DATA', payload: saved })
    } else {
      const seeded = seedData()
      dispatch({ type: 'LOAD_DATA', payload: seeded })
    }
  }, [])

  useEffect(() => {
    const { toasts, ...persistable } = state
    saveData(persistable)
  }, [state.expenses, state.incomes, state.categories, state.currency])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } })
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3000)
  }, [])

  const value = { ...state, dispatch, addToast }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)