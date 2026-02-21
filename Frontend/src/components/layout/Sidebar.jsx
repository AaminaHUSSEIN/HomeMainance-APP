import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiHome, FiShoppingBag, FiCalendar, FiUser, 
  FiUsers, FiSettings, FiLogOut, FiClipboard, FiShield 
} from 'react-icons/fi'

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard', role: ['user', 'provider', 'admin'] },
    { icon: FiShoppingBag, label: 'Services', path: '/services', role: ['user', 'provider', 'admin'] },
    { icon: FiCalendar, label: 'My Bookings', path: '/my-bookings', role: ['user', 'provider'] },
    { icon: FiClipboard, label: 'Manage All', path: '/admin/bookings', role: ['admin'] },
    { icon: FiUsers, label: 'Providers List', path: '/providers', role: ['user', 'admin'] },
    { icon: FiUser, label: 'Profile Settings', path: '/profile', role: ['user', 'provider', 'admin'] },
    { icon: FiSettings, label: 'Admin Control', path: '/admin', role: ['admin'] },
  ]

  return (
    <>
      {/* Overlay: Glass effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-40 md:hidden transition-opacity duration-300" 
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-sky-50 shadow-[20px_0_60px_rgba(0,0,0,0.03)] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-all duration-500 ease-out`}>
        
        {/* Branding Area */}
        <div className="p-8">
          <div className="flex items-center space-x-3 group cursor-default">
            <div className="bg-sky-500 text-white rounded-2xl p-2.5 shadow-xl shadow-sky-100 group-hover:rotate-6 transition-transform duration-500">
              <FiShield size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                Home <span className="text-sky-500 italic">Maintenance</span>
              </span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Management Pro</span>
            </div>
          </div>
        </div>
        
        <nav className="px-4 flex flex-col h-[calc(100vh-140px)]">
          {/* Menu Section */}
          <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
            <p className="px-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
            {menuItems
              .filter(item => user?.role && item.role.includes(user.role))
              .map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                      isActive 
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-100 translate-x-1' 
                      : 'text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                    }`}
                  >
                    <Icon size={18} className={`${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                    <span className={`text-xs uppercase tracking-widest font-black ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                      {item.label}
                    </span>
                  </Link>
                )
              })}
          </div>
          
          {/* User & Footer Section */}
          <div className="mt-auto pb-6 pt-4 border-t border-slate-50">
            <div className="px-4 py-4 bg-slate-50/50 rounded-3xl mb-4 border border-slate-100 group hover:border-sky-200 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-11 h-11 bg-white rounded-2xl shadow-sm flex items-center justify-center text-sky-500 border border-sky-100 overflow-hidden">
                     {/* Placeholder for User Initials */}
                     <span className="font-black text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="overflow-hidden">
                  <p className="font-black text-slate-900 text-xs truncate uppercase tracking-tight">{user?.name}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-[9px] text-sky-500 uppercase font-black tracking-widest leading-none">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={logout} 
              className="group flex items-center justify-center space-x-3 w-full px-5 py-4 text-rose-500 bg-rose-50/30 hover:bg-rose-50 rounded-2xl transition-all duration-300 border border-transparent hover:border-rose-100"
            >
              <FiLogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sing Out</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar