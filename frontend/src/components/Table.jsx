export default function Table({ headers, rows }) {
  if (!rows.length) {
    return <p className="text-sm text-slate-400 italic py-8 text-center">Nothing here yet.</p>
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wide">
            {headers.map(h => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={row._id || i} className="hover:bg-amber-50/40 transition">{row.cells}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
