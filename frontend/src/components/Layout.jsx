import { NavLink, useNavigate } from 'react-router-dom'

const links = [
  { to: '/',           label: 'Dashboard',   icon: 'D' },
  { to: '/spare-parts', label: 'Spare Parts', icon: 'P' },
  { to: '/stock-in',   label: 'Stock In',    icon: '+' },
  { to: '/stock-out',  label: 'Stock Out',   icon: '-' },

]

export default function Layout({ children }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-52 bg-slate-900 flex flex-col shrink-0">
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-slate-800">
          <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
          <span className="text-sm font-bold text-white tracking-wide">Spare Parts</span>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 p-3">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 text-xs font-medium rounded px-3 py-2 transition ${
                  isActive ? 'bg-amber-400 text-slate-900' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }>
              <span className="w-5 h-5 flex items-center justify-center rounded bg-black/15 text-[11px] font-bold">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <button onClick={handleLogout}
            className="w-full text-xs text-slate-500 hover:text-rose-400 transition text-left px-3 py-2">
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6">
          <span className="text-xs text-slate-400">Inventory Manager</span>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
