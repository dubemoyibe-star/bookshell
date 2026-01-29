import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import BooksPage from './pages/BooksPage'
import ContactPage from './pages/ContactPage'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cart' element={<CartPage />} />
    <Route path='/about' element={<AboutPage />} />
    <Route path='/books' element={<BooksPage/>} />
    <Route path='/contact' element={<ContactPage />} />

    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
   </Routes> 
  )
}

export default App
