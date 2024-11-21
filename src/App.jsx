import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Generator from './pages/Generator'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/generator" element={<Generator />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 