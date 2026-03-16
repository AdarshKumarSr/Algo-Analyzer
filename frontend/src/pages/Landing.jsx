import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const BARS = [3, 7, 1, 9, 4, 6, 2, 8, 5]

const ALGORITHMS = [
  { label: 'Bubble Sort',     cat: 'Sorting',     color: 'violet' },
  { label: 'Selection Sort',  cat: 'Sorting',     color: 'violet' },
  { label: 'Insertion Sort',  cat: 'Sorting',     color: 'violet' },
  { label: 'Binary Search',   cat: 'Searching',   color: 'blue'   },
  { label: 'Linear Search',   cat: 'Searching',   color: 'blue'   },
  { label: 'Stack Push',      cat: 'Stack',       color: 'emerald'},
  { label: 'Stack Pop',       cat: 'Stack',       color: 'emerald'},
  { label: 'Stack Peek',      cat: 'Stack',       color: 'emerald'},
  { label: 'LL Traversal',    cat: 'Linked List', color: 'orange' },
  { label: 'LL Insert Head',  cat: 'Linked List', color: 'orange' },
  { label: 'LL Insert Tail',  cat: 'Linked List', color: 'orange' },
  { label: 'LL Delete Node',  cat: 'Linked List', color: 'orange' },
]

const COLOR_MAP = {
  violet:  { chip: 'bg-violet-50 border-violet-200 text-violet-600',  dot: 'bg-violet-400'  },
  blue:    { chip: 'bg-blue-50 border-blue-200 text-blue-600',        dot: 'bg-blue-400'    },
  emerald: { chip: 'bg-emerald-50 border-emerald-200 text-emerald-600', dot: 'bg-emerald-400'},
  orange:  { chip: 'bg-orange-50 border-orange-200 text-orange-600',  dot: 'bg-orange-400'  },
}

const COMING_SOON = [
  { icon: '🌳', title: 'Trees',            desc: 'BST insert, delete, search. Inorder, preorder, postorder traversals with pointer animation.' },
  { icon: '🕸️', title: 'Graphs',           desc: 'BFS and DFS with live node coloring, queue/stack state, and visited tracking.' },
  { icon: '⚡', title: 'Paste Your Code',  desc: 'Paste any sorting or searching function and watch StepWise generate a visualization automatically.' },
  { icon: '🏁', title: 'Race Mode',        desc: 'Run multiple algorithms on the same input simultaneously and watch them compete in real time.' },
  { icon: '🎲', title: 'Random Input',     desc: 'One-click random array generator with size and range controls.' },
  { icon: '🌙', title: 'Dark Mode',        desc: 'Full dark theme across all visualizers, code panels, and the landing page.' },
]

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 flex flex-col items-center text-center">

        <span className="mb-6 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 tracking-wide">
          Learn algorithms visually
        </span>

        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4 max-w-2xl">
          Understand algorithms{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #7c3aed, #10b981)' }}>
            step by step
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-lg">
          Watch sorting, searching, stacks and linked lists come to life — with live code highlighting at every step.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/visualize')}
            className="px-8 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
          >
            Start Visualizing →
          </button>
          <button
            onClick={() => navigate('/compare')}
            className="px-8 py-3 rounded-xl border border-zinc-200 text-gray-600 font-semibold text-sm hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-colors"
          >
            Compare Algorithms
          </button>
        </div>

        {/* Animated bars */}
        <div className="mt-16 flex items-end gap-2 h-24 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
          {BARS.map((val, idx) => (
            <div
              key={idx}
              className="w-8 rounded-t-md transition-all duration-700"
              style={{
                height: `${(val / 9) * 80}px`,
                backgroundImage: 'linear-gradient(to top, #7c3aed, #10b981)',
                animation: `pulse ${1 + idx * 0.15}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-300 mt-2 font-mono">bubble sort in progress...</p>
      </section>

      {/* Stats */}
      <section className="py-10 px-6 border-y border-zinc-100 bg-zinc-50">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: '12+', label: 'Algorithms'       },
            { value: '3',   label: 'Data Structures'  },
            { value: '2',   label: 'Languages'        },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-violet-600">{value}</p>
              <p className="text-sm text-zinc-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Why StepWise?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔢', title: 'Step by Step',        desc: 'Go forward, backward, or auto-play through every operation at your own pace.',        color: 'bg-violet-50 border-violet-100'  },
              { icon: '💻', title: 'Live Code',            desc: 'Watch the exact line highlight as each step executes — in Java and C++.',             color: 'bg-emerald-50 border-emerald-100'},
              { icon: '⚖️', title: 'Compare Side by Side', desc: 'Run two algorithms on the same input and watch them work simultaneously.',            color: 'bg-blue-50 border-blue-100'      },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className={`p-6 rounded-2xl border ${color}`}>
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms */}
      <section className="py-16 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">What you can explore</h2>
          <p className="text-gray-400 text-sm mb-8">12 algorithms across 3 data structures — more coming soon</p>
          <div className="flex flex-wrap justify-center gap-2">
            {ALGORITHMS.map(({ label, cat, color }) => {
              const c = COLOR_MAP[color]
              return (
                <div
                  key={label}
                  onClick={() => navigate('/visualize')}
                  className={`px-4 py-2 rounded-xl border cursor-pointer transition-all hover:scale-105 hover:shadow-sm flex items-center gap-2 ${c.chip}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-xs opacity-60">{cat}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-200">
              Roadmap
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">What's coming next</h2>
            <p className="text-gray-400 text-sm">StepWise is actively being built — here's what's on the horizon</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMING_SOON.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-2xl border border-zinc-100 bg-white hover:border-violet-200 hover:bg-violet-50/30 transition-colors group"
              >
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-1 group-hover:text-violet-600 transition-colors">{title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl border border-violet-100 bg-violet-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Ready to visualize?</h2>
          <p className="text-gray-400 text-sm mb-6">Pick an algorithm, enter your input, and watch every step unfold.</p>
          <button
            onClick={() => navigate('/visualize')}
            className="px-8 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
          >
            Start Visualizing →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-100 text-center text-xs text-zinc-300">
        StepWise — built to make algorithms click
      </footer>

      <style>{`
        @keyframes pulse {
          from { transform: scaleY(0.7); opacity: 0.7; }
          to   { transform: scaleY(1.1); opacity: 1;   }
        }
      `}</style>
    </div>
  )
}

export default Landing