import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User  } from 'lucide-react'
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_BASE;

const SignUp = () => {
  const [formData, setFormData ] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast ] = useState({ visible: false, message: "", type: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(toast.visible) {
      const timer = setTimeout(() => {
        setToast({visible: false, message: "", type: ""})
        if (toast.type === 'success') {
          navigate('/login')
        }
      }, 3000)
    return () => clearTimeout(timer)
    }
  }, [toast, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {username, email, password} = formData;

    if(!username.trim() || !email.trim() || !password.trim()) {
      setToast({
        visible: true,
        message: 'All fields are required',
        type: 'error'
      })
      return 
    }
    setToast({
      visible: true,
      message: 'Creating Account...',
      type: 'success'
    })
    setIsSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await res.json();
      if(!res.ok) {
        setToast({
          visible: true,
          message: data.message || data.error || 'Registration failed',
          type: 'error'
        })
        return 
      }
      setToast({ visible: true, message: 'Account Created...', type: 'success'})
    } catch (error) {
      console.log(error)
      setToast({ visible: true , message: 'Network Error', type: 'error'})
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      {toast.visible && (
        <div className={`fixed top-4 right-4 p-3 rounded-md 
                        ${toast.type === 'success' ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700" }`}>
            {toast.message}
        </div>
      )}

      <motion.div 
      initial={{scale: 0.9, opacity: 0}}
      whileInView={{scale: 1, opacity:1}}
      viewport={{once: true}}
      transition={{ duration: 0.8}}
      className='w-full max-w-md bg-white rounded-lg shadow-sm p-8'>
        <Link 
        to='/'
        className='flex items-center text-gray-600 mb-8'>
          <ArrowLeft className='mr-1 h-4 w-4' />
          Back to Home
        </Link>

        <div className='text-center mb-8'>
          <div className='mx-auto mb-4 bg-gray-100 w-fit p-3 rounded-full'>
              <User className='h-6 w-6 text-[#43C6AC]' />
          </div>
          <h3 className='text-2xl font-bold text-gray-800'>Create Account</h3>
          <p className='text-gray-600 mt-2'>Join our community of book lovers</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-2'>Username</label>
            <div className='relative'>
              <User className='absolute left-3 top-3.5 h-5 w-5 text-gray-400'/>
              <input 
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value })}
              className='w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-400' />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 mb-2'>Email</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-3.5 h-5 w-5 text-gray-400'/>
              <input 
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value })}
              className='w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-400' />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 mb-2'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3.5 h-5 w-5 text-gray-400'/>
              <input 
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value })}
              className='w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-400' />
              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='cursor-pointer absolute right-3 top-3.5 text-gray-400'
              >
                {showPassword ? 
                <Eye className='h-5 w-5'/> : <EyeOff className='h-5 w-5'/>}
              </button>
            </div>
          </div>

          <button 
          type='submit'
          disabled={isSubmitting}
          className='cursor-pointer w-full bg-[#43C6AC] text-white py-3 rounded-lg hover:bg-[#368f7a] transition-colors'>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className='mt-6 text-center text-gray-600'>
          Already have an account? {" "}
          <Link to='/login' className='text-[#43C6AC] hover:underline'>
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUp
