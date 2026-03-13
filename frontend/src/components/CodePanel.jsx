import { useState, useEffect } from "react"
import { getAlgorithmCode } from "../api"

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
        <div className="bg-gray-200 rounded-lg p-4">
            <div className="flex gap-2 mb-4">
                {['java', 'cpp'].map(l => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1 rounded text-sm font-mono
              ${lang === l ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-900 hover:bg-gray-600'}`}
                    >
                        {l}
                    </button>
                ))}
            </div>
            {loading ? (
                <p className="text-gray-900 text-sm">Loading...</p>
            ) : (
                <div className="font-mono text-sm overflow-x-auto">
                    {lines.map((line, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 px-2 py-0.5 rounded transition-colors duration-200
    ${highlighted.includes(idx + 1)
                                    ? 'bg-blue-100 border-l-2 border-blue-500'
                                    : ''}`}
                        >
                            <span className="text-gray-400 select-none w-6 text-right">{idx + 1}</span>
                            <span className={`whitespace-pre ${highlighted.includes(idx + 1) ? 'text-blue-700 font-semibold' : 'text-gray-900'}`}>
                                {line}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CodePanel;
