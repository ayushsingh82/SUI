import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Logo</div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">About</a>
            <a href="#" className="hover:text-blue-600">Services</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 