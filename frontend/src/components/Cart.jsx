import { useEffect } from 'react'
import { Book, BookOpen, ShoppingBag , Trash, Minus, Plus, ArrowRight} from 'lucide-react'
import { useCart } from '../CartContext/CartContext';
import { Link } from 'react-router-dom'

const Cart = () => {

  const { cart, dispatch } = useCart();
  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const getImageSource = (item) => {
    if(typeof item.image === 'string') return item.image
    return item.image?.default
  }

  //increasing decreasing and remove 
  const inc = (item) => dispatch({type: "INCREMENT", payload: {id: item.id, source: item.source}})
  const dec = (item) => dispatch({type: "DECREMENT", payload: {id: item.id, source: item.source}})
  const remove = (item) => dispatch({type: "REMOVE_ITEM", payload: {id: item.id, source: item.source}})

  return (
    <div className='min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-8 md:mb-12 text-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3 flex items-center justify-center gap-2 md:gap-3'>
            <ShoppingBag className='h-7 w-7 md:h-9 md:w-9 text-emerald-600'/>
            Shopping Cart
          </h1>
          <p className='text-gray-600 text-sm md:text-base lg:text-lg'>
            {cart.items.length} item{cart.items.length !== 1 && 's'} in your cart
          </p>
        </div>

        {cart.items.length === 0 ? (
          <div className='max-w-md mx-auto bg-white rounded-xl md:rounded-2xl p-6 md:p-8 text-center shadow-sm border border-gray-100'>
            <div className='flex justify-center mb-4 md:mb-6'>
              <ShoppingBag className='h-12 w-12 md:h-16 md:w-16 text-emerald-600'/>
            </div>
            <h2 className='text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4'>
              Your cart feels lonely
            </h2>
            <p className=''>
                Discover our collection of premium books and start your reading journey.
            </p>
            <Link to='/' className='mt-4 inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors gap-2 text-sm md:text-base'>
              <BookOpen className='h-  4 w-4 md:h-5 md:w-5'/>
              Browse Collection
            </Link>
          </div>
        ): (
          <div className='grid lg:grid-cols-3 gap-6 md:gap-8'>
            <div className='lg:col-span-2 space-y-4 md:space-y-6'>
              {cart.items.map((item) => (
                <div key={`${item.source}.${item.id}`} className='bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='flex gap-4 md:gap-6'>
                    <img 
                    src={getImageSource(item)} 
                    alt={item.title} 
                    className='w-16 h-20 md:w-24 md:h-32 object-cover rounded-md md:rounded-lg border border-gray-200'/>
                    <div className='flex-1'>
                      <div className='flex justify-between items-start'>
                        <div>
                        <h3 className='text-base md:text-lg font-semibold text-gray-900 mb-1'>
                          {item.title}
                        </h3>
                        <p className='text-gray-600 text-xs md:text-sm mb-2 md:mb-3'>
                          {item.author}
                        </p>
                      </div>
                      <button
                      onClick={() => remove(item)}
                      className='cursor-pointer text-gray-400 hover:text-red-600 transition-colors p-1'>
                        <Trash className='h-4 w-4 md:h-5 md:w-5'/>
                      </button>
                      </div>

                      <div className='flex items-center justify-between flex-wrap gap-3 md:gap-4'>
                        <div className='flex items-center gap-3 md:gap-4'>
                          <div className='flex items-center bg-gray-50 rounded-md md:rounded-lg px-2 py-1 md:px-3 md:py-1.5'>
                            <button
                            onClick={() => dec(item)}
                            className='cursor-pointer text-gray-500 hover:text-emerald-600 transition-colors p-1'>
                              <Minus className='h-3 w-3 md:h-4 md:w-4'/>
                            </button>
                            <span className='mx-2 md:mx-3 text-gray-900 font-medium w-6 text-center text-sm md:text-base'>
                              {item.quantity}
                            </span>
                            <button
                            onClick={() => inc(item)}
                            className='cursor-pointer text-gray-500 hover:text-emerald-600 transition-colors p-1'>
                              <Plus className='h-3 w-3 md:h-4 md:w-4'/>
                            </button>
                          </div>
                          <span className='text-base md:text-lg font-semibold text-gray-900'>
                            ₦{(item.price * item.quantity).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <span className='text-gray-600 text-xs md:text-sm'>
                            ₦{(item.price).toLocaleString("en-NG", { minimumFractionDigits: 2 })} each
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 h-fit lg:sticky lg:top-6'>
              <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6'>
                Order Summary
              </h2>
              <div className='space-y-3 md:space-y-4 mb-6 md:mb-8'>
                <div className='lex justify-between'>
                  <span className='ext-gray-600 text-sm md:text-base'>
                    Subtotal ( {cart.items.length} items ) {" "}
                  </span>
                  <span className='text-gray-900 font-medium text-sm md:text-base'>
                    ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600 text-sm md:text-base'>
                    Shipping
                  </span>
                  <span className='text-emerald-600 font-medium text-sm md:text-base'>
                    Free
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600 text-sm md:text-base'>
                    Taxes
                  </span>
                  <span className='text-gray-900 font-medium text-sm md:text-base'>
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className='border-t border-gray-200 pt-4 md:pt-6 mb-6 md:mb-8'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 text-sm md:text-base'>
                    Total
                  </span>
                  <span className='text-xl md:text-2xl font-bold text-emerald-600'>
                   ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button className='cursor-pointer w-full flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-lg md:rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm md:text-base mb-3 md:mb-4'>
                Checkout Now
                <ArrowRight className='h-4 w-4 md:h-5 md:w-5'/>
              </button>

              <Link to='/books' className='cursor-pointer w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base'>
                <BookOpen className='h-4 w-4 md:h-5 md:w-5'/>
                Continue Shopping 
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
