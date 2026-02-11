import React, { useEffect, useState, useMemo } from 'react'
import { BookOpen, Filter, Trash2 } from 'lucide-react'
import { ClipLoader } from 'react-spinners';
import axios from 'axios'
import { motion } from 'framer-motion'

 const API_BASE = import.meta.env.VITE_API_BASE

const ListBook = () => {

  const [books, setBooks] = useState([])
  const [filterCategory, setFilterCategory] = useState('All')
  const [sortConfig, setSortConfig]= useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  //fetch book from server
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data } = await axios.get(`${API_BASE}/api/book`)
        setBooks(data)
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load books')
      } finally {
        setLoading(false)
      }
    }
    fetchBooks();
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(books.map((book) => book.category))],
   [books])

     const displayedBooks = useMemo(() => {
      let filtered = books;
      if (filterCategory !== "All") {
        filtered = filtered.filter((book) => book.category === filterCategory);
      }

      if (sortConfig === "priceLowToHigh") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      } else if (sortConfig === "topRated") {
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      }

      return filtered;
    }, [books, filterCategory, sortConfig]);

    const tableHeaders = [
    { key: null, label: "Book" },
    { key: "author", label: "Author" },
    { key: null, label: "Category" },
    { key: "price", label: "Price" },
    { key: "rating", label: "Rating" },
    { key: null, label: "Actions" },
  ];

  const RatingStar = ({rating}) => (
      <div className='flex items-center'>
        <div className='flex'>
          {[...Array(5)].map((_, i) => 
            <span key={i} className={`h-4 w-4 ${
            i < Math.floor(rating) ? 'text-amber-400 fill-amber-400': 'text-gray-300'}`}>
              ★
            </span>
          )}
        </div>

        <span className='ml-1 text-sm text-gray-600'>
          {Number(rating).toFixed(1)}
        </span>
      </div>
  )

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure')) return;

    try {
      await axios.delete(
        `${API_BASE}/api/book/${id}`, 
        {validateStatus: status => [200, 204, 500].includes(status)})
        setBooks((prev) => prev.filter((book) => book._id !== id))
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Failed to delete book')
    }
  }

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div className='text-center mb-8'>
        <motion.h1 
        initial={{y: 40, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
        className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A237E] to-[#43C6AC] bg-clip-text text-transparent'>Manage Books Inventory </motion.h1>
        <motion.p 
        initial={{y: 40, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        viewport={{once: true}}
        transition={{duration: 0.8, delay: 0.1}}
        className='text-gray-600 mt-2'>View, edit and manage your book collection</motion.p>
      </div>

      {/*controls */}
      <motion.div 
      initial={{scale: 0.9, opacity: 0}}
      whileInView={{scale: 1, opacity:1}}
      viewport={{once: true}}
      transition={{ duration: 0.8, delay: 0.2}}
      className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
        <div className='flex flex-col md:flex-row gap-4 justify-between'>
          <div className='flex gap-3'>
            <div className='relative group'>
              <div className='absolute -inset-0.5 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-lg blur opacity-0 group-hover:opacity-20'/>

              <div className='relative flex items-center'>
                <Filter className='absolute left-3 h-5 w-5 text-gray-400'/>
                <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className='cursor-pointer pl-10 pr-8 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#43C6AC]'>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category === 'All' ? 'All Category' : category}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/*feedback */}
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

      {/* table*/}
      <motion.div 
       initial={{scale: 0.9, opacity: 0}}
       whileInView={{scale: 1, opacity:1}}
       viewport={{once: true}}
       transition={{ duration: 0.8, delay: 0.4}}
      className='bg-white rounded-2xl shadow-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table
          className='min-w-full'>
            <thead className='bg-gradient-to-r from-[#1A237E] to-[#43C6AC] text-white'>
              <tr>
                {tableHeaders.map((header) => (
                  <th 
                  key={header.label} 
                  onClick={() => 
                    header.key  && 
                    setSortConfig(
                      sortConfig === header.key ? '' : header.key
                    )
                  }
                  className='px-6 py-4 text-left cursor-pointer'
                  >
                    <div className='flex items-center'>
                      {header.label}
                      {header.key && sortConfig === header.key && (
                        <span className='ml-1'></span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200'>
                {displayedBooks.map((book) => (
                  <tr key={book._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center'>
                        {book.image && (
                          <img 
                          src={`${book.image.url}`} 
                          alt={book.title} 
                          className='h-10 w-8 object-cover rounded'/>
                        )}
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{book.title}</div>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-4'>
                      {book.author}
                    </td>

                    <td className='px-6 py-4'>
                      <span className='px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
                        {book.category}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      ₦{book.price}
                    </td>

                    <td className='px-6 py-4'>
                      <RatingStar rating={book.rating} />
                    </td>

                    <td className='px-6 py-4'>
                        <button onClick={() => handleDelete(book._id)} className='cursor-pointer text-red-600 hover:text-red-900'>
                          <Trash2 className='h-5 w-5'/>
                        </button>
                    </td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!displayedBooks.length && !loading && (
          <div className='text-center py-12'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
              <BookOpen className='text-gray-400 w-8 h-8'/>
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-1'>No Books Found</h3>
            <p className='text-gray-500'>Try adjusting your filter or sort options</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ListBook
