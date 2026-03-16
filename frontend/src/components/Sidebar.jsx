import { useEffect, useState } from 'react'
import { getAllAlgorithms } from '../api/index'

const CATEGORIES = ['array', 'stack', 'linked_list']

const CATEGORY_META = {
  array:       { label: 'Arrays',      dot: 'bg-violet-400',  text: 'text-violet-500',  activeBg: 'bg-violet-50',  activeText: 'text-violet-700',  hoverBg: 'hover:bg-violet-50',  hoverText: 'hover:text-violet-600' },
  stack:       { label: 'Stack',       dot: 'bg-emerald-400', text: 'text-emerald-500', activeBg: 'bg-emerald-50', activeText: 'text-emerald-700', hoverBg: 'hover:bg-emerald-50', hoverText: 'hover:text-emerald-600' },
  linked_list: { label: 'Linked List', dot: 'bg-orange-400',  text: 'text-orange-500',  activeBg: 'bg-orange-50',  activeText: 'text-orange-700',  hoverBg: 'hover:bg-orange-50',  hoverText: 'hover:text-orange-600' },
}

function AlgoButton({ algo, isActive, onClick, meta }) {
  return (
    <button
      onClick={() => onClick(algo)}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors font-sans
        ${isActive
          ? `${meta.activeBg} ${meta.activeText} font-medium`
          : `text-zinc-400 ${meta.hoverBg} ${meta.hoverText}`
        }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? meta.dot : 'bg-zinc-300'}`} />
      {algo.name}
    </button>
  )
}

function Sidebar({ onSelect, selectedSlug, onClose }) {
  const [algorithms, setAlgorithms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllAlgorithms()
      .then(res => setAlgorithms(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <aside className="w-68 bg-white border-r border-zinc-100 min-h-screen flex flex-col">

      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <span className="text-sm font-semibold text-gray-800 tracking-tight">StepWise</span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-zinc-300 hover:text-zinc-600 transition-colors p-1 rounded-md hover:bg-zinc-100 text-lg leading-none"
            >
              ✕
            </button>
          )}
        </div>
        <p className="text-xs text-zinc-400 pl-9">Select an algorithm to visualize</p>
      </div>

      <div className="h-px bg-zinc-100 mx-4" />

      {/* Algorithm list */}
      <div className="flex-1 px-3 py-4 flex flex-col gap-5 overflow-y-auto">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-zinc-100 rounded-lg animate-pulse" />
          ))
        ) : (
          CATEGORIES.map((cat, i) => {
            const meta = CATEGORY_META[cat]
            const algos = algorithms.filter(a => a.category === cat)
            return (
              <div key={cat}>
                {i > 0 && <div className="h-px bg-zinc-100 mb-4" />}

                {/* Category label */}
                <div className="flex items-center gap-2 px-2 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                  <span className={`text-xs font-semibold uppercase tracking-widest ${meta.text}`}>
                    {meta.label}
                  </span>
                </div>

                {/* Algo buttons */}
                {algos.map(a => (
                  <AlgoButton
                    key={a.slug}
                    algo={a}
                    isActive={selectedSlug === a.slug}
                    onClick={onSelect}
                    meta={meta}
                  />
                ))}
              </div>
            )
          })
        )}
      </div>
    </aside>
  )
}

export default Sidebar