import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BookPlus, Star } from 'lucide-react'

  const initialFormData = {
    title: "",
    author: "",
    price: "",
    image: null,
    rating: 4,
    category: "Fiction",
    description: "",
    preview: "",
  };

  const categories = [
    "Fiction", "Non-Fiction", "Mystery", "Sci-Fi", 
    "Biography", "Self-Help", "Thriller"
  ];

  const API_BASE = import.meta.env.VITE_API_BASE

  
const AddBook = () => {

  const [formData, setFormData] = useState(initialFormData);
  const [hoverRating, setHoverRating ] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({type: null, text: null});


  useEffect(() => {
    if (!message.text) return;

    const timer = setTimeout(() => {
      setMessage({ type: null, text: null });
    }, 3000);

    return () => clearTimeout(timer);
  }, [message.text]);
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: null, text: null})

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if(key !== 'preview' && value !== null) payload.append(key, value)
    })

    try {
      await axios.post(`${API_BASE}/api/book`, payload)
      setMessage({ type: 'success', text: 'Book added successfully'})
      setFormData(initialFormData)
    } catch (error) {
      console.error('AddBooks error response', error.response?.data, error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to add book'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  //image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return;

    setFormData(prev => ({...prev, image: file, preview: URL.createObjectURL(file)}))
  }

  //start rating handler
  const handleStarClick = (starValue) => {
    setFormData(prev => ({...prev, rating: starValue}))
  }
 
  return (
    <div className='min-h-screen pb-28 bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>
              Add New Book
            </h3>
            <p className='text-gray-600 mt-1'>
              Fill in the details to add a new book to your store
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='mb-6'>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-2'>Book Title</label>
              <input 
              type='text'
              name="title" 
              id='title'
              value={formData.title} 
              placeholder='Enter book title'
              onChange={handleChange}
              required
              className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='author' className='block text-sm font-medium text-gray-700 mb-2'>Author</label>
              <input 
              type='text'
              name="author" 
              id='author'
              value={formData.author} 
              placeholder='Enter book author'
              onChange={handleChange}
              required
              className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-2'>Price (₦)</label>
              <input 
              type='number'
              name="price"
              id='price' 
              value={formData.price} 
              placeholder='Enter price'
              onChange={handleChange}
              required
              className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='mb-6'>
            <label htmlFor='rating' className='block text-sm font-medium text-gray-700 mb-2'>Rating</label>
            <div className='flex items-center gap-3'>
              <div className='flex'>
                {[1,2,3,4,5].map(starValue => (
                  <button 
                  id='rating'
                  type='button'
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
                  key={starValue}>
                    <Star className={`cursor-pointer w-5 h-5 ${
                        (hoverRating || formData.rating) >= starValue
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                      }`}/>
                  </button>
                ))}
              </div>
              <p className='ml-1 text-sm text-gray-600'>
                {formData.rating} Star{formData.rating !== 1 ? 's' : '' }
              </p>
            </div>
            </div>

            <div className='mb-6'>
              <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
              <select 
              id='category'
              name='category' 
              value={formData.category}
              onChange={handleChange}
              className='cursor-pointer w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'>
                {categories.map(cat => (
                  <option 
                  key={cat}
                  value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cover Image
            </label>
            <label
              htmlFor="image"
              className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-pointer
                        hover:border-indigo-400 transition focus-within:ring-2 focus-within:ring-indigo-500"
            >
              <span className="flex items-center gap-2 text-gray-600">
                📁 <span>Choose image</span>
              </span>
              <span className="text-xs text-gray-400">PNG, JPG, JPEG</span>
              <input
                id="image"
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

           <div className='mb-6 md:col-span-2'>
              <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2'>Description</label>    
              <textarea
              name='description'
              id='description'
              required
              value={formData.description}
              onChange={handleChange}
              rows='4'
              placeholder='Enter book description'
              className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'>
              </textarea> 
             </div>
          </div>

          {formData.preview && (
            <div className='mt-6'>
              <h3 className='text-sm font-medium text-gray-700 mb-3'></h3>
              <img 
              src={formData.preview} 
              alt="image" 
              className='w-full h-full object-cover'/>
            </div>
          )}

          {message.text && (
            <p className={`mt-2 text-${message.type === 'success' ? 'green' : 'red'}`}>{message.text}</p>
          )}

          <div className='mt-8 flex justify-center'>
            <button 
            disabled={loading}
            type='submit'
            className='cursor-pointer flex items-center gap-2 px-6 py-3 bg-[#43C6AC] text-white font-medium rounded-lg hover:bg-[#5ba193] transition-colors'>
              <BookPlus className='h-5 w-5'/>
              <span>Add Book to Collection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook
