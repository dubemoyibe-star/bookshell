import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#43C6AC]/40 to-[#2B5876]/40 px-4">
      <motion.div 
       initial={{scale: 0.9, opacity: 0}}
       whileInView={{scale: 1, opacity:1}}
       viewport={{once: true}}
       transition={{ duration: 0.8}}
      className="relative backdrop-blur-2xl bg-white/95 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center overflow-hidden">
        {/* Accent circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F8FFAE]/20 rounded-full blur-3xl pointer-events-none"/>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#43C6AC]/20 rounded-full blur-3xl pointer-events-none"/>

        <h1 className="text-6xl font-extrabold text-[#2B5876] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        
        <div className="flex flex-col gap-4 md:flex-row items-center justify-center">
          <Link
            to="/orders"
            className="w-full inline-block px-6 py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
           Manage Orders
          </Link>

          <Link
            to="/list-books"
            className="w-full inline-block px-6 py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            View Books
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound
