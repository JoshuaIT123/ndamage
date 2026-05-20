import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SpareParts from './pages/SpareParts'
import StockIn from './pages/StockIn'
import StockOut from './pages/StockOut'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/spare-parts" element={<ProtectedRoute><Layout><SpareParts /></Layout></ProtectedRoute>} />
      <Route path="/stock-in" element={<ProtectedRoute><Layout><StockIn /></Layout></ProtectedRoute>} />
      <Route path="/stock-out" element={<ProtectedRoute><Layout><StockOut /></Layout></ProtectedRoute>} />
    </Routes>
  )
}
