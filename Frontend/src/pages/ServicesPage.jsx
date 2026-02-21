import React from 'react'
import ServiceList from '../components/services/ServiceList'
import { FiActivity, FiSearch, FiCheckCircle, FiShield } from 'react-icons/fi'

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          
          {/* Sawirkaaga: Browsing Badge Style */}
        
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
            HOME <span className="text-indigo-600">Services.</span>
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            "Your gateway to world-class professional care and home maintenance excellence."
          </p>
        </div>
      </section>

      {/* --- SERVICES GRID SECTION --- */}
      <section className="container mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 overflow-hidden">
          
          {/* Header Section - Clean & Minimal */}
          <div className="p-8 md:p-12 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-white">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Available Experts</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Live Updates • 2026 Catalog</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <FiShield className="text-indigo-500" /> Secure
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <FiCheckCircle className="text-indigo-500" /> Verified
              </div>
            </div>
          </div>

          {/* Service List Area */}
          <div className="p-8 md:p-12">
            <div className="relative z-10 transition-all duration-500">
              <ServiceList />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal Text */}
      <div className="mt-12 text-center">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
          Premium Standards • Guaranteed Quality
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  )
}

export default ServicesPage;