const BTN = {
  base: {
    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
    borderRadius: 8, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer',
    border: '0.5px solid #e4e4e7', background: '#fff', color: '#555',
    transition: 'all 0.12s', fontWeight: 400,
  },
  play: {
    background: '#eeedfe', color: '#534ab7', borderColor: '#afa9ec', fontWeight: 500,
  },
}

function Controls({ onPrev, onNext, onPlay, onReset, currentStep, totalSteps, isPlaying }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: '#fff', border: '0.5px solid #e4e4e7', borderRadius: 12, width: 'fit-content' }}>

      <button onClick={onReset} style={BTN.base}>
        ↺ Reset
      </button>

      <div style={{ width: 0.5, height: 20, background: '#e4e4e7', margin: '0 2px' }} />

      <button onClick={onPrev} disabled={currentStep === 0} style={{ ...BTN.base, opacity: currentStep === 0 ? 0.3 : 1, cursor: currentStep === 0 ? 'not-allowed' : 'pointer' }}>
        ← Prev
      </button>

      <button
        onClick={onPlay}
        disabled={isPlaying || currentStep === totalSteps - 1}
        style={{
          ...BTN.base, ...BTN.play,
          opacity: (isPlaying || currentStep === totalSteps - 1) ? 0.3 : 1,
          cursor: (isPlaying || currentStep === totalSteps - 1) ? 'not-allowed' : 'pointer',
          background: isPlaying ? '#f5f4ff' : '#eeedfe',
          color: isPlaying ? '#7f77dd' : '#534ab7',
        }}
      >
        {isPlaying ? '● Playing...' : '▶ Play'}
      </button>

      <button onClick={onNext} disabled={currentStep === totalSteps - 1} style={{ ...BTN.base, opacity: currentStep === totalSteps - 1 ? 0.3 : 1, cursor: currentStep === totalSteps - 1 ? 'not-allowed' : 'pointer' }}>
        Next →
      </button>

      <div style={{ width: 0.5, height: 20, background: '#e4e4e7', margin: '0 2px' }} />

      <span style={{ fontSize: 12, color: '#bbb', marginLeft: 4, whiteSpace: 'nowrap' }}>
        Step <b style={{ color: '#534ab7', fontWeight: 500 }}>{currentStep + 1}</b> / <b style={{ color: '#534ab7', fontWeight: 500 }}>{totalSteps}</b>
      </span>
    </div>
  )
}

export default Controls