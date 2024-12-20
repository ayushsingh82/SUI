import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Generator from './pages/Generator'
import Audit from './pages/Audit'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <main className="pt-16 flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/audit" element={<Audit />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 