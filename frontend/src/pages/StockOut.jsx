import { useState, useEffect } from 'react'
import InputGroup from '../components/InputGroup'
import Table from '../components/Table'
import Flash from '../components/Flash'
import { spareParts, stockOut } from '../services/api'

export default function StockOut() {
  const [items, setItems] = useState([])
  const [parts, setParts] = useState([])
  const [form, setForm] = useState({ spareparts_id: '', stockOutQuantity: '', stockOutUnitPrice: '', stockOutDate: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const previewTotal = (Number(form.stockOutQuantity) * Number(form.stockOutUnitPrice)).toFixed(2)

  const load = () => {
    setLoading(true)
    Promise.all([
      stockOut.getAll().then(setItems).catch(() => setItems([])),
      spareParts.getAll().then(setParts).catch(() => setParts([]))
    ]).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      const total = Number(form.stockOutQuantity) * Number(form.stockOutUnitPrice)
      await stockOut.create({
        spareparts_id: form.spareparts_id || undefined,
        stockOutQuantity: Number(form.stockOutQuantity),
        stockOutUnitPrice: Number(form.stockOutUnitPrice),
        stockOutTotalPrice: total,
        stockOutDate: form.stockOutDate || undefined,
      })
      setMsg('Stock out added')
      setForm({ spareparts_id: '', stockOutQuantity: '', stockOutUnitPrice: '', stockOutDate: '' })
      load()
    } catch (err) { setMsg(err.message) }
  }

  const headers = ['Part', 'Quantity', 'Unit Price', 'Total', 'Date']
  const rows = items.map(i => ({
    _id: i._id,
    cells: <>
      <td className="px-4 py-3 font-medium text-slate-700">{i.spareparts_id?.name || '-'}</td>
      <td className="px-4 py-3 text-slate-700">{i.stockOutQuantity}</td>
      <td className="px-4 py-3 text-slate-700">${Number(i.stockOutUnitPrice).toFixed(2)}</td>
      <td className="px-4 py-3 text-slate-700 font-medium">${Number(i.stockOutTotalPrice).toFixed(2)}</td>
      <td className="px-4 py-3 text-slate-500">{i.stockOutDate ? new Date(i.stockOutDate).toLocaleDateString() : '-'}</td>
    </>
  }))

  return (
    <div>
      <h2 className="text-base font-semibold text-slate-700 mb-3">Stock Out</h2>
      <Flash msg={msg} onClear={() => setMsg('')} />

      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3 mb-6 p-4 bg-white border border-slate-200 rounded-lg">
        <label className="flex-1" style={{ minWidth: '160px' }}>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Part</span>
          <select className="mt-0.5 w-full border border-slate-200 rounded px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white transition"
            value={form.spareparts_id} onChange={e => setForm({ ...form, spareparts_id: e.target.value })}>
            <option value="">-- Select --</option>
            {parts.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </label>
        <InputGroup label="Quantity" type="number" value={form.stockOutQuantity} onChange={e => setForm({ ...form, stockOutQuantity: e.target.value })} placeholder="0" minWidth="100px" />
        <InputGroup label="Unit Price ($)" type="number" value={form.stockOutUnitPrice} onChange={e => setForm({ ...form, stockOutUnitPrice: e.target.value })} placeholder="0.00" minWidth="120px" />
        <InputGroup label="Date" value={form.stockOutDate} onChange={e => setForm({ ...form, stockOutDate: e.target.value })} placeholder="DD-MM-YYYY" minWidth="140px" required={false} />
        <div className="flex items-end gap-3">
          <div className="text-xs text-slate-500 pb-2 whitespace-nowrap">Total: <span className="font-semibold text-slate-800">${previewTotal}</span></div>
          <button className="bg-slate-800 text-white text-sm font-medium rounded px-5 py-2 hover:bg-slate-700 transition">Add</button>
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-slate-400 italic py-8 text-center">Loading...</p>
      ) : (
        <Table headers={headers} rows={rows} />
      )}
    </div>
  )
}
