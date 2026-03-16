import { useState } from 'react'

function AlgoInput({ category, slug, onVisualize }) {
  const [val, setVal] = useState('')
  const [value, setValue] = useState('')
  const [stack, setStack] = useState('')
  const [target, setTarget] = useState('')

  const inputCls = "flex-1 px-3 py-1.5 rounded-lg text-sm border border-zinc-200 bg-zinc-50 text-gray-700 outline-none focus:border-violet-300 focus:bg-white transition-colors"
  const btnCls = "px-4 py-1.5 rounded-lg text-sm font-medium border border-violet-300 bg-violet-50 text-violet-600 hover:bg-violet-100 hover:border-violet-400 hover:text-violet-800 transition-colors whitespace-nowrap cursor-pointer"

  // binary search — needs array + target
  if (slug === 'binary-search' || slug === 'linear-search') {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input
            className={inputCls}
            type="text"
            placeholder="Enter numbers e.g. 1,3,5,7,9"
            value={val}
            onChange={e => setVal(e.target.value)}
          />
          <input
            className="w-40 px-3 py-1.5 rounded-lg text-sm border border-zinc-200 bg-zinc-50 text-gray-700 outline-none focus:border-violet-300 focus:bg-white transition-colors"
            type="text"
            placeholder="Target e.g. 5"
            value={target}
            onChange={e => setTarget(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className={btnCls} onClick={() => onVisualize({
            array: val.split(',').map(Number),
            target: Number(target)
          })}>
            ▶ Visualize
          </button>
        </div>
      </div>
    )
  }

  if (category === 'array') {
    return (
      <div className="flex gap-2 mb-4">
        <input
          className={inputCls}
          type="text"
          placeholder="Enter numbers e.g. 5,3,8,1"
          value={val}
          onChange={e => setVal(e.target.value)}
        />
        <button className={btnCls} onClick={() => onVisualize(val.split(',').map(Number))}>
          ▶ Visualize
        </button>
      </div>
    )
  }

  // stack-pop, peek, isempty — only need stack, no value
  if (['stack-pop', 'stack-peek', 'stack-isempty'].includes(slug)) {
    return (
      <div className="flex gap-2 mb-4">
        <input
          className={inputCls}
          type="text"
          placeholder="Current stack e.g. 1,2,3"
          value={stack}
          onChange={e => setStack(e.target.value)}
        />
        <button className={btnCls} onClick={() => onVisualize({
          stack: stack ? stack.split(',').map(Number) : []
        })}>
          ▶ Visualize
        </button>
      </div>
    )
  }
  if (category === 'stack') {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input
            className={inputCls}
            type="text"
            placeholder="Current stack e.g. 1,2,3 (leave empty for empty stack)"
            value={stack}
            onChange={e => setStack(e.target.value)}
          />
          <input
            className="w-40 px-3 py-1.5 rounded-lg text-sm border border-zinc-200 bg-zinc-50 text-gray-700 outline-none focus:border-violet-300 focus:bg-white transition-colors"
            type="text"
            placeholder="Value to push"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className={btnCls} onClick={() => onVisualize({
            value: Number(value),
            stack: stack ? stack.split(',').map(Number) : []
          })}>
            ▶ Visualize
          </button>
        </div>
      </div>
    )
  }

  if (slug === 'll-insert-head' || slug === 'll-insert-tail' || slug === 'll-delete-node') {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input
            className={inputCls}
            type="text"
            placeholder="Current list e.g. 10,14,18"
            value={val}
            onChange={e => setVal(e.target.value)}
          />
          <input
            className="w-40 px-3 py-1.5 rounded-lg text-sm border border-zinc-200 bg-zinc-50 text-gray-700 outline-none focus:border-violet-300 focus:bg-white transition-colors"
            type="text"
            placeholder="Value to insert"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className={btnCls} onClick={() => onVisualize({
            nodes: val ? val.split(',').map(Number) : [],
            value: Number(value)
          })}>
            ▶ Visualize
          </button>
        </div>
      </div>
    )
  }

  if (category === 'linked_list') {
    return (
      <div className="flex gap-2 mb-4">
        <input
          className={inputCls}
          type="text"
          placeholder="Enter nodes e.g. 10,20,30"
          value={val}
          onChange={e => setVal(e.target.value)}
        />
        <button className={btnCls} onClick={() => onVisualize(val.split(',').map(Number))}>
          ▶ Visualize
        </button>
      </div>
    )
  }

  return null
}

export default AlgoInput