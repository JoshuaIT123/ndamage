import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../services/api'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    try {
      await auth.register(form)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  const field = (label, type, value, cb) => (
    <label className="block mb-3">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      <input className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400" type={type}
        value={value} onChange={e => cb(e.target.value)} required />
    </label>
  )

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-1">
          <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
          <h1 className="text-2xl font-bold text-slate-800">Spare Parts</h1>
        </div>
        <p className="text-xs text-slate-400 text-center mb-6">Inventory Manager</p>
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Create account</h2>
          {error && <p className="text-rose-600 text-xs mb-3 bg-rose-50 rounded px-3 py-2">{error}</p>}
          {field('Name', 'text', form.name, v => setForm({ ...form, name: v }))}
          {field('Email', 'email', form.email, v => setForm({ ...form, email: v }))}
          {field('Password', 'password', form.password, v => setForm({ ...form, password: v }))}
          <button className="w-full bg-slate-800 text-white text-sm font-medium rounded px-4 py-2 hover:bg-slate-700 transition">
            Create account
          </button>
          <p className="text-xs text-slate-400 text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium ml-1">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
