import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const VerifyPaymentPage = () => {

  const [statusMsg, setStatusMsg] = useState('Verifying Payment...')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const reference = searchParams.get('reference')
  const token = localStorage.getItem('auth-Token')
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    if(!reference) {
      setStatusMsg('Payment reference is missing')
    }

  axios.get(`${API_BASE}/api/order/confirm`, {
      params: { reference },
      headers: token ? { Authorization: `Bearer ${token}`} : {}
  })
  .then(() => {
    setStatusMsg('Payment confirmed! Redirecting to your orders...')
    setTimeout(() => navigate('/orders', { replace: true}), 2000)
  })
  .catch((err) => {
    console.error('Confirmaton error:', err)
    setStatusMsg(
      err.response?.data?.message || 'Error confirming payment. Please contact support'
    )
  })
}, [reference, API_BASE, navigate, token])

  return (
    <div className='min-h-screen flex items-start justify-center bg-gray-900 text-white'>
     <p className='text-xl mt-24'>
      {statusMsg}
     </p>
    </div>
  )
}

export default VerifyPaymentPage
