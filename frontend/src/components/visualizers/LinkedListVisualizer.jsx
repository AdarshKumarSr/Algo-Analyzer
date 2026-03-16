function LinkedListVisualizer({ step }) {
  if (!step) return null

  const { nodes, current, visited } = step.state

  const getNodeStyle = (idx) => {
    if (idx === current) return { box: 'border-yellow-400 bg-yellow-50', text: 'text-yellow-600' }
    if (visited.includes(idx)) return { box: 'border-green-400 bg-green-50', text: 'text-green-600' }
    return { box: 'border-zinc-300 bg-white', text: 'text-gray-700' }
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-4">

      {/* Action label */}
      <div className="flex items-center gap-3 mb-8">
        <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold
          ${step.action === 'visit' ? 'bg-yellow-500/20 text-yellow-500' :
            step.action === 'move'  ? 'bg-blue-500/20   text-blue-500'   :
            step.action === 'done'  ? 'bg-green-500/20  text-green-500'  :
            step.action === 'null'  ? 'bg-red-500/20    text-red-400'    :
                                      'bg-zinc-100      text-zinc-400'}`}>
          {step.action.toUpperCase()}
        </span>
        <span className="text-gray-400 text-sm">
          {step.action === 'init'  && 'Initial linked list'}
          {step.action === 'start' && 'temp = head — starting traversal'}
          {step.action === 'visit' && `Visiting node — temp.value = ${current !== null ? nodes[current] : ''}`}
          {step.action === 'move'  && `temp = temp.next — moving forward`}
          {step.action === 'null'  && 'temp = null — end of list reached'}
          {step.action === 'done'  && 'Traversal complete!'}
        </span>
      </div>

      {/* Linked List */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-8">

        {/* HEAD label */}
        <div className="flex flex-col items-center mr-2">
          <span className="text-xs font-mono font-bold text-violet-500">HEAD</span>
          <span className="text-violet-400 text-lg">→</span>
        </div>

        {nodes.map((val, idx) => {
          const style = getNodeStyle(idx)
          const isTemp = idx === current

          return (
            <div key={idx} className="flex items-center gap-1 flex-shrink-0">

              {/* Node box */}
              <div className="flex flex-col items-center gap-1">

                {/* temp pointer label */}
                <span className={`text-xs font-mono font-bold transition-all duration-300 ${isTemp ? 'text-yellow-500' : 'invisible'}`}>
                  temp
                </span>
                <span className={`text-xs transition-all duration-300 ${isTemp ? 'text-yellow-400' : 'invisible'}`}>↓</span>

                {/* Node */}
                <div className={`flex border rounded-lg overflow-hidden transition-all duration-300 ${style.box}`}>
                  {/* value cell */}
                  <div className={`px-4 py-2 text-sm font-mono font-bold border-r ${style.box} ${style.text}`}>
                    {val}
                  </div>
                  {/* next cell */}
                  <div className={`px-3 py-2 text-xs font-mono ${style.text} opacity-60`}>
                    {idx < nodes.length - 1 ? `→` : 'null'}
                  </div>
                </div>

                {/* index */}
                <span className="text-xs text-zinc-400 font-mono">{idx}</span>
              </div>

              {/* Arrow between nodes */}
              {idx < nodes.length - 1 && (
                <span className="text-zinc-300 text-lg mb-4">→</span>
              )}
            </div>
          )
        })}

        {/* NULL label */}
        <div className="flex flex-col items-center ml-2 mb-4">
          <span className={`text-xs font-mono font-bold transition-colors duration-300 ${step.action === 'null' || step.action === 'done' ? 'text-red-400' : 'text-zinc-300'}`}>
            NULL
          </span>
        </div>
      </div>

      {/* temp pointer table */}
      {current !== null && (
        <div className="mt-2">
          <p className="text-xs text-zinc-400 font-mono mb-2">pointer state</p>
          <table className="text-sm font-mono border border-zinc-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-zinc-50 text-zinc-500 text-xs">
                <th className="px-6 py-2 border-r border-zinc-200 font-medium">temp.value</th>
                <th className="px-6 py-2 font-medium">temp.next</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="px-6 py-2 border-r border-zinc-200 text-yellow-600 font-bold">{nodes[current]}</td>
                <td className="px-6 py-2 text-blue-500 font-bold">
                  {current + 1 < nodes.length ? nodes[current + 1] : 'null'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

export default LinkedListVisualizer