import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight , Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast({ ...toast, visible: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setToast({ visible: true, message: "All fields are required", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${API_BASE}/api/admin/login`, { email, password });

      localStorage.setItem("admin-Token", res.data.token);

      setToast({ visible: true, message: "Login successful", type: "success" });

      setTimeout(() => navigate("/"), 3000); 
    } catch (error) {
      setToast({
        visible: true,
        message: error.response?.data?.message || "Invalid credentials",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignout = () => {
    localStorage.removeItem("admin-Token");
    setToast({ visible: true, message: "Signed out successfully", type: "success" });
  };

  const isLoggedIn = localStorage.getItem("admin-Token");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 p-3 rounded-md ${
            toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white rounded-lg shadow-sm p-8"
      >
        <button onClick={() => window.history.back()} className="cursor-pointer flex items-center text-gray-600 mb-8">
          <ArrowRight className="rotate-180 mr-1 h-4 w-4" />
          Back 
        </button>

        {!isLoggedIn ? (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 bg-gray-100 w-fit p-3 rounded-full">
                <Lock className="h-6 w-6 text-[#43C6AC]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Sign In</h1>
              <p className="text-gray-600">Access your BookShell admin account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    value={formData.email}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    value={formData.password}
                    className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400"
                  >
                    {showPassword ? <Eye className="h-5 w-5 cursor-pointer" /> : <EyeOff className="h-5 w-5 cursor-pointer" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full bg-[#43C6AC] text-white py-3 rounded-lg hover:bg-[#368f7a] transition-colors"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-600">
                  Dont have an account?{" "}
                  <Link to='/signup' className="text-[#43C6AC] hover:underline">
                    Create Account
                  </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Already logged in</h2>
            <button
              onClick={() => navigate("/orders")}
              className="cursor-pointer w-full bg-[#43C6AC] text-white py-3 rounded-lg hover:bg-[#368f7a] transition-colors mb-2"
            >
              View Orders
            </button>
            <button
              onClick={handleSignout}
              className="cursor-pointer w-full text-gray-600 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
