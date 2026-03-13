import { useState, useEffect } from 'react'
import { getAlgorithmCode } from '../api/index'
import Sidebar from '../components/Sidebar'
import ComplexityBadge from '../components/ComplexityBadge'
import CodePanel from '../components/CodePanel'
import Controls from '../components/Controls'
import useVisualizer from '../hooks/useVisualizer'
import Visualizer from '../components/Visualizer'


function Home() {
    const [selectedAlgo, setSelectedAlgo] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const visualizer = useVisualizer()
    const [highlightMap, setHighlightMap] = useState(null)

    useEffect(() => {
        if (!selectedAlgo) return
        getAlgorithmCode(selectedAlgo.slug, 'java')
            .then(res => setHighlightMap(res.data.data.highlight_map))
    }, [selectedAlgo])

    const handleSelect = (algo) => {
        setSelectedAlgo(algo)
        visualizer.reset()
    }

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar onSelect={handleSelect} selectedSlug={selectedAlgo?.slug} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                {!selectedAlgo ? (
                    <h1 className="text-2xl font-bold text-gray-400">Select an algorithm</h1>
                ) : (
                    <div className="max-w-4xl">

                        {/* Title + Description */}
                        <h1 className="text-2xl font-bold mb-2">{selectedAlgo.name}</h1>
                        <p className="text-gray-400 text-sm mb-6">{selectedAlgo.description}</p>

                        {/* Complexity Badges */}
                        <div className="flex gap-3 mb-6">
                            <ComplexityBadge label="Best" value={selectedAlgo.time_best} />
                            <ComplexityBadge label="Average" value={selectedAlgo.time_avg} />
                            <ComplexityBadge label="Worst" value={selectedAlgo.time_worst} />
                            <ComplexityBadge label="Space" value={selectedAlgo.space_complexity} />
                        </div>

                        {/* Input + Visualize */}
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Enter numbers e.g. 5,3,8,1"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                className="flex-1 bg-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => {
                                    const input = inputValue.split(',').map(Number)
                                    visualizer.generate(selectedAlgo.slug, input)
                                }}
                                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded text-sm"
                            >
                                Visualize
                            </button>
                        </div>

                        {/* Error */}
                        {visualizer.error && (
                            <p className="text-red-400 text-sm mb-4">{visualizer.error}</p>
                        )}

                        {visualizer.steps.length > 0 && (
                            <Visualizer step={visualizer.step} />
                        )}

                        {/* Controls — only show after steps generated */}
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

                        {/* Code Panel */}
                        <CodePanel
                            slug={selectedAlgo.slug}
                            currentStep={visualizer.step}
                            highlightMap={highlightMap}
                        />

                    </div>
                )}
            </main>
        </div>
    )
}

export default Home;