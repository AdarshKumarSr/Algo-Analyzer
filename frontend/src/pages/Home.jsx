import { useState, useEffect } from 'react'
import { getAlgorithmCode } from '../api/index'
import Sidebar from '../components/Sidebar'
import ComplexityBadge from '../components/ComplexityBadge'
import CodePanel from '../components/CodePanel'
import Controls from '../components/Controls'
import useVisualizer from '../hooks/useVisualizer'
import VISUALIZER_MAP from '../components/visualizers'
import AlgoInput from '../components/AlgoInput'
import Navbar from '../components/Navbar'

function Home() {
    const [selectedAlgo, setSelectedAlgo] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const visualizer = useVisualizer()
    const [highlightMap, setHighlightMap] = useState(null)
    const VisualizerComponent = selectedAlgo
        ? (VISUALIZER_MAP[selectedAlgo.slug] || VISUALIZER_MAP[selectedAlgo.category])
        : null

    useEffect(() => {
        if (!selectedAlgo) return
        getAlgorithmCode(selectedAlgo.slug, 'java')
            .then(res => setHighlightMap(res.data.data.highlight_map))
    }, [selectedAlgo])

    const handleSelect = (algo) => {
        setSelectedAlgo(algo)
        visualizer.clear()
        setSidebarOpen(false)
    }

    return (
        <div className="flex h-screen overflow-hidden">

            <Navbar onMenuClick={() => setSidebarOpen(true)} />

            {/* Sidebar overlay backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar onSelect={handleSelect} selectedSlug={selectedAlgo?.slug} onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 pt-20">
                {!selectedAlgo ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-300">No algorithm selected</h1>
                        <p className="text-gray-400 text-sm">Open the menu to pick an algorithm</p>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="px-5 py-2 rounded-lg bg-violet-50 text-violet-600 border border-violet-200 text-sm font-medium hover:bg-violet-100 transition-colors"
                        >
                            ☰ Browse Algorithms
                        </button>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">

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
                        <AlgoInput
                            category={selectedAlgo.category}
                            slug={selectedAlgo.slug}
                            onVisualize={(input) => visualizer.generate(selectedAlgo.slug, input)}
                        />

                        {/* Error */}
                        {visualizer.error && (
                            <p className="text-red-400 text-sm mb-4">{visualizer.error}</p>
                        )}

                        {VisualizerComponent && (
                            <VisualizerComponent step={visualizer.step} slug={selectedAlgo.slug} />
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

export default Home