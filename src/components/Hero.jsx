import React from 'react'

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Welcome to <span className="text-blue-600">Our Website</span>
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            This is a hero section of your landing page. We're adding more visible styles
            to ensure everything is working properly.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero 