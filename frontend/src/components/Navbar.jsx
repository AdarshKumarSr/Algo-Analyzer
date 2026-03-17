import { Link, useLocation } from 'react-router-dom'

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()

  // Helper to determine link styles to keep things "even"
  const getLinkStyle = (path) => {
    const isActive = pathname === path
    const baseClasses = "text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200"
    
    return isActive 
      ? `${baseClasses} bg-violet-600 text-white shadow-sm` 
      : `${baseClasses} text-zinc-600 hover:bg-violet-50 hover:text-violet-700`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-zinc-100">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:bg-violet-700 transition-colors">
          S
        </span>
        <span className="font-bold text-zinc-900 tracking-tight text-lg">
          StepWise
        </span>
      </Link>

      {/* Navigation Group */}
      <div className="flex items-center gap-1">
        <Link to="/" className={getLinkStyle('/')}>
          Home
        </Link>

        <Link to="/visualize" className={getLinkStyle('/visualize')}>
          Visualize
        </Link>

        <Link to="/compare" className={getLinkStyle('/compare')}>
          Compare
        </Link>

        <Link to="/analyze" className={getLinkStyle('/analyze')}>
          Analyze
        </Link>

        {/* Separator & Actions */}
        {pathname === '/visualize' && (
          <div className="flex items-center ml-2 pl-2 border-l border-zinc-200">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-600 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar