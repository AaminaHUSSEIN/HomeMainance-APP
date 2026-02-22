import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FiMapPin, FiStar, FiSearch, FiTool, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApprovedProviders();
  }, []);

  const fetchApprovedProviders = async () => {
    try {
      setLoading(true);
      // MUHIIM: Waxaan wacaynaa endpoint-ka u dhashay collection-ka saxda ah
      const res = await api.get('/users/providers');
      
      if (res.data.success) {
        // Kaliya soo bandhig kuwa 'approved' ah haddii aan Backend-ka looga soo sifayn
        const approvedOnly = res.data.data.filter(p => p.status === 'approved');
        setProviders(approvedOnly);
      }
    } catch (err) {
      console.error("Error fetching providers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter-ka raadinta ee UI-ga
  const filteredProviders = providers.filter(p => {
    const name = (p.fullName || "").toLowerCase();
    const service = (p.serviceType || "").toLowerCase();
    const location = (p.location || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return name.includes(search) || service.includes(search) || location.includes(search);
  });

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfdfe]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Directory...</p>
    </div>
  );

  return (
    <div className="bg-[#fcfdfe] min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              Professional <span className="text-indigo-600 italic">Network</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                 <span className="text-indigo-600 font-black">{providers.length}</span> Active Specialists Found
               </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder="Search by name, service or city..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid of Providers */}
        {filteredProviders.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 shadow-sm">
             <FiTool className="mx-auto text-slate-200 mb-6" size={50} />
             <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">No Specialists Found</h3>
             <p className="text-slate-400 text-sm mt-2">We couldn't find anyone matching your current search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider) => (
              <div key={provider._id} className="group bg-white p-8 rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-indigo-600/10 hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-lg group-hover:bg-indigo-600 transition-colors">
                      {(provider.fullName || "P").charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white shadow-sm">
                      <FiCheckCircle size={14} />
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-500 px-4 py-1.5 rounded-2xl flex items-center gap-1.5">
                    <FiStar size={14} fill="currentColor" />
                    <span className="text-xs font-black">4.9</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1 capitalize">
                    {provider.fullName}
                  </h3>
                  <p className="text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    {provider.serviceType || 'Specialist'}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-400 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <FiMapPin className="text-indigo-400" />
                  <span className="text-xs font-black uppercase tracking-widest">{provider.location || 'Hargeisa, SL'}</span>
                </div>

                <Link 
                  to={`/provider/${provider._id}`}
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.2em] group-hover:bg-indigo-600 transition-all"
                >
                  Explore Profile <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Providers;