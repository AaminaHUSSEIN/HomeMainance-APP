import React from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiPhone, FiMail, FiCheckCircle, FiArrowRight, FiShield } from 'react-icons/fi'

const ProviderCard = ({ provider }) => {
  return (
    <div className="group bg-white rounded-[3rem] border border-sky-50 shadow-[0_20px_50px_rgba(186,230,253,0.2)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(186,230,253,0.4)] hover:-translate-y-2">
      
      {/* Visual Header Section */}
      <div className="relative h-60 bg-gradient-to-br from-slate-50 to-sky-50 flex items-center justify-center overflow-hidden">
        {/* Background Decorative Icon */}
        <div className="absolute top-0 right-0 p-8 text-sky-500/5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-1000">
           <FiShield size={160} />
        </div>
        
        {/* Main Icon/Avatar Placeholder */}
        <div className="relative z-10 w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-sky-100 flex items-center justify-center border border-white group-hover:scale-110 transition-transform duration-500">
          <FiUser className="text-4xl text-sky-200 group-hover:text-sky-500 transition-colors" />
        </div>
        
        {/* Elite Status Badge */}
        <div className="absolute top-8 left-8">
          <span className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border border-white/50 ${
            provider.status === 'approved' ? 'bg-white/80 text-emerald-600' :
            provider.status === 'pending' ? 'bg-white/80 text-sky-500' :
            'bg-white/80 text-rose-500'
          }`}>
            <span className={`relative flex h-2 w-2`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                provider.status === 'approved' ? 'bg-emerald-400' :
                provider.status === 'pending' ? 'bg-sky-400' : 'bg-rose-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                provider.status === 'approved' ? 'bg-emerald-500' :
                provider.status === 'pending' ? 'bg-sky-500' : 'bg-rose-500'
              }`}></span>
            </span>
            {provider.status}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-10">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-sky-500 transition-colors">
            {provider.name}
          </h3>
          {provider.status === 'approved' && (
            <div className="bg-sky-500 text-white p-1 rounded-lg shadow-lg shadow-sky-100 transform -rotate-6">
               <FiCheckCircle size={14} />
            </div>
          )}
        </div>

        <p className="text-sky-400 font-black text-[10px] uppercase tracking-[0.3em] mb-8">
          {provider.serviceName || 'Expert Technician'}
        </p>

        {/* Contact Intelligence Grid */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-4 group/info transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/info:bg-sky-500 group-hover/info:text-white transition-all">
              <FiPhone size={16} />
            </div>
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{provider.phone}</span>
          </div>
          
          <div className="flex items-center gap-4 group/info transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/info:bg-sky-500 group-hover/info:text-white transition-all">
              <FiMail size={16} />
            </div>
            <span className="text-xs font-black text-slate-600 truncate uppercase tracking-widest">{provider.email}</span>
          </div>
        </div>

        {/* Premium Action Button */}
        <Link
          to={`/provider-profile/${provider._id}`} 
          className="group/btn flex items-center justify-between w-full bg-slate-900 text-white px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-sky-500 hover:shadow-2xl hover:shadow-sky-100 active:scale-95"
        >
          <span className="relative z-10">Verify Portfolio</span>
          <div className="bg-white/10 p-2 rounded-xl group-hover/btn:bg-white/20 transition-colors">
            <FiArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ProviderCard