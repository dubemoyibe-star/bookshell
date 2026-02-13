import React, { useEffect, useState } from 'react'
import { useCart } from '../CartContext/CartContext'
import { ClipLoader } from 'react-spinners'
import { Star, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE;

const HomeBooks = () => {

    const { cart , addToCart, updateCartItem } = useCart()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const inCart = (id) => cart?.items?.some(item => item.id === id)
    const getQty = (id) => cart?.items?.find(item => item.id === id )?.quantity || 0

    useEffect(() => {
      const fetchBooks = async () => {
        setLoading(true)

        try {
          const res = await axios.get(`${API_BASE}/api/book`)
          const list = Array.isArray(res.data) ? res.data : res.data.books || []
          setBooks(list)
        } catch (error) {
          setError(error.message || 'Failed to load books')
        } finally {
          setLoading(false)
        }
      }
      fetchBooks()
    }, [])
  
  const handleAdd = (book) => { addToCart({ id: book._id, title: book.title, price: book.price, author:book.author,  quantity: 1})}
  const handleInc = (id) => updateCartItem({ id, quantity: getQty(id) + 1})
  const handleDec = (id) => updateCartItem({ id, quantity: getQty(id) - 1})

  return (
    <div className='py-20 bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] relative'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='bg-white rounded-2xl shadow-lg p-8 md:p-12'>
            <div className='text-center mb-12'>
              <motion.h2 
              initial={{y: 40, opacity: 0}}
              whileInView={{y: 0, opacity: 1}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-4'>Bookseller Favorites </motion.h2>
              <div className='h-1 w-20 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full mx-auto'/>
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

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {books.map((book, index) => {
                const itemInCart = inCart(book._id)
                
                return (
                  <motion.div 
                  key={book._id} 
                  initial={{scale: 0.9, opacity: 0}}
                  whileInView={{scale: 1, opacity:1}}
                  viewport={{once: true}}
                  transition={{ duration: 0.8 , delay: index * 0.1}}
                  className='group relative'>
                    <div className='relative h-72 overflow-hidden rounded-xl border-4 border-[#43C6AC]/20 mb-4'>
                      <img 
                      src={`${book.image.url}`} 
                      alt={book.title} 
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />
                      <div className='absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full flex items-center'>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(book.rating || 0) ? 'text-[#43C6AC] fill-[#43C6AC]' : 'text-gray-300'}`}/>
                        ))}
                      </div>
                    </div>

                    <h3 className='text-xl font-bold text-gray-900 mb-2'>{book.title}</h3>
                    <p className='text-gray-600 mb-3'>{book.author}</p>
                    <span className='text-lg font-bold text-[#43C6AC]'> ₦{book.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                  
                  {itemInCart ? (
                    <div className='flex items-center justify-between bg-[#43C6AC]/10 px-4 py-2 rounded-lg'>
                      <button 
                        onClick={() => handleDec(book._id)}  
                        className='cursor-pointer text-[#1A237E] hover:text-[#43C6AC] p-1 md:p-1.5'>
                            <Minus className='h-5 w-5' size={18}/>
                      </button>
                      <span className='text-gray-700'>{getQty(book._id)}</span>
                      <button 
                        onClick={() => handleInc(book._id)}  
                        className='cursor-pointer text-[#1A237E] hover:text-[#43C6AC] p-1 md:p-1.5'>
                            <Plus className='h-5 w-5' size={18}/>
                      </button>
                    </div>
                  ): (
                    <button
                    onClick={() => handleAdd(book)}
                    className='w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] text-black rounded-lg hover:shadow-lg transition-all'
                    >
                      <ShoppingCart className='h-5 w-5'/>
                      <span>Add to Cart</span>
                    </button>
                  )}
                  </motion.div>
                )
              })}
            </div>

            <div className='flex justify-center mt-12'>
                <Link to='/books' className='group inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#43C6AC] text-[#43C6AC] hover:bg-[#43C6AC]/10 transition-all'>
                <span>View all Books</span>
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1'/>
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBooks
