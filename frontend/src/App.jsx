import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home'
import Compare from './pages/Compare'
import Analyze from './pages/Analyze'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Landing />} />
        <Route path="/visualize" element={<Home />} />
        <Route path="/compare"   element={<Compare />} />
        <Route path='/analyze' element={<Analyze />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App