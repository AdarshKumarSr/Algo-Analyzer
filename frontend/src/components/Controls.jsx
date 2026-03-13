function Controls({ onPrev, onNext, onPlay, onReset, currentStep, totalSteps, isPlaying }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <button
        onClick={onReset}
        className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-600 text-sm"
      >
        ↺ Reset
      </button>
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-600 text-sm disabled:opacity-30"
      >
        ← Prev
      </button>
      <button
        onClick={onPlay}
        disabled={isPlaying || currentStep === totalSteps - 1}
        className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-500 text-sm disabled:opacity-30"
      >
        {isPlaying ? 'Playing...' : '▶ Play'}
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-600 text-sm disabled:opacity-30"
      >
        Next →
      </button>
      <span className="text-gray-400 text-sm ml-2">
        Step {currentStep + 1} / {totalSteps}
      </span>
    </div>
  )
}

export default Controls;