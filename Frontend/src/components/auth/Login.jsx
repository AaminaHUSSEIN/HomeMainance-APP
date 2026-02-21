import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiUnlock } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      await login(data)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] py-12 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-sky-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] bg-blue-200/40 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[480px] w-full relative">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(186,230,253,0.5)] mb-6 group transition-all duration-500 hover:scale-110 border border-sky-50">
            <FiShield className="text-sky-500" size={38} />
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-3">
            Sign <span className="text-sky-500 italic">In</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Secure Portal Access</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] shadow-[0_40px_100px_rgba(186,230,253,0.3)] border border-white p-10 md:p-14">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            
            {/* Email Field */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 ml-4">
                User Identifier
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors group-focus-within:text-sky-500 text-slate-300">
                  <FiMail size={20} />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[2rem] font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-rose-500' : 'focus:ring-sky-400 focus:bg-white'}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] font-bold text-rose-500 ml-6 uppercase tracking-widest">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 ml-4">
                Security Key
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors group-focus-within:text-sky-500 text-slate-300">
                  <FiLock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`w-full pl-14 pr-14 py-5 bg-slate-50 border-none rounded-[2rem] font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${errors.password ? 'ring-2 ring-rose-500' : 'focus:ring-sky-400 focus:bg-white'}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-300 hover:text-sky-500 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] font-bold text-rose-500 ml-6 uppercase tracking-widest">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full bg-sky-500 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:bg-slate-900 hover:shadow-2xl hover:shadow-sky-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Enter System <FiUnlock className="group-hover:rotate-12 transition-transform" /></>
                )}
              </span>
            </button>
          </form>

          {/* Elite Access Divider */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-sky-100"></div></div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
              <span className="bg-white/0 px-4 backdrop-blur-sm">Protected Protocol</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-400 text-xs font-bold">
            New to our community?{' '}
            <Link to="/register" className="text-sky-500 hover:text-slate-900 transition-colors underline underline-offset-8 decoration-2">
              Join Now
            </Link>
          </p>
        </div>
        
        {/* Footer Info */}
        <p className="text-center mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          &copy; 2026 Elite HomeCare &bull; Encrypted Session
        </p>
      </div>
    </div>
  )
}

export default Login