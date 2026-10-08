import { Link, useLocation } from 'react-router-dom'

const SidebarIcon = ({ children, to, active, label }) => (
  <Link
    to={to}
    aria-label={label}
    title={label}
    className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
      active 
        ? 'bg-zinc-100 text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
        : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
    }`}
  >
    {children}
  </Link>
)

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside
      aria-label="Main navigation"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 p-2 rounded-[2.5rem] bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/80 shadow-2xl"
    >
      <SidebarIcon to="/dashboard" active={pathname === '/dashboard'} label="Dashboard">
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </SidebarIcon>

      <SidebarIcon to="/search" active={pathname === '/search'} label="Search">
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </SidebarIcon>

      <SidebarIcon to="/favorites" active={pathname === '/favorites'} label="Favorites">
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </SidebarIcon>

      <SidebarIcon to="/history" active={pathname === '/history'} label="History">
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </SidebarIcon>

      <div className="w-8 h-px bg-zinc-800 mx-auto my-1" />

      <SidebarIcon to="/settings" active={pathname === '/settings'} label="Settings">
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </SidebarIcon>
    </aside>
  )
}
