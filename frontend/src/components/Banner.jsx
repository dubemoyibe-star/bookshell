import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { words } from '../assets/dummydata'

import img  from '../assets/banner1.png'
const Banner = () => {

  const [searchQuery, setSearchQuery] = useState("")
  const [currentword, setCurrentWord] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()){
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 pt-20 md:pt-28 pb-12 relative bg-gradient-to-br from-[#43C6AC]/90 to-[#2B5876]/90'>
      <div className='backdrop-blur-2xl bg-white/95 rounded-xl md:rounded-[2rem] shadow-lg md:shadow-2xl max-w-7xl w-full mx-4 p-6 md:p-8 lg:p-12 relative overflow-hidden'>
          <div className='absolute inset-0 opacity-10 pointer-events-none'>
            <div className='absolute -top-10 -right-10 md:-top-20 md:-right-20 w-48 h-48
            md:w-96 md:h-96 bg-[#F8FFAE]/10 rounded-full blur-xl md:blur-3xl'/>
            <div className='absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 h-40
            md:w-80 md:h-80 bg-[#43C6AC]/10 rounded-full blur-xl md:blur-3xl'/>
          </div>

          <div className='grid lg:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/*text section */}
            <div className='space-y-6 md:space-y-8'>
              <div className='space-y-4 md:space-y-6'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#2B5876] to-[#43C6AC]'>
                   Mindful
                  </span>
                  <br />
                  <span className='font-light text-3xl sm:text-4xl md:text-5xl text-gray-800'>
                    Reading Experience
                  </span>
                  </h1>
                  <p className='text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl'>
                    Curated knowledge journeys that challenge perceptions and inspire growth.
                    Discover transformative content crafted for the modern intellect.
                  </p>
              </div>

              {/*search  */}
              <form onSubmit={handleSearch} className='space-y-6 md:space-y-8'>
                <div className='flex gap-0 flex-col sm:flex-row'>
                  <div className='flex-1 relative group'>
                      <div className='absolute inset-0 bg-white/90  rounded-lg  md:rounded-xl shadow-sm'/>
                      <div className='relative flex items-center'>
                        <Search className='ml-4 mr-4 md:ml-5 w-5 h-5 md:w-6 md:h-6 text-gray-600 group-focus-within:text-[#2B5876]'/>

                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder='Search Author, titles, or concept...'
                          className='w-full md:ml-2 pr-4 md:pr-6 py-3 md:py-4 bg-transparent  focus:outline-none focus:border-blue-500
                          focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 border-0 focus:ring-0 text-gray-800 placeholder-gray-400 text-base md:text-lg font-medium'
                          >
                        </input>
                      </div>
                  </div>

                  <button
                  type='submit'
                  className='cursor-pointer px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-lg md:rounded-xl font-medium hover:shadow-lg hover:-translate-x-0.5 transition-all duration-300 shadow-md flex items-center gap-2 justify-center  text-sm md:text-base'>
                    <Search className='w-4 h-4 md:w-5 md:h-5 '/>
                    <span className='sr-only'>Search</span>
                  </button>
                </div>
              </form>

              {/*stats */}
              <div className='flex flex-wrap gap-4 md:gap-6 pt-4 md:pt-6'>
                {[
                  {number: '56k+', label: 'Titles'},
                  {number: '1.2M', label: 'Readers'},
                  {number: '240k+', label: 'Titles'}
                ].map((stat, i) => (
                  <div className='pr-4 md:pr-6 border-r last:border-0 border-gray-200' key={i}>
                    <div className='text-xl md:text-2xl font-bold text-[#2B5876]'>
                      {stat.number}
                    </div>
                    <div className='text-gray-600 text-xs md:text-sm'>
                        {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*images */}
            <div className='relative group flex justify-center mt-8 lg:mt-0'>
              <div className='relative w-full max-w-md lg:max-w-lg aspect-square bg-gradient-to-br from-white/20 to-[#F8FFAE]/10 rounded-xl md:rounded-2xl overflow-hidden'>
                <img 
                src={img} 
                alt='image banner' 
                className='w-full h-full object-contain object-center transform group-hover:scale-[1.02] transition-transform duration-500'
                />
                <div className='absolute inset-0 mix-blend-overlay bg-gradient-to-t from-[#2B5876]/10 to-transparent'/>
              </div>
            </div>
          </div>

          {/*footer texts */}
          <div className='mt-8 md:mt-12 border-t border-gray-100 pt-4 md:pt-6'>
              <div className='text-center text-xs md:text-sm text-gray-400 font-medium tracking-wide'>
                Curated Collections • Award-Winning Authors • Critical Analysis • Cultural Perspective
              </div>
          </div>
      </div>
    </div>
  )
}

export default Banner
