import { useState, useEffect } from 'react'
import InputGroup from '../components/InputGroup'
import Table from '../components/Table'
import Flash from '../components/Flash'
import { spareParts } from '../services/api'

export default function SpareParts() {
  const [parts, setParts] = useState([])
  const [form, setForm] = useState({ name: '', category: '', quantity: '', unitPrice: '' })
  const [msg, setMsg] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    spareParts.getAll().then(setParts).catch(() => setParts([])).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      const totalPrice = Number(form.quantity) * Number(form.unitPrice)
      await spareParts.create({ ...form, quantity: Number(form.quantity), unitPrice: Number(form.unitPrice), totalPrice })
      setMsg('Spare part added')
      setForm({ name: '', category: '', quantity: '', unitPrice: '' })
      load()
    } catch (err) { setMsg(err.message) }
  }

  const handleDelete = async (id) => {
    try {
      await spareParts.remove(id)
      setMsg('Spare part deleted')
      load()
    } catch (err) { setMsg(err.message) }
  }

  const filtered = parts.filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase())
  )

  const headers = ['Name', 'Category', 'Quantity', 'Unit Price', 'Total', '']
  const rows = filtered.map(p => ({
    _id: p._id,
    cells: <>
      <td className="px-4 py-3 font-medium text-slate-700">{p.name}</td>
      <td className="px-4 py-3 text-slate-500">{p.category}</td>
      <td className="px-4 py-3 text-slate-700">{p.quantity}</td>
      <td className="px-4 py-3 text-slate-700">${Number(p.unitPrice).toFixed(2)}</td>
      <td className="px-4 py-3 text-slate-700 font-medium">${Number(p.totalPrice).toFixed(2)}</td>
      <td className="px-4 py-3">
        <button onClick={() => handleDelete(p._id)} className="text-[11px] text-rose-500 hover:text-rose-700 font-medium transition">Delete</button>
      </td>
    </>
  }))

  return (
    <div>
      <h2 className="text-base font-semibold text-slate-700 mb-3">Spare Parts</h2>
      <Flash msg={msg} onClear={() => setMsg('')} />

      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3 mb-6 p-4 bg-white border border-slate-200 rounded-lg">
        <InputGroup label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Brake pad" minWidth="140px" />
        <InputGroup label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Brakes" minWidth="140px" />
        <InputGroup label="Qty" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="0" minWidth="80px" />
        <InputGroup label="Unit Price ($)" type="number" value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: e.target.value })} placeholder="0.00" minWidth="110px" />
        <button className="bg-slate-800 text-white text-sm font-medium rounded px-5 py-2 hover:bg-slate-700 transition">Add</button>
      </form>

      <div className="mb-4">
        <input className="w-full max-w-xs border border-slate-200 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition" type="text" placeholder="Search by name or category..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <p className="text-sm text-slate-400 italic py-8 text-center">Loading...</p>
      ) : (
        <Table headers={headers} rows={rows} />
      )}
    </div>
  )
}
