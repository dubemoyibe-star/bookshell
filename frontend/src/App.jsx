import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import BooksPage from './pages/BooksPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import Checkout from './components/Checkout.jsx'
import MyOrders from './components/MyOrders.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import VerifyPaymentPage from './pages/VerifyPaymentPage.jsx'

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
