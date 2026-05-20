export default function StatsCard({ label, value, accent = 'amber' }) {
  const dot = { amber: 'bg-amber-400', emerald: 'bg-emerald-400', blue: 'bg-blue-400', rose: 'bg-rose-400' }
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-4">
      <div className={`w-2.5 h-2.5 rounded-full ${dot[accent] || dot.amber}`} />
      <div>
        <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-xl font-bold text-slate-800 mt-0.5">{value}</p>
      </div>
    </div>
  )
}
