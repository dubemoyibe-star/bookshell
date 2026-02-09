import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddBook from './components/AddBook'
import ListBook from './components/ListBook'
import Orders from './components/Orders'
import NotFound from './components/NotFound'


const App = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <main className='flex-1 overflow-auto'>
        <Routes>
          <Route path='/' element={<AddBook />}/>
          <Route path='/list-books' element={<ListBook />}/>
          <Route path='/orders' element={<Orders />}/>

          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
