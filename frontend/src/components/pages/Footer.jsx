import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (

          <div className=" bg-gray-800 text-gray-400 w-full mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Chatly — Built with ❤️ for real-time apps.
            </div>
            <div className="space-x-4">
              <Link to="/terms" className="hover:underline">
                Terms
              </Link>
              <Link to="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        
  )
}

export default Footer