import React, { useEffect, useState } from 'react'
import { ShoppingBag, Plus, Minus, Star, Search } from "lucide-react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { useCart } from '../CartContext/CartContext'

const API_BASE = import.meta.env.VITE_API_BASE;

const Books = () => {
  const { cart , addToCart, updateCartItem } = useCart()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchFromUrl = queryParams.get('search') || ""

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState(searchFromUrl)
  const [sortBy, setSortBy] = useState('title')
  const [filterCategory, setFilterCategory] = useState('all')


  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)

      try {
        const res = await axios.get(`${API_BASE}/api/book`)
        const data = res.data
        const list = Array.isArray(data) ? data : data.books || []
        setBooks(list)
      } catch (error) {
        console.error('Error fetching books', error.message)
        setError(error.message || 'Failed to load books')
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const inCart = (id) => cart?.items?.some(item => item.id === id)
  const getCartQuantity = (id) => cart?.items?.find(item => item.id === id )?.quantity || 0

  const handleAddToCart = (book) => { addToCart({ id: book._id, title: book.title, price: book.price, quantity: 1})}
  const handleIncrement = (id) => updateCartItem({ id, quantity: getCartQuantity() + 1})
  const handleDecrement = (id) => updateCartItem({ id, quantity: getCartQuantity() - 1})

  const filteredBooks = books.filter((book) => {
    const matchCategory = filterCategory === 'all' || book.category === filterCategory
    const lowerSearch = searchTerm.toLowerCase()
    const matchSearch = !searchTerm || book.title.toLowerCase().includes(lowerSearch) || book.author.toLowerCase().includes(lowerSearch)
    return matchCategory && matchSearch
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price 
        case "price-high": return b.price - a.price
        case "rating": return (b.rating || 0) - (a.rating || 0)
        default: return a.title.localeCompare(b.title, undefined, { sensitivity: 'base', numeric: true })
      }
  })

  const categories = ["all", ...new Set(books.map((book) => book.category).filter(Boolean))] 

  return (
    <div className='min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#f8fafc] to-[#f0fdfa]'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='text-center mb-12 md:mb-16 space-y-2 md:space-y-4'>
          <h1 className='text-4xl md:text-5xl font-bold text-transparent pb-2 md:pb-4 bg-clip-text bg-gradient-to-r from-[#1A237E] to-[#43C6AC]'>
            Literary Universe
          </h1>
          <p className='text-gray-600 text-base md:text-xl max-w-3xl mx-auto px-2'>
            Explore our curated collection spanning genres and perspectives
          </p>
        </div>

        <div className='mb-8 md:mb-12 space-y-4 md:space-y-6'>
          <div className='relative group'>
            <div className='absolute top-0 bottom-0 left-0 flex items-center pl-4 md:pl-5'>
              <Search className='h-5 w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-[#43C6AC]' />
            </div>

            <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search Titles, authors...' 
            className='w-full pl-12 md:pl-16 pr-4 md:pr-6 py-3 md:py-4 bg-white/90 backdrop-blur-sm border-0 rounded-xl md:rounded-2xl shadow-md md:shadow-lg focus:ring-2 focus:ring-[#43C6AC]/30 text-base md:text-lg placeholder-gray-400 text-gray-700 transition-all'/>
          </div>

          <div className='flex flex-col md:flex-row gap-3 md:gap-4 justify-between'>
            <div className='flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto'>
              <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className='cursor-pointer w-full md:w-auto px-4 md:px-5 py-2 md:py-3 bg-white/90 backdrop-blur-sm border-0 rounded-lg md:rounded-xl shadow-md md:shadow-lg text-gray-700 focus:ring-2 focus:ring-[#43C6AC]/30 text-sm md:text-base'>
                {categories.map((category) =>  (
                  <option  key={category} value={category}>
                    {category === 'all' ? 'All Genres' : category}
                  </option>
                ))}
              </select>

              <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='cursor-pointer w-full md:w-auto px-4 md:px-5 py-2 md:py-3 bg-white/90 backdrop-blur-sm border-0 rounded-lg md:rounded-xl shadow-md md:shadow-lg text-gray-700 focus:ring-2 focus:ring-[#43C6AC]/30 text-sm md:text-base'>
              <option value='title'>Sort by Title</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
              <option value='rating'>Top Rated</option>
              </select>
            </div>

            <div className='text-gray-600 text-sm md:text-base text-center md:text-left mt-2 md:mt-0'>
              Showing {sortedBooks.length} result{sortedBooks.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {loading && (
            <div className="flex flex-col items-center gap-2 my-8">
              <ClipLoader size={40} color="#ef4444" loading={loading} />
              <p className="text-gray-600">Loading books...</p>
            </div>
          )}
          {error && 
          <div className="my-8">
            <p className="text-gray-600 text-center">{error}</p>
          </div>}

        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {sortedBooks.map((book) => {
              const isInCart = inCart(book._id)
              const qty = getCartQuantity(book._id)

              return (
                <div key={book._id} className='group bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                  <div className='relative aspect-square mb-4 md:mb-6 overflow-hidden rounded-lg md:rounded-xl'>
                    <img 
                    src={book.image.startsWith('http') ? book.image : `${API_BASE}${book.image}`} 
                    alt={book.title} 
                    className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300'/>
                  </div>

                  <h3 className='text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2'>{book.title}</h3>
                  <p className='text-sm text-gray-500 mb-2 md:mb-3'>by {book.author}</p>

                  <div className='flex items-center gap-1 text-yellow-400 text-sm mb-2 md:mb-3'>
                    {[...Array(Number.isFinite(book.rating) ? Math.floor(book.rating) : 0)].map((_, index) => (
                      <Star className='w-4 h-4 fill-yellow-400 stroke-yellow-400' key={index}/>
                    ))}
                    <span>{Number.isFinite(book.rating) ? book.rating.toFixed(1) : 'N/A'}</span>
                  </div>

                  <p className='text-sm text-gray-600 mb-4'>{book.description}</p>
                  <div className='flex items-center justify-between mt-auto'>
                    <span className='text-base md:text-lg font-bold text-[#1A237E]'>₦{book.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>

                    <div className='flex cursor-pointer items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-[#1A237E] to-[#43C6AC] text-white rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:shadow-md hover:scale-[1.02] transition-all'>
                      {!isInCart ? (
                        <button className='cursor-pointer' onClick={() => handleAddToCart(book)}>
                          <ShoppingBag className='h-5 w-5 text-white'/>
                        </button>
                      ): (
                        <div className='flex items-center gap-1'>
                          <button className='cursor-pointer' onClick={() => handleDecrement(book._id)}>
                          <Minus className='w-4 h-4 text-white'/>
                          </button>
                          <span>{qty}</span>
                          <button className='cursor-pointer' onClick={() => handleIncrement(book._id)}>
                          <Plus className='w-4 h-4 text-white'/>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Books
