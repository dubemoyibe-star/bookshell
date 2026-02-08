import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import BooksPage from './pages/BooksPage'
import ContactPage from './pages/ContactPage'
import Checkout from './components/Checkout'
import MyOrders from './components/MyOrders'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProtectedRoute from './pages/ProtectedRoute'
import VerifyPaymentPage from './pages/VerifyPaymentPage'

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cart' element={<CartPage />} />
    <Route path='/about' element={<AboutPage />} />
    <Route path='/books' element={<BooksPage/>} />
    <Route path='/contact' element={<ContactPage />} />
    
    <Route 
      path='/checkout' 
      element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
    <Route path='/orders/verify' element={<VerifyPaymentPage />}/>
    <Route path='/orders' element={<MyOrders />} />

    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<SignUp />} />
   </Routes> 
  )
}

export default App
