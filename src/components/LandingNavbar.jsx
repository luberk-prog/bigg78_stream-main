import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LandingNavbar() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-zinc-950/95 via-zinc-950/60 to-transparent backdrop-blur-sm border-b border-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* LEFT: Logo / Wordmark */}
        <Link
          to="/"
          aria-label="BIGG78 STREAM homepage"
          className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-base tracking-wider shadow-lg shadow-red-950/40 group-hover:bg-red-500 group-hover:shadow-red-950/60 transition-all duration-200">
            B
          </div>
          <span className="text-base font-bold tracking-wide text-white uppercase font-sans hidden sm:inline-block">
            BIGG78 <span className="text-red-500 font-extrabold">STREAM</span>
          </span>
        </Link>

        {/* CENTER: Navigation Links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 flex-1 px-8">
          <Link to="/" className="text-xs font-semibold text-white uppercase tracking-wider hover:text-red-500 transition-colors duration-200">
            Home
          </Link>
          <Link to="/search?category=movies" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors duration-200">
            Movies
          </Link>
          <Link to="/search?category=series" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors duration-200">
            Series
          </Link>
          <Link to="/dashboard" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors duration-200">
            Rooms
          </Link>
        </nav>

        {/* RIGHT: Search + Sign In */}
        <div className="flex items-center gap-3 shrink-0">
          <form onSubmit={handleSearch} role="search" className="hidden sm:flex relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              aria-label="Search videos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-3 py-1.5 bg-zinc-900/60 hover:bg-zinc-900/80 focus:bg-zinc-900 text-white placeholder-zinc-500 text-sm rounded-lg border border-zinc-800/60 focus:border-red-500/60 focus:outline-none transition-all duration-200 w-48"
            />
          </form>

          <Link
            to="/login"
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 uppercase tracking-wide"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-zinc-950/95 backdrop-blur border-t border-zinc-900/30 px-4 py-4 space-y-3">
          <Link to="/" className="block text-sm font-semibold text-white uppercase tracking-wider hover:text-red-500 transition-colors">
            Home
          </Link>
          <Link to="/search?category=movies" className="block text-sm font-semibold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors">
            Movies
          </Link>
          <Link to="/search?category=series" className="block text-sm font-semibold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors">
            Series
          </Link>
          <Link to="/dashboard" className="block text-sm font-semibold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors">
            Rooms
          </Link>
          <form onSubmit={handleSearch} role="search" className="pt-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                aria-label="Search videos mobile"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full pl-9 pr-3 py-2 bg-zinc-900/80 text-white placeholder-zinc-500 text-sm rounded-lg border border-zinc-800/60 focus:outline-none focus:border-red-500/60 transition-all"
              />
            </div>
          </form>
        </nav>
      )}
    </header>
  )
}
