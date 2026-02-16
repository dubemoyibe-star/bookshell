import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock,BookOpen, BookPlus, ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react'
import logo from '../assets/logoicon.png'
import { motion } from 'framer-motion'

const Sidebar = () => {

  const [isCollapsed, setIsCollapsed ] = useState(false)
  const [isMobile, setIsMobile ] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  } , [])

  const navItems = [
    { path: '/', icon: BookPlus, label: 'Add Books' },
    { path: '/list-books', icon: BookOpen, label: 'List Books' },
    { path: '/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/activity', icon: Clock, label: 'Activity' },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  //MOBILE
  if(isMobile) {
    return (
      <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] z-50 shadow-lg'>
        <div className='flex justify-around items-center py-3'>
          {navItems.map(({path, icon: Icon, label}) => {
            const isActive = location.pathname === path

            return (
              <Link key={path} to={path} className='flex flex-col items-center w-full'>
                <div className={`p-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-white text-[#2B5876]' : 'text-gray-300'}`}>
                  <Icon className='h-5 w-5 mx-auto'/>
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-white font-medium' : 'text-gray-300'}`}>
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }


  return (
    <motion.div 
     initial={{x: -40, opacity: 0}}
     whileInView={{x: 0, opacity: 1}}
     viewport={{once: true}}
     transition={{duration: 0.5}}
    className={` bg-gradient-to-t from-[#2B5876] to-[#43C6AC] text-white min-h-screen p-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className='flex justify-between items-center mb-8'>
        {!isCollapsed && (
          <div className='flex items-center gap-3'>
            <div className='bg-white p-2 rounded-lg'>
              <img src={logo} alt="logo" className='w-8 h-8'/>
            </div>

            <div>
              <h1 className='text-xl font-bold text-white'>
                BOOKSHELL
              </h1>
            </div>
          </div>
        )}

        <button onClick={toggleCollapse} className='cursor-pointer p-2 rounded-full hover:bg-[#2B5876]/90 transition-colors'>
          {isCollapsed ? (
            <ChevronRight className='h-5 w-5'/>
          ): (
            <ChevronLeft className='h-5 w-5'/>
          )}
        </button>
      </div>

      <nav className='space-y-1'>
        {navItems.map(({ path, icon: Icon, label}) => {
          const isActive = location.pathname === path

          return (
            <Link 
            key={path} 
            to={path} 
            className={
              `group flex items-center px-4  ${isCollapsed ? 'py-2' : 'py-3'} rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-[#2B5876]/90 shadow-md' 
                  : 'hover:bg-[#2B5876]/90/50'
              } ${isCollapsed ? 'justify-center' : ''}`}>
              <div className='flex items-center gap-3'>
                <div className={`p-2 rounded-lg ${
                      isActive 
                        ? 'bg-white text-[#2B5876]' 
                        : 'bg-[#2B5876] text-gray-300 group-hover:bg-white group-hover:text-[#2B5876]'
                    }`}>
                  <Icon className='h-5 w-5'/>
                </div>
                {!isCollapsed && (
                  <span className={`${isActive ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white'}`}>
                    {label}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className='h-px bg-[#2B5876]/90 my-6'/>
      <div className={`mt-auto pt-4 ${isCollapsed ? 'text-center' : ''}`}>
        {!isCollapsed && (
          <p className='text-xs text-indigo-300'>
            &copy; {new Date().getFullYear()} BookShell
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default Sidebar
