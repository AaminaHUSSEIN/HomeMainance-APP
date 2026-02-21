import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiHome, FiShoppingBag, FiUsers, 
  FiLogOut, FiMenu, FiX, FiCheckSquare, FiLayout, FiUser
} from 'react-icons/fi'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
  ]

  if (isAuthenticated && (user?.role === 'customer' || user?.role === 'admin')) {
    menuItems.push({ icon: FiShoppingBag, label: 'Services', path: '/services' })
  }

  if (isAuthenticated && user?.role === 'admin') {
    menuItems.push({ icon: FiUsers, label: 'Providers', path: '/providers' })
    menuItems.push({ icon: FiLayout, label: 'Dashboard', path: '/dashboard' })
    menuItems.push({ icon: FiCheckSquare, label: 'Admin Bookings', path: '/admin/bookings' })
  }

  if (isAuthenticated && user?.role === 'customer') {
    menuItems.push({ icon: FiCheckSquare, label: 'Bookings', path: '/my-bookings' })
  }

  return (
    <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-sky-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-sky-500 text-white p-2.5 rounded-2xl shadow-lg shadow-sky-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <FiHome size={22} />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                Home<span className="text-sky-500 italic">Maintenance</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Maintenance Pro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-slate-50/50 p-1.5 rounded-[1.5rem] border border-slate-100">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive(item.path) 
                  ? 'bg-white text-sky-500 shadow-sm shadow-sky-100' 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <item.icon size={14} className={isActive(item.path) ? 'text-sky-500' : ''} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth & User Profile */}
          <div className="hidden md:flex items-center gap-5">
            {!isAuthenticated ? (
              <Link to="/register" className="group relative bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-sky-500 hover:shadow-xl hover:shadow-sky-100 active:scale-95">
                <span className="relative z-10">Register Now</span>
              </Link>
            ) : (
              <div className="flex items-center gap-4 pl-5 border-l border-slate-100">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest leading-none mb-1">{user?.role}</span>
                  <span className="text-xs font-black text-slate-900 leading-none">{user?.name?.split(' ')[0]}</span>
                </div>
                <div className="relative group">
                   <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100">
                      <FiUser size={20} />
                   </div>
                   {/* Tooltip or Dropdown could go here */}
                </div>
                <button 
                  onClick={handleLogout} 
                  className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300"
                  title="Logout Session"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-3 text-slate-900 bg-slate-50 rounded-2xl border border-slate-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-8 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-4 p-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  isActive(item.path) 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' 
                  : 'bg-slate-50 text-slate-500 border border-slate-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="pt-4 space-y-3">
                <Link to="/register" className="flex items-center justify-center p-5 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>
                  Create Account
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-rose-50 text-rose-600 font-black text-xs uppercase tracking-widest mt-4">
                <FiLogOut /> Terminate Session
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header