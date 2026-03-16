import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home'
import Compare from './pages/Compare'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Landing />} />
        <Route path="/visualize" element={<Home />} />
        <Route path="/compare"   element={<Compare />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App