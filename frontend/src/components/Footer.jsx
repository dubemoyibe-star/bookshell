import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logoicon.png'
import { quickLinks, socialLinks } from '../assets/dummydata'
import { Icon, ArrowRight, MapPin, Phone, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-gray-100 border-t border-[#43C6AC]/20 pt-16 pb-8 relative'>
      <div className='container mx-auto px-4 md:px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
            <div className='space-y-4"'>
              <Link 
              to='/'
              className='inline-flex items-center gap-2'>
                <img 
                src={logo} 
                alt="logo"
                className='h-9 w-9 rounded-full'/>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent'>
                  BOOKSHELL
                </h1>
              </Link>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Your gateway to literary adventures. Discover, explore and immerse yourself in the world of books.
              </p>
              <div className='flex gap-3'>
                  {socialLinks.map(({Icon , url}, index) =>  (
                    <a 
                    href={url}
                    key={index}
                    target='_blank'
                    className='flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#43C6AC]/30 hover:border-[#43C6AC] hover:bg-[#F8FFAE]/20 transition-all duration-300'>
                      <Icon className='h-4 w-4 text-[#43C6AC] transition-colors duration-300'/>
                    </a>
                  ))}
              </div>
          </div>

          <div className='space-y-4'>
             <h3 className='group inline-flex items-center text-gray-600 hover:text-[#43C6AC] transition-colors duration-300 text-sm'>
                Quick Links
             </h3> 
             <ul className='space-y-2.5'>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                    to={link.url}
                    className='group inline-flex items-center text-gray-600 hover:text-[#43C6AC] transition-colors duration-300 text-sm'>
                      <span className='w-1.5 h-1.5 bg-[#43C6AC] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                      {link.title}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          <div className='space-y-4'>
              <h1 className='text-lg font-semibold text-gray-900 mb-2'>
                Stay Updated
              </h1> 
              <p className='text-gray-600 text-sm leading-relaxed'>
                Subscribe to our newsletter for the latest release and exclusive offers. 
              </p>

              <form className='relative'>
                <input 
                type="email" 
                placeholder='Enter your email'
                className='w-full px-4 py-2.5 bg-white border border-[#43C6AC]/30 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#43C6AC]/50 transition-all pr-12'/>
                <button type="submit" className='absolute right-1 top-1 p-2.5 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-md text-white hover:scale-105 transform transition-all shadow-sm hover:shadow-[#43C6AC]/30'>
                  <ArrowRight className="h-4 w-4"/>
                </button>
              </form>
          </div>

          <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Contact Us</h3>
              <div className='space-y-3'>

                <div className='flex items-start text-gray-600 text-sm'>
                  <MapPin className='h-4 w-4 text-[#43C6AC] mr-2 mt-1 flex-shrink-0'/>
                  <span>123 Literary Lane, Bookville, BK 12345</span>
                </div>

              <div className='flex items-center text-gray-600 text-sm'>
                  <Phone className='h-4 w-4 text-[#43C6AC] mr-2 flex-shrink-0'/>
                  <span>+234 70 2613 7565</span>
              </div>

              <div className='flex items-center text-gray-600 text-sm'>
                  <Mail className='h-4 w-4 text-[#43C6AC] mr-2 flex-shrink-0'/>
                  <span>bookshell@gmail.com</span>
              </div>
              </div>
          </div>
        </div>

        <div className='border-t border-[#43C6AC]/20 pt-6 text-center'>
          <p className='text-gray-500 text-sm'>
                &copy; {new Date().getFullYear()} BookShell. All rights reserved
          </p>
          <a 
          href='https://wa.me/2347026137565'
          target='_blank'
          className='text-sm font-semibold cursor-pointer text-gray-500 hover:text-purple-600 '>
            Powered by Oyibe
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
