import {  ChevronLeft, ChevronRight, Plus, ShoppingCart, Star, Minus } from 'lucide-react'
import  { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import { bgColors } from '../assets/dummydata'
import { useCart } from '../CartContext/CartContext'

const API_BASE = import.meta.env.VITE_API_BASE;

const OurBestSellers = () => {

  const scrollRef = useRef(null)
  const { cart , addToCart, updateCartItem } = useCart()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const inCart = (id) => cart?.items?.some(item => item.id === id)
  const getQty = (id) => cart?.items?.find(item => item.id === id )?.quantity || 0

  //fetch book 
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_BASE}/api/book`)
        setBooks(Array.isArray(res.data) ? res.data : res.data.books || [])
      } catch (error) {
        console.error('Error fetching bestseller books', error)
        setError(error.message|| 'Failed to load books')
      } finally {
        setLoading(false)
      }
    }
    fetchBooks();
  }, [])

  const handleAdd = (book) => { addToCart({ id: book._id, title: book.title, price: book.price, author: book.author,  quantity: 1})}
  const handleInc = (id) => updateCartItem({ id, quantity: getQty(id) + 1})
  const handleDec = (id) => updateCartItem({ id, quantity: getQty(id) - 1})

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


          {loading && (
            <div className="flex flex-col items-center gap-2 my-8">
              <ClipLoader size={40} color="#ef4444" loading={loading} />
              <p className="text-gray-600">Loading best sellers...</p>
            </div>
          )}
          {error && 
          <div className="my-8">
            <p className="text-gray-600 text-center">{error}</p>
          </div>}

          {/*books section */}
          <div className='relative'>
              <div ref={scrollRef} className='flex overflow-x-auto gap-4 md:gap-8 pb-6 md:pb-8 scrollbar-hide scroll-smooth snap-x'>
            {books.map((book, index) => (
              <div 
              key={book._id}
              className={`flex-shrink-0 w-[calc(100vw-2rem)] sm:w-96 md:w-[400px] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${bgColors[index % bgColors.length]} shadow-lg md:shadow-xl relative group transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl snap-center`}>
                <div className='p-6 md:p-8 pb-48 md:pb-60 flex flex-col justify-between h-full relative z-10'>
                  <div className='space-y-3 md:space-y-4'>
                      <div className='flex items-center gap-1 md:gap-1.5'>
                        {[...Array(Math.floor(book.rating || 0))].map((_, i) => (
                          <Star key={i} className='h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-amber-400' />
                        ))}
                      </div>

                      <div className='space-y-1.5 md:space-y-2'>
                          <h1 className='text-xl md:text-2xl font-bold text-gray-900 leading-tight'>{book.title}</h1>
                          <p className='text-xs md:text-sm font-medium text-gray-600'>{book.author}</p>
                      </div>

                      <p className='text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3'>
                        {book.description}
                      </p>
                  </div>

                  {/*add controls*/}
                  <div className='flex flex-col gap-3 md:gap-4 mt-6 md:mt-8'>
                      <div className='flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3'>
                        <span className='text-xl md:text-2xl font-bold text-gray-900'>
                            ₦{book.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </span>
                            {inCart(book._id) ? (
                              <div className='flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-sm'>
                                <button 
                                onClick={() => handleDec(book._id)}  
                                className='cursor-pointer text-[#1A237E] hover:text-[#43C6AC] p-1 md:p-1.5'>
                                    <Minus size={18}/>
                                </button>
                                <span className='text-gray-900 font-medium w-6 text-center'>{getQty(book._id)}</span>
                                <button 
                                onClick={() => handleInc(book._id)}  
                                className='cursor-pointer text-[#1A237E] hover:text-[#43C6AC] p-1 md:p-1.5'>
                                    <Plus size={18}/>
                                </button>
                              </div>
                            ): (
                              <button 
                              onClick={() => handleAdd(book)}
                              className='cursor-pointer flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#1A237E] to-[#43C6AC] text-white rounded-lg md:rounded-xl font-medium hover:scale-[1.02] transition-transform text-sm md:text-base'>
                                 <ShoppingCart className='w-4 h-4 md:w-5 md:h-5'/> 
                                 <span>Add to Collection</span>
                              </button>
                            )}
                      </div>
                  </div>
                </div>

                <img 
                src={`${book.image.url}`} 
                alt={book.title}
                className='absolute right-4 md:right-6 bottom-4 md:bottom-6 w-20 h-28 md:w-[120px] md:h-[180px] object-cover rounded-lg md:rounded-xl border-2 md:border-4 border-white shadow-xl md:shadow-2xl transform group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-transform'
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 md:w-24 bg-gradient-to-l from-white/80 to-transparent"></div>
          </div>
        </div>
    </section>
  )
}

export default OurBestSellers
