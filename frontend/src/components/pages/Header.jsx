import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
function Header() {
    const navigate = useNavigate();
  return (
    <div className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
        {/* Header / Nav */}
      <header className="w-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md sticky top-0 z-40 border-b dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {/* Simple chat bubble logo */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h7m-9 8v-2a4 4 0 00-4-4H5a2 2 0 012-2h10a2 2 0 012 2v2a4 4 0 01-4 4H8z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Chatly</span>
          </div>

          {/* Nav - add links or auth buttons as needed */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#how" className="hover:underline">
              How it works
            </a>
            <a href="#pricing" className="hover:underline">
              Pricing
            </a>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Login
            </button>
            <button
             
              className="ml-2 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow-sm"
              onClick={() => navigate("/register")}
            >
            
              Get Started
            </button>
          </nav>

          {/* Mobile menu button (simple) */}
          <div className="md:hidden">
            <button
              onClick={() => alert("Add a mobile menu or routing here")}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header