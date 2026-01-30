import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo  from '../assets/logoicon.png'
import { navItems } from '../assets/dummydata'
import { Menu, User, X } from 'lucide-react'
import { FaOpencart } from 'react-icons/fa'
import { useCart } from '../CartContext/CartContext'



const Navbar = () => {

  const [ scrolled, setScrolled ] = useState(false);
  const [isOpen, setIsOpen ] = useState(false)
  const location = useLocation()

  const { cart } = useCart()

  const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 
      ${scrolled ? "shadow-md py-2" : "py-4"}`}>
      <div className='container mx-auto px-4 md:px-4 md:text-xs'>
        <div className='flex items-center justify-between'>
          {/* logo */}

          <Link to='/' className='flex items-center'>
            <div className='relative group'>
              <div className='absolute -inset-3 rounded-full opacity-0 blur-xl group-hover:opacity-30 transition-opacity bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE]'/>
              <div className='relative flex items-center'>
                <img src={logo} alt='logo' className='h-8 w-8 rounded-full z-10'/>
                <div className='ml-2'>
                  <h1 className='text-xl font-bold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent'>
                    BOOKSHELL
                  </h1>
                  <div className='h-0.5 w-0 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] group-hover:w-full transition-all duration-500'/>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className='hidden md:flex items-center space-x-1'>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return(
                  <Link 
                  key={item.name} 
                  to={item.path}
                  className='relative group px-5 py-3.5 rounded-lg transition-all duration-300 overflow-hidden'>
                  <div className='relative z-10 flex items-center'>
                    <div className='relative'>
                      <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-full opacity-0 blur group-hover:opacity-30 transition-opacity duration-500`}/>
                      <item.icon className={`relative h-5 w-5 ${isActive ? "text-white" : "text-gray-600 group-hover:text-white"} transition-colors duration-300 z-10`}/>
                    </div>

                    <span className={`ml-2 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-medium`
                          : "text-gray-600 group-hover:text-gray-900"
                      }`}>
                      {item.name}
                    </span>
                    {isActive && <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r ${item.color}`}/>}
                  </div>
                  </Link>
                )
              })
              }
          </div>
            
          {/* Right icons */}
          <div className='hidden md:flex items-center space-x-5'>
            <Link to='/cart' className='relative group'>
              <div className='absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500'/>
            <div className='relative'>
              <FaOpencart className='relative h-5 w-5 text-gray-600 group-hover:text-amber-600 transition-colors duration-300 z-10'/>
              {totalQuantity > 0 && (
                <span className='absolute top-[-14px] right-[-14px] flex items-center justify-center w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-600 text-[10px] font-bold text-white rounded-full'>
                  {totalQuantity}
                </span>
              )}
            </div>
            </Link>
            <Link to='/login' className='relative group'>
                <div className='absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500'/>
                <div className='relative'>
                  <User className='relative h-5 w-5 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300 z-10'/>
                </div>
            </Link>
          </div>

          {/*mobile menu */}
          <div className='md:hidden flex items-center'>
              <button 
              onClick={() => setIsOpen(!isOpen)}
              className='relative group p-1'
              >
                <div className='absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500'/>
                <div className='relative'>
                  {isOpen ? <X className='relative h-6 w-6 text-gray-600 z-10 cursor-pointer' /> : <Menu className='relative h-6 w-6 text-gray-600 z-10 cursor-pointer'/>}
                </div>
              </button>
          </div>
        </div>
      </div>

      {/*mobile menu navigation */}
      {isOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex flex-col space-y-1'>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path

                return (
                  <Link 
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      isActive ? `bg-gradient-to-r ${item.color}/10` : "hover:bg-gray-100"
                    } transition-colors`}
                    >
                    <item.icon className={`h-5 w-5 ${isActive ? `text-${item.color.split('-')[1]}-500` : "text-gray-600"}`}/>
                    <span className={`ml-3 ${isActive ? `text-${item.color.split('-')[1]}-600 font-medium` : "text-gray-600"}`}>
                      {item.name}
                    </span>
                  </Link>
                )
              })}

              <div className='flex justify-between items-center mt-4'>
                <Link 
                  to='/cart'
                  className='relative group p-2'
                  onClick={() => setIsOpen(false)}>
                    
                    <FaOpencart className='h-5 w-5 text-gray-600 group hover:text-amber-600'/>
                    {totalQuantity > 0 && (
                      <span className='absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-full'>
                          {totalQuantity}
                      </span>
                    )}
                </Link>

                <Link 
                  to='/login'
                  className='p-2 group' 
                  onClick={() => setIsOpen(false)}>
                    <User className='h-5 w-5 text-gray-600 group hover:text-amber-600'/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
