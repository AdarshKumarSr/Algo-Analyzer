import { useEffect, useState } from 'react'
import { getAllAlgorithms } from '../api/index'

const CATEGORIES = ['array', 'stack', 'linked_list']

const CATEGORY_META = {
  array:       { label: 'Arrays',      color: 'purple' },
  stack:       { label: 'Stack',       color: 'teal'   },
  linked_list: { label: 'Linked List', color: 'coral'  },
}

const COLOR = {
  purple: { dot: '#7f77dd', label: '#7f77dd', activeBg: '#eeedfe', activeText: '#534ab7', hoverBg: '#f5f4ff', hoverText: '#7f77dd' },
  teal:   { dot: '#0f9e73', label: '#0f9e73', activeBg: '#e1f5ee', activeText: '#0f6e56', hoverBg: '#edfaf4', hoverText: '#1d9e75' },
  coral:  { dot: '#d85a30', label: '#d85a30', activeBg: '#faece7', activeText: '#712b13', hoverBg: '#fef3ef', hoverText: '#d85a30' },
}

function AlgoButton({ algo, isActive, onClick, color }) {
  const [hovered, setHovered] = useState(false)
  const c = COLOR[color]

  const bg = isActive ? c.activeBg : hovered ? c.hoverBg : 'transparent'
  const textColor = isActive ? c.activeText : hovered ? '#ccc' : '#888'

  return (
    <button
      onClick={() => onClick(algo)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', textAlign: 'left', background: bg, border: 'none',
        cursor: 'pointer', padding: '7px 10px', borderRadius: 8,
        fontSize: 13, color: textColor, display: 'flex', alignItems: 'center',
        gap: 8, transition: 'background 0.12s, color 0.12s', fontFamily: 'inherit',
        fontWeight: isActive ? 500 : 400,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', opacity: isActive ? 1 : 0.5, flexShrink: 0 }} />
      {algo.name}
    </button>
  )
}

function Sidebar({ onSelect, selectedSlug }) {
  const [algorithms, setAlgorithms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllAlgorithms()
      .then(res => setAlgorithms(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <aside style={{ width: 272, background: '#ffffff', border: '0.5px solid #e4e4e7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
            ▦
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#000', letterSpacing: '-0.2px' }}>Algo Analyzer</span>
        </div>
        <div style={{ fontSize: 12, color: '#555', paddingLeft: 38 }}>Select an algorithm to visualize</div>
      </div>

      <div style={{ flex: 1, padding: '8px 12px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} style={{ height: 32, background: '#1a1d27', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
          ))
        ) : (
          CATEGORIES.map((cat, i) => {
            const { label, color } = CATEGORY_META[cat]
            const c = COLOR[color]
            const algos = algorithms.filter(a => a.category === cat)
            return (
              <div key={cat}>
                {i > 0 && <div style={{ height: 0.5, background: '#1e2030', margin: '0 8px 16px' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', marginBottom: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: c.label }}>
                    {label}
                  </span>
                </div>
                {algos.map(a => (
                  <AlgoButton key={a.slug} algo={a} isActive={selectedSlug === a.slug} onClick={onSelect} color={color} />
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