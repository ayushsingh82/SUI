import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-16">
        <Hero />
      </main>
    </div>
  )
}

export default App 