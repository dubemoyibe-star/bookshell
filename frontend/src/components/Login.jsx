import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight , Mail, Lock, Eye, EyeOff} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { auth } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const API_BASE = import.meta.env.VITE_API_BASE;

const Login = () => {

  const [formData, setFormData ] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast ] = useState({ visible: false, message: "", type: "" })
  const navigate = useNavigate()

  useEffect(() => {
    if(toast.visible){
      const timer = setTimeout(() => 
        setToast({...toast, visible: false})
    , 2000)
    return () => clearTimeout(timer)
    }
  }, [toast])

const provider = new GoogleAuthProvider()
  
const handleGoogleLogin = async () => {
  setLoading(true);

  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const idToken = await user.getIdToken();

    const { data } = await axios.post(
      `${API_BASE}/api/user/google-login`,
      { token: idToken },
      { headers: { "Content-Type": "application/json" } }
    );

    localStorage.setItem("auth-Token", data.token);

    setToast({
      visible: true,
      message: "Login Successful",
      type: "success",
    });

    setTimeout(() => navigate("/"), 3000);

  } catch (error) {

    if (error.code === "auth/popup-closed-by-user") {
      setToast({
        visible: true,
        message: "Popup closed before completing login",
        type: "error",
      });
    } else {
      console.error(error);
      setToast({
        visible: true,
        message: error.message || "Google login failed",
        type: "error",
      });
    }

  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = formData

    if(!email.trim || !password.trim()) {
      setToast({
        visible: true,
        message: 'All fields are required',
        type: 'error'
      })
      return
    }
    setIsSubmitting(true)

    try {
      const res = await fetch(`${API_BASE}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
      })

      const data = await res.json()
      if(!res.ok) {
        throw new Error(data.message || 'Invalid credentials')
      }
      localStorage.setItem('auth-Token', data.token)
      setToast({ visible: true, message: 'Login Successful', type: 'success'})
      setTimeout(() => navigate('/'), 3000)
    } catch (error) {
      setToast({ visible: true, message: error.message, type: 'error'})
    } finally {
      setIsSubmitting(false)
    }

  }

  const handleSignout = () => {
    localStorage.removeItem('auth-Token')
    setToast({visible: true, message: "Signed out successfully", type: "success"})
  }

  const isLoggedIn = localStorage.getItem('auth-Token')

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      {toast.visible && (
        <div className={`fixed top-4 right-4 p-3 rounded-md ${
              toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
             {toast.message} 
        </div>
      )}

      <motion.div
      initial={{scale: 0.9, opacity: 0}}
      whileInView={{scale: 1, opacity:1}}
      viewport={{once: true}}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <Link to='/' className="flex items-center text-gray-600 mb-8">
          <ArrowRight className='rotate-180 mr-1 h-4 w-4'/>
          Back to Home
        </Link>

        {!isLoggedIn ? (
          <>
          <div 
          className="text-center mb-8">
            <div className="mx-auto mb-4 bg-gray-100 w-fit p-3 rounded-full">
              <Lock className="h-6 w-6 text-[#43C6AC]"/>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Sign In 
            </h1>
            <p className="text-gray-600">
              Access your BookShell account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-gray-700 mb-2">Email </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 text-gray-400"/>
                <input 
                type="email"
                placeholder="email@example.com"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                value={formData.email}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500"/>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 text-gray-400"/>
                <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                value={formData.password}
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500"/>
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3.5 text-gray-400'
                >
                  {showPassword ? 
                  <Eye className='cursor-pointer h-5 w-5'/> : <EyeOff className='cursor-pointer h-5 w-5'/>}
              </button>
              </div>
            </div>
            
           <div className="flex flex-col items-center w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-[#43C6AC] text-white py-3 rounded-lg hover:bg-[#368f7a] transition-colors"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <div className="flex items-center my-4 w-full">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className='cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 font-semibold text-black rounded-lg hover:shadow-lg transition-all'
            >
              <span className='flex items-center justify-center gap-2'>
                  <svg
                  className="h-5 w-5 mr-2 flex"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 533.5 544.3"
                >
                  <path fill="#4285F4" d="M533.5 278.4c0-18.3-1.5-36-4.3-53.3H272v100.8h146.9c-6.4 34-25.5 62.9-54.5 82v68h87.8c51.3-47.3 80.3-116.8 80.3-197.5z"/>
                  <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.4 180.8-66.2l-87.8-68c-24.5 16.4-55.9 26-93 26-71.5 0-132.2-48.1-153.9-112.4H29.2v70.7C74.3 488 167 544.3 272 544.3z"/>
                  <path fill="#FBBC05" d="M118.1 324.4c-4.5-13.3-7.1-27.4-7.1-42s2.6-28.7 7.1-42v-70.7H29.2C10.6 222.2 0 250.8 0 272s10.6 49.8 29.2 70.7l88.9-18.3z"/>
                  <path fill="#EA4335" d="M272 107.7c39.8 0 75.5 13.7 103.8 40.6l77.7-77.7C405.6 24.3 343.7 0 272 0 167 0 74.3 56.3 29.2 141.6l88.9 70.7C139.8 155.8 200.5 107.7 272 107.7z"/>
                </svg>
              {loading ? 'Signing in with Google...' : 'Sign in with Google'}
              </span>
            </button>
          </div>
          </form>

          <div className="mt-6 text-center text-gray-600">
                Dont have an account?{" "}
                <Link to='/signup' className="text-[#43C6AC] hover:underline">
                  Create Account
                </Link>
          </div>
          </>
        ): (
          <div className="text-center">
            <div className="mb-6 bg-gray-100 w-fit mx-auto p-3 rounded-full">
              <Lock className="h-6 w-6 text-[#43C6AC]"/>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome Back</h2>
            <button
            onClick={() => navigate('/')}
            className="cursor-pointer w-full bg-[#43C6AC] text-white py-3 rounded-lg hover:bg-[#368f7a] transition-colors mb-2">
              Go to HomePage
            </button>

            <button
            onClick={handleSignout}
            className="cursor-pointer w-full text-gray-600 py-3 rounded-lg border hover:bg-gray-50 transition-colors">
              Sign Out 
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Login
