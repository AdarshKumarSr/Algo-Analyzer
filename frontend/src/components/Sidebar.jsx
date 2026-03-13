import { useEffect, useState } from 'react'
import { getAllAlgorithms } from '../api/index'

function Sidebar({ onSelect, selectedSlug }) {
    const [algorithms, setAlgorithms] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getAllAlgorithms()
            .then(res => setAlgorithms(res.data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const categories = ['array', 'stack', 'linked_list']

    return (
        <aside className="w-64 bg-white h-screen p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Algorithms</h2>
            {loading ? <p className="text-gray-900">Loading...</p> : (
                categories.map(cat => (
                    <div key={cat} className="mb-4">
                        <h3 className="text-xs uppercase text-gray-400 mb-2">{cat.replace('_', ' ')}</h3>
                        {algorithms
                            .filter(a => a.category === cat)
                            .map(a => (
                                <button
                                    key={a.slug}
                                    onClick={() => onSelect(a)}
                                    className={`w-full text-left px-3 py-2 rounded text-sm mb-1 
                                    ${selectedSlug === a.slug ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}`}
                                >
                                    {a.name}
                                </button>
                            ))
                        }
                    </div>
                ))
            )}
        </aside>
    )
}

export default Sidebar;