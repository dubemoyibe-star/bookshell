import React from 'react'
import HomeAboutImage from '../assets/HomeAboutImage.png'
import { featuredBooks, hastats } from '../assets/dummydata'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
const HomeAbout = () => {
  return (
    <div className='py-20 bg-white relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#43C6AC]/20 blur-[100px]'></div>
          <div className='absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#F8FFAE]/20 blur-[100px]'></div>
      </div>

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20'>
          <div className='relative group'>
              <div className='absolute -inset-4 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500'></div>
              <div className='relative overflow-hidden rounded-xl border-4 border-[#43C6AC]/20'>
                  <img 
                  src={HomeAboutImage} 
                  alt='about image'
                  className='w-full h-auto rounded-xl transition-transform duration-700 hover:rotate-1'></img>
                </div>
              </div>

            <div className='space-y-8'>
              <div>
                <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-4'>Our Literary Journey</h2>
                <div className='h-1 w-20 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full'></div>
              </div>

              <p className='text-gray-600 leading-relaxed'>
                Founded with a passion for literature, BookShell has evolved into a sanctuary for book lovers. We curate exceptional reading experience, connecting readers with stories that inspire, educate and transport them to the new world.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {hastats.map((stat, index) => (
                    <div key={index} className='bg-white border-2 border-[#43C6AC]/20 rounded-xl p-4 text-center shadow-lg'>
                      <div className='inline-flex items-center justify-center p-3 bg-[#F8FFAE] rounded-full mb-3'>
                          <stat.icon className='h-6 w-6 text-[#43C6AC]'/>
                      </div>
                      <div className='text-2xl font-bold text-gray-900'>{stat.value}</div>
                      <p className='text-sm text-gray-600'>{stat.label}</p>
                    </div>
                  ))}
              </div>

              <Link to='/about' className='group inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] text-black font-medium shadow-sm hover:shadow-[#43C6AC]/25 transition-all duration-300'>
              <span>Learn More About Us</span>
              <ArrowRight  className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1'/>
              </Link>
            </div>
          </div>

          <div className='mb-12 text-center'>
              <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-4'>Legendary Volumes</h2>
              <div className='h-1 w-20 mx-auto bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full'></div>
              <p className='mt-4 text-gray-600 text-center max-w-2xl mx-auto'>
                Handpicked recommendation from our literary experts that you won't want to miss.
              </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {featuredBooks.map((book, index) => (
                <div key={index} className='group relative'>
                  <div className='absolute -inset-0.5 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500'></div>
                  <div className='relative bg-white border-2 border-[#43C6AC]/20 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#43C6AC]/20 h-full flex flex-col'>
                    <div className='relative h-48 overflow-hidden'>
                      <img 
                      src={book.image} 
                      alt={book.title} 
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'/>
                    </div>

                    <div className='p-5 flex-grow flex flex-col'>
                      <h3 className='text-xl font-semibold text-gray-900 mb-1'>{book.title}</h3>
                      <p className='text-sm text-[#43C6AC] mb-3'>{book.author}</p>
                      <p className='text-gray-600 text-sm mb-4 flex-grow'>{book.description}</p>

                      <Link 
                      to='/books'
                      className='inline-flex items-center text-[#43C6AC] hover:text-[#368f7a] transition-colors'>
                        <span>
                          Discover 
                        </span>
                        <ArrowRight className='ml-1 h-4 w-4'/>
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default HomeAbout
