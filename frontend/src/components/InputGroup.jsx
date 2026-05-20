export default function InputGroup({ label, type = 'text', value, onChange, placeholder, minWidth, required = true }) {
  return (
    <label className="flex-1" style={minWidth ? { minWidth } : {}}>
      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">{label}</span>
      <input className="mt-0.5 w-full border border-slate-200 rounded px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white transition" type={type}
        value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </label>
  )
}
