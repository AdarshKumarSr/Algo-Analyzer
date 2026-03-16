import { Link, useLocation } from 'react-router-dom'

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur border-b border-zinc-100">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">S</span>
        <span className="font-bold text-gray-800 tracking-tight">StepWise</span>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-violet-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Home
        </Link>
        <Link
          to="/visualize"
          className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors
            ${pathname === '/visualize'
              ? 'bg-violet-600 text-white'
              : 'bg-violet-50 text-violet-600 hover:bg-violet-100'}`}
        >
          Visualize
        </Link>

        {/* Hamburger — only on /visualize */}
        {pathname === '/visualize' && (
          <button
            onClick={onMenuClick}
            className="flex flex-col gap-1 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <span className="w-5 h-0.5 bg-gray-600 rounded"/>
            <span className="w-5 h-0.5 bg-gray-600 rounded"/>
            <span className="w-5 h-0.5 bg-gray-600 rounded"/>
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar