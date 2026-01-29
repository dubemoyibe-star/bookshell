import React from 'react'
import { useCart } from '../CartContext/CartContext'
import { hbbooks } from '../assets/dummydata'
import { Star, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomeBooks = () => {

  const { cart, dispatch } = useCart()
  
    const inCart = (id) => cart?.items?.find(item => item.id === id)
  
    const handleAdd = (book) => dispatch({type: 'ADD_ITEM', payload: {...book, quantity: 1 }})
    const handleInc = (id) => dispatch({type: 'INCREMENT', payload: { id }})
    const handleDec = (id) => dispatch({type: 'DECREMENT', payload: { id }})

  return (
    <div className='py-20 bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] relative'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='bg-white rounded-2xl shadow-lg p-8 md:p-12'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-4'>Bookseller Favorites </h2>
              <div className='h-1 w-20 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full mx-auto'/>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {hbbooks.map((book) => {
                const item = inCart(book.id)
                
                return (
                  <div key={book.id} className='group relative'>
                    <div className='relative h-72 overflow-hidden rounded-xl border-4 border-[#43C6AC]/20 mb-4'>
                      <img 
                      src={book.image} 
                      alt={book.title} 
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />
                      <div className='absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full flex items-center'>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < book.rating ? 'text-[#43C6AC] fill-[#43C6AC]' : 'text-gray-300'}`}/>
                        ))}
                      </div>
                    </div>

                    <h3 className='text-xl font-bold text-gray-900 mb-2'>{book.title}</h3>
                    <p className='text-gray-600 mb-3'>{book.author} best author this week</p>
                    <span className='text-lg font-bold text-[#43C6AC]'> ₦{book.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                  
                  {item ? (
                    <div className='flex items-center justify-between bg-[#43C6AC]/10 px-4 py-2 rounded-lg'>
                      <button 
                        onClick={() => handleDec(book.id)}  
                        className='cursor-pointer text-[#1A237E] hover:text-[#43C6AC] p-1 md:p-1.5'>
                            <Minus className='h-5 w-5' size={18}/>
                      </button>
                      <span className='text-gray-700'>{item.quantity}</span>
                      <button 
                        onClick={() => handleInc(book.id)}  
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
                  </div>
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
