import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 bg-gray-900 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-400">SuiAI Code</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/generator" className="hover:text-blue-400 font-medium">AI Code Generator</Link>
            <a href="https://sui.io/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 font-medium">Sui Docs</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 