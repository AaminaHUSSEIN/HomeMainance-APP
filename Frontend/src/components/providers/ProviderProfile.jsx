import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin, FiPhone, FiInfo, FiArrowLeft, FiStar, FiShield, FiCalendar } from 'react-icons/fi';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProvider = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/provider/${id}`);
        if (res.data.success) {
          setProvider(res.data.data);
        }
      } catch (error) {
        console.error("Profile Load Error:", error.response?.status);
      } finally {
        setLoading(false);
      }
    };
    loadProvider();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative flex h-16 w-16">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-20"></span>
        <div className="relative rounded-2xl h-16 w-16 border-4 border-sky-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Portfolio...</p>
    </div>
  );
  
  if (!provider) return (
    <div className="max-w-md mx-auto text-center py-20 px-8 bg-white shadow-2xl rounded-[3rem] mt-20 border border-slate-50">
      <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <FiInfo size={40} />
      </div>
      <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Specialist Not Found</h2>
      <p className="text-slate-500 mt-4 mb-10 text-sm font-medium leading-relaxed">The professional profile you are looking for is unavailable or has been moved.</p>
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-sky-500 transition-all shadow-xl shadow-sky-100"
      >
        <FiArrowLeft /> Return to Directory
      </button>
    </div>
  );

  const displayName = provider.fullName || provider.user?.name || "Verified Professional";

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-24 px-4">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors mb-8">
        <FiArrowLeft size={16} /> Back to Search
      </button>

      <div className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.04)] rounded-[3.5rem] border border-sky-50/50 overflow-hidden">
        
        {/* Profile Header Decoration */}
        <div className="h-32 bg-gradient-to-r from-sky-400 to-indigo-500 w-full opacity-10 absolute top-0 left-0"></div>

        <div className="relative p-10 md:p-14">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Elite Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-sky-500 shadow-2xl shadow-sky-100 border-4 border-white uppercase">
                {displayName.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                <FiShield size={16} />
              </div>
            </div>
            
            <div className="text-center md:text-left pt-2">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <div className="flex text-amber-400"><FiStar size={12} fill="currentColor" /></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Top Rated Partner</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">
                {displayName}
              </h1>
              <div className="inline-block mt-3 px-4 py-1.5 bg-sky-50 rounded-full border border-sky-100">
                <p className="text-sky-600 font-black uppercase text-[9px] tracking-[0.25em]">
                   {provider.serviceType || "Expert Technician"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Info Grid */}
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {/* Location Card */}
            <div className="group bg-slate-50/50 p-7 rounded-[2.5rem] border border-transparent hover:border-sky-100 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-500">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <FiMapPin size={18} />
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Service Area</p>
              <p className="font-black text-slate-800 tracking-tight">
                {provider.location || "Region Restricted"}
              </p>
            </div>

            {/* Phone Card */}
            <div className="group bg-slate-50/50 p-7 rounded-[2.5rem] border border-transparent hover:border-sky-100 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-500">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <FiPhone size={18} />
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Direct Contact</p>
              <p className="font-black text-slate-900 tracking-tight italic">
                {provider.user?.phone || provider.phone || "Protected Line"}
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6 bg-slate-50/50 p-8 rounded-[2.5rem] border border-transparent group hover:bg-white transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <FiInfo className="text-sky-500" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Professional Background</p>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-sm">
              {provider.bio || "This specialist is currently refining their professional biography to serve you better."}
            </p>
          </div>

          {/* Action Button */}
          <button 
            onClick={() => navigate(`/book-service/${provider._id}`)}
            className="group w-full mt-10 bg-slate-900 text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-sky-500 hover:shadow-2xl hover:shadow-sky-100 transition-all active:scale-95"
          >
            <FiCalendar size={18} className="group-hover:rotate-12 transition-transform" />
            Initialize Booking Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;