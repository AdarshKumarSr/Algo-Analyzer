import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const VisualizerComponent = VISUALIZER_MAP[algo.category] || null

  return (
    <div className="flex-1 min-w-0">

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-800 mb-1">{algo.name}</h2>
      <p className="text-xs text-gray-400 mb-4">{algo.description}</p>

      {/* Complexity badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <ComplexityBadge label="Best"    value={algo.time_best} />
        <ComplexityBadge label="Average" value={algo.time_avg} />
        <ComplexityBadge label="Worst"   value={algo.time_worst} />
        <ComplexityBadge label="Space"   value={algo.space_complexity} />
      </div>

      {/* Visualizer */}
      {VisualizerComponent && visualizer.steps.length > 0 && (
        <VisualizerComponent step={visualizer.step} />
      )}

      {/* Controls */}
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

      {/* Error */}
      {visualizer.error && (
        <p className="text-red-400 text-sm mb-4">{visualizer.error}</p>
      )}

      {/* Code Panel */}
      <CodePanel
        slug={algo.slug}
        currentStep={visualizer.step}
      />
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

  // only show array algorithms
  const arrayAlgos = algorithms.filter(a => a.category === 'array')

  const handleCompare = (input) => {
    if (!algoA || !algoB) return
    vizA.generate(algoA.slug, input)
    vizB.generate(algoB.slug, input)
  }

  const handleSelectA = (slug) => {
    const algo = algorithms.find(a => a.slug === slug)
    setAlgoA(algo)
    vizA.clear()
  }

  const handleSelectB = (slug) => {
    const algo = algorithms.find(a => a.slug === slug)
    setAlgoB(algo)
    vizB.clear()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Compare Algorithms</h1>
          <p className="text-sm text-gray-400">Same input, two algorithms — see how they differ step by step</p>
        </div>

        {/* Algorithm selectors + input */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">

          {/* Algo A dropdown */}
          <div className="flex-1">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5 block">Algorithm A</label>
            <select
              value={algoA?.slug || ''}
              onChange={e => handleSelectA(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-gray-700 outline-none focus:border-violet-300 focus:bg-white transition-colors"
            >
              <option value="">Select algorithm</option>
              {arrayAlgos.map(a => (
                <option key={a.slug} value={a.slug}>{a.name}</option>
              ))}
            </select>
          </div>

          {/* VS badge */}
          <div className="px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-xs font-bold self-center">
            VS
          </div>

          {/* Algo B dropdown */}
          <div className="flex-1">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5 block">Algorithm B</label>
            <select
              value={algoB?.slug || ''}
              onChange={e => handleSelectB(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-gray-700 outline-none focus:border-violet-300 focus:bg-white transition-colors"
            >
              <option value="">Select algorithm</option>
              {arrayAlgos.map(a => (
                <option key={a.slug} value={a.slug}>{a.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Input */}
        {algoA && algoB && (
          <div className="mb-8">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5 block">
              Input — same array fed to both
            </label>
            <AlgoInput
              category="array"
              onVisualize={handleCompare}
            />
          </div>
        )}

        {/* Side by side */}
        <div className="flex flex-col md:flex-row gap-8">
          <AlgoSide algo={algoA} visualizer={vizA} />

          {/* Divider */}
          <div className="w-px bg-zinc-100 self-stretch hidden md:block" />

          <AlgoSide algo={algoB} visualizer={vizB} />
        </div>

      </main>
    </div>
  )
}

export default Compare