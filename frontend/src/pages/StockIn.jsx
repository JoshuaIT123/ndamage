import { useState, useEffect } from 'react'
import InputGroup from '../components/InputGroup'
import Table from '../components/Table'
import Flash from '../components/Flash'
import { stockIn, spareParts } from '../services/api'

export default function StockIn() {
  const [records, setRecords] = useState([])
  const [parts, setParts] = useState([])
  const [form, setForm] = useState({ spareparts_id: '', stockInQuantity: '', stockInDate: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    Promise.all([
      stockIn.getAll().then(setRecords).catch(() => setRecords([])),
      spareParts.getAll().then(setParts).catch(() => setParts([]))
    ]).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await stockIn.create({ spareparts_id: form.spareparts_id || undefined, stockInQuantity: Number(form.stockInQuantity), stockInDate: form.stockInDate || undefined })
      setMsg('Stock in recorded')
      setForm({ spareparts_id: '', stockInQuantity: '', stockInDate: '' })
      load()
    } catch (err) { setMsg(err.message) }
  }

  const headers = ['Part', 'Quantity', 'Date']
  const rows = records.map(r => ({
    _id: r._id,
    cells: <>
      <td className="px-4 py-3 font-medium text-slate-700">{r.spareparts_id?.name || '-'}</td>
      <td className="px-4 py-3 text-slate-700">{r.stockInQuantity}</td>
      <td className="px-4 py-3 text-slate-500">{r.stockInDate ? new Date(r.stockInDate).toLocaleDateString() : '-'}</td>
    </>
  }))

  return (
    <div>
      <h2 className="text-base font-semibold text-slate-700 mb-3">Stock In</h2>
      <Flash msg={msg} onClear={() => setMsg('')} />

      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 mb-6 p-4 bg-white border border-slate-200 rounded-lg">
        <label className="flex-1" style={{ minWidth: '160px' }}>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Part</span>
          <select className="mt-0.5 w-full border border-slate-200 rounded px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white transition"
            value={form.spareparts_id} onChange={e => setForm({ ...form, spareparts_id: e.target.value })}>
            <option value="">-- Select --</option>
            {parts.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </label>
        <InputGroup label="Quantity" type="number" value={form.stockInQuantity} onChange={e => setForm({ ...form, stockInQuantity: e.target.value })} placeholder="0" minWidth="100px" />
        <InputGroup label="Date" value={form.stockInDate} onChange={e => setForm({ ...form, stockInDate: e.target.value })} placeholder="DD-MM-YYYY" minWidth="140px" required={false} />
        <button className="bg-slate-800 text-white text-sm font-medium rounded px-5 py-2 hover:bg-slate-700 transition">Record</button>
      </form>

      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Stock In History</h3>
        {loading ? (
          <p className="text-sm text-slate-400 italic py-8 text-center">Loading...</p>
        ) : (
          <Table headers={headers} rows={rows} />
        )}
      </div>
    </div>
  )
}
