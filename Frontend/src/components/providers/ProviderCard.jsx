import React from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiPhone, FiMail, FiCheckCircle, FiArrowRight, FiShield } from 'react-icons/fi'

const ProviderCard = ({ provider }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/50">
      
      {/* Provider Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
           <FiShield size={120} />
        </div>
        
        <FiUser className="text-7xl text-slate-300 group-hover:scale-110 transition-transform duration-500" />
        
        {/* Floating Status Badge */}
        <div className="absolute top-6 left-6">
          <span className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
            provider.status === 'approved' ? 'bg-white text-green-600' :
            provider.status === 'pending' ? 'bg-white text-amber-500' :
            'bg-white text-red-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              provider.status === 'approved' ? 'bg-green-500' :
              provider.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
            }`}></span>
            {provider.status}
          </span>
        </div>
      </div>

      {/* Provider Info Body */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            {provider.name}
          </h3>
          {provider.status === 'approved' && (
            <div className="bg-blue-50 p-1 rounded-full">
               <FiCheckCircle className="text-blue-600" size={20} />
            </div>
          )}
        </div>

        <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
          {provider.serviceName || 'Professional Specialist'}
        </p>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 gap-3 mb-8">
          <div className="flex items-center gap-3 text-slate-500 group/item">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-colors">
              <FiPhone size={14} />
            </div>
            <span className="text-sm font-bold tracking-tight">{provider.phone}</span>
          </div>
          
          <div className="flex items-center gap-3 text-slate-500 group/item">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-colors">
              <FiMail size={14} />
            </div>
            <span className="text-sm font-bold tracking-tight truncate">{provider.email}</span>
          </div>
        </div>

        {/* View Profile Action */}
        <Link
          to={`/provider-profile/${provider._id}`} 
          className="group/btn flex items-center justify-between w-full bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-200"
        >
          <span>View Profile</span>
          <FiArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

export default ProviderCard