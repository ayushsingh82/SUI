import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text hover:from-blue-500 hover:to-purple-600 transition-all">
              SuiAI Code
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/generator" 
              className={`relative group ${
                location.pathname === '/generator' ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              <span className="font-medium hover:text-blue-400 transition-colors">
                AI Code Generator
              </span>
              {location.pathname === '/generator' && (
                <motion.div 
                  layoutId="underline"
                  className="absolute left-0 right-0 h-0.5 bg-blue-400 bottom-[-4px]"
                />
              )}
            </Link>
            <Link 
              to="/audit" 
              className={`relative group ${
                location.pathname === '/audit' ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              <span className="font-medium hover:text-blue-400 transition-colors">
                Code Audit
              </span>
              {location.pathname === '/audit' && (
                <motion.div 
                  layoutId="underline"
                  className="absolute left-0 right-0 h-0.5 bg-blue-400 bottom-[-4px]"
                />
              )}
            </Link>
            <a 
              href="https://sui.io/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group"
            >
              <span className="font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Sui Docs
              </span>
              <span className="absolute left-0 right-0 h-0.5 bg-blue-400 bottom-[-4px] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a 
              href="https://github.com/ayushsingh82/SUI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar 