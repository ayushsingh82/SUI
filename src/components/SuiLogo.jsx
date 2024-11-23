import React from 'react'

const SuiLogo = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 96 96" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle */}
      <circle cx="48" cy="48" r="48" fill="#6FBCF0"/>
      
      {/* Inner Rings */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48 84C67.8823 84 84 67.8823 84 48C84 28.1177 67.8823 12 48 12C28.1177 12 12 28.1177 12 48C12 67.8823 28.1177 84 48 84ZM48 72C61.2548 72 72 61.2548 72 48C72 34.7452 61.2548 24 48 24C34.7452 24 24 34.7452 24 48C24 61.2548 34.7452 72 48 72Z"
        fill="white"
      />
      
      {/* Center Circle */}
      <circle cx="48" cy="48" r="12" fill="white"/>
      
      {/* Optional: Add a subtle gradient overlay */}
      <defs>
        <linearGradient id="paint0_linear" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D96E8"/>
          <stop offset="1" stopColor="#6FBCF0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SuiLogo 