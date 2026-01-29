import {  ChevronLeft, ChevronRight, Star } from 'lucide-react'
import  { useRef } from 'react'
import { bgColors, obsbooks } from '../assets/dummydata'

const OurBestSellers = () => {

  const scrollRef = useRef(null)
  const scrollLeft = () => scrollRef.current.scrollBy({left: -400, behaviour: 'smooth'})
  const scrollRight = () => scrollRef.current.scrollBy({left: 400, behaviour: 'smooth'})

  return (
    <section className='py-12 md:py-16 bg-gray-50'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4 md:gap-6'>
            <div className='space-y-1 md:space-y-2'>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
                <span className='bg-gradient-to-r from-[#1A237E] to-[#43C6AC] bg-clip-text text-transparent'>
                  Curated Excellence
                </span>
              </h1>
              <p className='text-gray-600 text-base md:text-lg'>Top Rated By Our Readers</p>
            </div>

            {/*Right buttons for moving left and right*/}
            <div className='flex items-center gap-4 w-full md:w-auto'>
              <div className='hidden md:block flex-1 border-t border-gray-200'>
                <div className='flex items-center gap-2 md:gap-3'>
                  <button 
                  onClick={scrollLeft}
                  className='cursor-pointer p-2 md:p-3 rounded-full bg-white shadow-md md:shadow-lg hover:shadow-lg transition-shadow'>
                    <ChevronLeft className='text-[#1A237E]' size={20}/>
                  </button>

                  <button 
                  onClick={scrollRight}
                  className='cursor-pointer p-2 md:p-3 rounded-full bg-white shadow-md md:shadow-lg hover:shadow-lg transition-shadow'>
                    <ChevronRight className='text-[#1A237E]' size={20}/>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*books section */}
          <div ref={scrollRef} className=' flex overflow-x-auto gap-4 md:gap-8 pb-6 md:pb-8 scrollbar-hide scroll-smooth snap-x'>
            {obsbooks.map((book, index) => (
              <div 
              key={book.id}
              className={`flex-shrink-0 w-[calc(100vw-2rem)] sm:w-96 md:w-[400px] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${bgColors[index % bgColors.length]} shadow-lg md:shadow-xl relative group transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl snap-center`}>
                <div className='p-6 md:p-8 pb-48 md:pb-60 flex flex-col justify-between h-full relative z-10'>
                  <div className='space-y-3 md:space-y-4'>
                      <div className='flex items-center gap-1 md:gap-1.5'>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className='h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-amber-400' />
                        ))}
                      </div>

                      <div className='space-y-1.5 md:space-y-2'>
                          <h1 className='text-xl md:text-2xl font-bold text-gray-900 leading-tight'>{book.title}</h1>
                          <p className='text-xs md:text-sm font-medium text-gray-600'>{book.author}</p>
                      </div>

                      <p className='text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ullam debitis, saepe autem a nesciunt necessitatibus ut provident, cupiditate deleniti modi. Pariatur voluptas enim eos, non molestiae minus aperiam provident.
                      </p>
                  </div>

                  {/*add to cart */}
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default OurBestSellers
