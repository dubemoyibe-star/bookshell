import React from 'react'
import { Link } from 'react-router-dom'
import logo  from '../assets/logoicon.png'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#43C6AC]/40 to-[#2B5876]/40 px-4">
      <motion.div 
      initial={{scale: 0.9, opacity: 0}}
      whileInView={{scale: 1, opacity:1}}
      viewport={{once: true}}
      transition={{ duration: 0.8 }}
      className="relative backdrop-blur-2xl bg-white/95 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F8FFAE]/20 rounded-full blur-3xl pointer-events-none"/>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#43C6AC]/20 rounded-full blur-3xl pointer-events-none"/>

        <img src={logo} alt="Bookshell Logo" className="w-24 mx-auto mb-4" />

        <h1 className="text-6xl font-extrabold text-[#2B5876] mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-700 mb-4">
          Welcome to <span className="font-bold text-[#2B5876]">Bookshell</span>
        </p>
        <p className="text-gray-600 mb-6">
          Discover transformative books and knowledge journeys that inspire growth.
        </p>

        <div className="flex flex-col gap-4 md:flex-row items-center justify-center">
          <Link
            to="/"
            className="w-full inline-block px-6 py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Go Back Home
          </Link>

          <Link
            to="/books"
            className="w-full inline-block px-6 py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            See Our Books
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound
