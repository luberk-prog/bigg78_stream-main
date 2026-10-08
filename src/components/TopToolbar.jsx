import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CategoryTab = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    type="button"
    aria-pressed={active}
    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
      active
        ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
    }`}
  >
    {label}
  </button>
)

export default function TopToolbar({ activeCat, setActiveCat }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const categories = ['Trending', 'Gaming', 'Music', 'Live']

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`)
    }
  }

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-6 flex items-center justify-between pointer-events-none">
      <div className="flex-1 flex items-center gap-4 pointer-events-auto">
        <div className="glass px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-zinc-800/80 group bg-zinc-950/80 backdrop-blur-md focus-within:border-red-500/80 transition-colors">
          <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            aria-label="Search YouTube or rooms"
            onKeyDown={handleSearch}
            placeholder="Search YouTube or rooms..." 
            className="bg-transparent border-none focus:outline-none text-sm text-white font-bold placeholder:text-zinc-500 w-48"
          />
        </div>
      </div>

      <nav aria-label="Category filter" className="glass p-1.5 rounded-full flex items-center gap-1 pointer-events-auto bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 shadow-3xl">
        {categories.map(cat => (
          <CategoryTab 
            key={cat} 
            label={cat} 
            active={activeCat === cat} 
            onClick={() => setActiveCat(cat)} 
          />
        ))}
      </nav>

      <div className="flex-1 flex items-center justify-end gap-4 pointer-events-auto">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="glass p-3 rounded-full hover:bg-zinc-800/80 transition-all text-zinc-300 hover:text-white border border-zinc-800/80 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border border-zinc-950" />
        </button>
        <button
          type="button"
          aria-label="User Profile"
          title="User Profile"
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-[14px] overflow-hidden shadow-lg border border-zinc-700/60 cursor-pointer hover:border-red-500 hover:shadow-red-950/30 transition-all flex items-center justify-center bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.name || "User profile"} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-black uppercase text-red-500">
              {user?.name?.[0] || user?.email?.[0] || 'G'}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
