function StackVisualizer({ step }) {
  if (!step) return null

  const { stack, top, pushing } = step.state

  return (
    <div className="bg-white rounded-lg p-6 mb-4">

      {/* Action label */}
      <div className="mb-6 flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold
          ${step.action === 'push' ? 'bg-yellow-500/20 text-yellow-400' :
            step.action === 'done' ? 'bg-green-500/20  text-green-400'  :
                                     'bg-blue-500/20   text-blue-400'}`}>
          {step.action.toUpperCase()}
        </span>
        <span className="text-gray-400 text-sm">
          {step.action === 'idle' && 'Current stack state'}
          {step.action === 'push' && `Pushing ${pushing} onto the stack`}
          {step.action === 'done' && `${stack[top]} pushed successfully`}
        </span>
      </div>

      {/* Stack */}
      <div className="flex flex-col-reverse items-center gap-1 min-h-48">
        {stack.length === 0 ? (
          <p className="text-gray-500 text-sm">Stack is empty</p>
        ) : (
          stack.map((val, idx) => (
            <div
              key={idx}
              className="w-32 py-2 text-center font-mono font-bold rounded-md border transition-all duration-300"
              style={{
                background:   idx === top ? '#22c55e1a' : '#3b82f61a',
                borderColor:  idx === top ? '#22c55e'   : '#3b82f6',
                color:        idx === top ? '#22c55e'   : '#3b82f6',
              }}
            >
              {val}
              {idx === top && <span className="ml-2 text-xs">← TOP</span>}
            </div>
          ))
        )}

        {/* pending push — show above stack */}
        {pushing !== null && (
          <div className="w-32 py-2 text-center font-mono font-bold rounded-md border border-dashed border-yellow-400 text-yellow-400 animate-bounce">
            {pushing} ↓
          </div>
        )}
      </div>

    </div>
  )
}

export default StackVisualizer