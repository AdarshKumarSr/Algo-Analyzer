import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

const BARS = [3, 7, 1, 9, 4, 6, 2, 8, 5]

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 flex flex-col items-center text-center">

        {/* Badge */}
        <span className="mb-6 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 tracking-wide">
          Learn algorithms visually
        </span>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4 max-w-2xl">
          Understand algorithms{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">
            step by step
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-lg">
          Watch sorting, searching, stacks and linked lists come to life — with live code highlighting at every step.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('/visualize')}
          className="px-8 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
        >
          Start Visualizing →
        </button>

        {/* Animated bars */}
        <div className="mt-16 flex items-end gap-2 h-24 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
          {BARS.map((val, idx) => (
            <div
              key={idx}
              className="w-8 rounded-t-md bg-gradient-to-t from-violet-500 to-emerald-400 transition-all duration-700"
              style={{
                height: `${(val / 9) * 80}px`,
                animation: `pulse ${1 + idx * 0.15}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-300 mt-2 font-mono">bubble sort in progress...</p>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Why StepWise?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔢', title: 'Step by Step',       desc: 'Go forward, backward, or auto-play through every operation at your own pace.',          color: 'bg-violet-50 border-violet-100' },
              { icon: '💻', title: 'Live Code',          desc: 'Watch the exact line of code highlight as each step executes — in Java and C++.',       color: 'bg-emerald-50 border-emerald-100' },
              { icon: '📦', title: 'Multiple Structures', desc: 'Arrays, Stacks, and Linked Lists — all visualized with their unique data structure.',   color: 'bg-blue-50 border-blue-100' },
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

      {/* Categories */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">What you can explore</h2>
          <p className="text-gray-400 text-sm mb-8">More algorithms being added regularly</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Bubble Sort',    cat: 'Sorting'    },
            //   { label: 'Binary Search',  cat: 'Searching'  },
              { label: 'Stack Push',     cat: 'Stack'      },
              { label: 'LL Traversal',   cat: 'Linked List'},
            //   { label: 'Selection Sort', cat: 'Sorting'    },
            //   { label: 'Insertion Sort', cat: 'Sorting'    },
            ].map(({ label, cat }) => (
              <div
                key={label}
                onClick={() => navigate('/visualize')}
                className="px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:border-violet-300 hover:bg-violet-50 cursor-pointer transition-colors group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-violet-600">{label}</span>
                <span className="ml-2 text-xs text-zinc-400">{cat}</span>
              </div>
            ))}
          </div>
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