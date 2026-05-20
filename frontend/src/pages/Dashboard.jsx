import { useState, useEffect } from 'react'
import StatsCard from '../components/StatsCard'
import Table from '../components/Table'
import { spareParts, stockOut } from '../services/api'

export default function Dashboard() {
  const [parts, setParts] = useState([])
  const [stockOuts, setStockOuts] = useState([])

  const load = () => {
    spareParts.getAll().then(setParts).catch(() => setParts([]))
    stockOut.getAll().then(setStockOuts).catch(() => setStockOuts([]))
  }
  useEffect(() => {
    load()
    const id = setInterval(load, 10000)
    return () => clearInterval(id)
  }, [])

  const totalParts = parts.length
  const totalQty = parts.reduce((s, p) => s + (p.quantity || 0), 0)
  const totalValue = parts.reduce((s, p) => s + (p.totalPrice || 0), 0)
  const totalStockOutQty = stockOuts.reduce((s, i) => s + (i.stockOutQuantity || 0), 0)
  const recent = [...stockOuts].reverse().slice(0, 5)

  const headers = ['Part', 'Qty', 'Unit Price', 'Total', 'Date']
  const rows = recent.map(i => ({
    _id: i._id,
    cells: <>
      <td className="px-4 py-3 font-medium text-slate-700">{i.spareparts_id?.name || '-'}</td>
      <td className="px-4 py-3 text-slate-700">{i.stockOutQuantity}</td>
      <td className="px-4 py-3 text-slate-700">${Number(i.stockOutUnitPrice || 0).toFixed(2)}</td>
      <td className="px-4 py-3 text-slate-700 font-medium">${Number(i.stockOutTotalPrice || 0).toFixed(2)}</td>
      <td className="px-4 py-3 text-slate-500">{i.stockOutDate ? new Date(i.stockOutDate).toLocaleDateString() : '-'}</td>
    </>
  }))

  return (
    <div>
      <h2 className="text-base font-semibold text-slate-700 mb-4">Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Spare Parts" value={totalParts} accent="amber" />
        <StatsCard label="Total Quantity" value={totalQty} accent="blue" />
        <StatsCard label="Inventory Value" value={`$${totalValue.toFixed(2)}`} accent="emerald" />
        <StatsCard label="Stock Out Items" value={totalStockOutQty} accent="rose" />
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Recent Stock Outs</h3>
        <Table headers={headers} rows={rows} />
      </div>
    </div>
  )
}
