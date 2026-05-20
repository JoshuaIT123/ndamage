export default function Flash({ msg, onClear }) {
  if (!msg) return null
  return (
    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-3 py-2 mb-4">
      <span>{msg}</span>
      <button className="ml-auto text-emerald-400 hover:text-emerald-600 font-bold leading-none" onClick={onClear}>&times;</button>
    </div>
  )
}
