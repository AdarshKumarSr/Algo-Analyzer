import { useState, useEffect } from "react"
import { getAlgorithmCode } from "../api"

const LANGS = ['java', 'cpp']

function CodePanel({ slug, currentStep, highlightMap }) {
  const [lang, setLang] = useState('java')
  const [codeData, setCodeData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getAlgorithmCode(slug, lang)
      .then(res => setCodeData(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [slug, lang])

  const lines = codeData?.code?.split('\n') || []
  const highlighted = highlightMap?.[currentStep?.action] || []

  return (
    <div style={{ background: '#fff', border: '0.5px solid #e4e4e7', borderRadius: 12, overflow: 'hidden', fontFamily: 'sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '0.5px solid #f0f0f2', background: '#fafafa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#aaa', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Code</span>
          {currentStep?.label && (
            <span style={{ fontSize: 11, background: '#eeedfe', color: '#534ab7', padding: '3px 10px', borderRadius: 999, fontWeight: 500 }}>
              {currentStep.label}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {LANGS.map(l => {
            const active = lang === l
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '4px 12px', borderRadius: 6, fontSize: 12, fontFamily: 'monospace', cursor: 'pointer',
                  border: `0.5px solid ${active ? '#afa9ec' : '#e4e4e7'}`,
                  background: active ? '#eeedfe' : '#fff',
                  color: active ? '#534ab7' : '#888',
                  fontWeight: active ? 500 : 400,
                  transition: 'all 0.12s',
                }}
              >
                {l}
              </button>
            )
          })}
        </div>
      </div>

      {/* Code body */}
      <div style={{ padding: '12px 0', overflowX: 'auto', background: '#fff' }}>
        {loading ? (
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ height: 18, background: '#f4f4f5', borderRadius: 4, width: `${60 + Math.random() * 30}%` }} />
            ))}
          </div>
        ) : (
          lines.map((line, idx) => {
            const lineNum = idx + 1
            const isLit = highlighted.includes(lineNum)
            return (
              <div
                key={idx}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 16,
                  padding: isLit ? '1px 16px 1px 14px' : '1px 16px',
                  background: isLit ? '#eeedfe' : 'transparent',
                  borderLeft: isLit ? '2px solid #7f77dd' : '2px solid transparent',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ fontSize: 12, fontFamily: 'monospace', color: isLit ? '#afa9ec' : '#ccc', width: 20, textAlign: 'right', flexShrink: 0, userSelect: 'none' }}>
                  {lineNum}
                </span>
                <span style={{ fontSize: 13, fontFamily: 'monospace', whiteSpace: 'pre', color: isLit ? '#3c3489' : '#374151', fontWeight: isLit ? 500 : 400 }}>
                  {line}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default CodePanel