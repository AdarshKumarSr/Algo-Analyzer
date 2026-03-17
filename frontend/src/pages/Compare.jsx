import { useState, useEffect } from 'react'
import { getAllAlgorithms } from '../api/index'
import Navbar from '../components/Navbar'
import ComplexityBadge from '../components/ComplexityBadge'
import CodePanel from '../components/CodePanel'
import Controls from '../components/Controls'
import VISUALIZER_MAP from '../components/visualizers'
import useVisualizer from '../hooks/useVisualizer'
import AlgoInput from '../components/AlgoInput'

function AlgoSide({ algo, visualizer }) {
  if (!algo) return (
    <div className="flex-1 flex items-center justify-center text-zinc-300 text-sm border border-dashed border-zinc-200 rounded-2xl min-h-64">
      Select an algorithm
    </div>
  )

  const VisualizerComponent = VISUALIZER_MAP[algo.slug] || VISUALIZER_MAP[algo.category] || null

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-lg font-bold text-gray-800 mb-1">{algo.name}</h2>
      <p className="text-xs text-gray-400 mb-4">{algo.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <ComplexityBadge label="Best"    value={algo.time_best} />
        <ComplexityBadge label="Average" value={algo.time_avg} />
        <ComplexityBadge label="Worst"   value={algo.time_worst} />
        <ComplexityBadge label="Space"   value={algo.space_complexity} />
      </div>

      {VisualizerComponent && visualizer.steps.length > 0 && (
        <VisualizerComponent step={visualizer.step} slug={algo.slug} />
      )}

      {visualizer.steps.length > 0 && (
        <Controls
          onPrev={visualizer.prev}
          onNext={visualizer.next}
          onPlay={visualizer.play}
          onReset={visualizer.reset}
          currentStep={visualizer.currentStep}
          totalSteps={visualizer.totalSteps}
          isPlaying={visualizer.isPlaying}
        />
      )}

      {visualizer.error && (
        <p className="text-red-400 text-sm mb-4">{visualizer.error}</p>
      )}

      <CodePanel slug={algo.slug} currentStep={visualizer.step} />
    </div>
  )
}

const CATEGORY_LABELS = {
  array:       'Arrays',
  stack:       'Stacks',
  linked_list: 'Linked Lists',
}

function GroupedSelect({ algorithms, value, onChange, label }) {
  const groups = algorithms.reduce((acc, algo) => {
    const cat = algo.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(algo)
    return acc
  }, {})

  return (
    <div className="flex-1">
      <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-gray-700 outline-none focus:border-violet-300 focus:bg-white transition-colors"
      >
        <option value="">Select algorithm</option>
        {Object.entries(groups).map(([cat, algos]) => (
          <optgroup key={cat} label={CATEGORY_LABELS[cat] || cat}>
            {algos.map(a => (
              <option key={a.slug} value={a.slug}>{a.name}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}

function Compare() {
  const [algorithms, setAlgorithms] = useState([])
  const [algoA, setAlgoA] = useState(null)
  const [algoB, setAlgoB] = useState(null)

  const vizA = useVisualizer()
  const vizB = useVisualizer()

  useEffect(() => {
    getAllAlgorithms()
      .then(res => setAlgorithms(res.data.data))
      .catch(err => console.error(err))
  }, [])

  const handleCompare = (input) => {
    if (!algoA || !algoB) return
    vizA.generate(algoA.slug, input)
    vizB.generate(algoB.slug, input)
  }

  const handleSelectA = (slug) => {
    setAlgoA(algorithms.find(a => a.slug === slug) || null)
    vizA.clear()
  }

  const handleSelectB = (slug) => {
    setAlgoB(algorithms.find(a => a.slug === slug) || null)
    vizB.clear()
  }

  const categoryMismatch = algoA && algoB && algoA.category !== algoB.category

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Compare Algorithms</h1>
          <p className="text-sm text-gray-400">Same input, two algorithms — see how they differ step by step</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <GroupedSelect algorithms={algorithms} value={algoA?.slug || ''} onChange={handleSelectA} label="Algorithm A" />
          <div className="px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-xs font-bold self-center shrink-0">VS</div>
          <GroupedSelect algorithms={algorithms} value={algoB?.slug || ''} onChange={handleSelectB} label="Algorithm B" />
        </div>

        {/* Warn if categories don't match */}
        {categoryMismatch && (
          <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-amber-700 text-sm">
              These algorithms use different data structures — comparing them may not be meaningful. Try picking two from the same category.
            </p>
          </div>
        )}

        {/* Input — only when both selected and same category */}
        {algoA && algoB && !categoryMismatch && (
          <div className="mb-8">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5 block">
              Input — same data fed to both
            </label>
            <AlgoInput
              category={algoA.category}
              slug={algoA.slug}
              onVisualize={handleCompare}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <AlgoSide algo={algoA} visualizer={vizA} />
          <div className="w-px bg-zinc-100 self-stretch hidden md:block" />
          <AlgoSide algo={algoB} visualizer={vizB} />
        </div>

      </main>
    </div>
  )
}

export default Compare