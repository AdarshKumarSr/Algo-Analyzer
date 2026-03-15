import { useState, useEffect } from 'react'
import { getAlgorithmCode } from '../api/index'
import Sidebar from '../components/Sidebar'
import ComplexityBadge from '../components/ComplexityBadge'
import CodePanel from '../components/CodePanel'
import Controls from '../components/Controls'
import useVisualizer from '../hooks/useVisualizer'
import VISUALIZER_MAP from '../components/visualizers'
import AlgoInput from '../components/AlgoInput'



function Home() {
    const [selectedAlgo, setSelectedAlgo] = useState(null)
    // const [inputValue, setInputValue] = useState('')
    const visualizer = useVisualizer()
    const [highlightMap, setHighlightMap] = useState(null)
    // const VisualizerComponent = VISUALIZER_MAP[selectedAlgo.category]
    const VisualizerComponent = selectedAlgo ? VISUALIZER_MAP[selectedAlgo.category] : null


    useEffect(() => {
        if (!selectedAlgo) return
        getAlgorithmCode(selectedAlgo.slug, 'java')
            .then(res => setHighlightMap(res.data.data.highlight_map))
    }, [selectedAlgo])

    const handleSelect = (algo) => {
        setSelectedAlgo(algo)
        visualizer.clear()  // ← was reset()
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
                        {/* <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Enter numbers e.g. 5,3,8,1"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '6px 12px',
                                    borderRadius: 8,
                                    fontSize: 13,
                                    fontFamily: 'inherit',
                                    border: '0.5px solid #e4e4e7',
                                    background: '#fafafa',
                                    color: '#374151',
                                    outline: 'none',
                                    transition: 'border-color 0.12s',
                                }}
                                onFocus={e => { e.currentTarget.style.borderColor = '#afa9ec'; e.currentTarget.style.background = '#fff' }}
                                onBlur={e => { e.currentTarget.style.borderColor = '#e4e4e7'; e.currentTarget.style.background = '#fafafa' }}
                            />
                            <button
                                onClick={() => {
                                    <AlgoInput
                                        category={selectedAlgo.category}
                                        onVisualize={(input) => visualizer.generate(selectedAlgo.slug, input)}
                                    />
                                    visualizer.generate(selectedAlgo.slug, input)
                                }}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: 8,
                                    fontSize: 13,
                                    fontFamily: 'inherit',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    border: '0.5px solid #afa9ec',
                                    background: '#eeedfe',
                                    color: '#534ab7',
                                    transition: 'all 0.12s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#e0deff'; e.currentTarget.style.borderColor = '#7f77dd'; e.currentTarget.style.color = '#3c3489' }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#eeedfe'; e.currentTarget.style.borderColor = '#afa9ec'; e.currentTarget.style.color = '#534ab7' }}
                            >
                                ▶ Visualize
                            </button>
                        </div> */}
                        {/* Input + Visualize */}
                        <AlgoInput
                            category={selectedAlgo.category}
                            onVisualize={(input) => visualizer.generate(selectedAlgo.slug, input)}
                        />

                        {/* Error */}
                        {visualizer.error && (
                            <p className="text-red-400 text-sm mb-4">{visualizer.error}</p>
                        )}

                        {VisualizerComponent && <VisualizerComponent step={visualizer.step} />}


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