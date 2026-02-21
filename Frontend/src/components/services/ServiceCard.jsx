import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiSettings, FiActivity } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext'; 
import toast from 'react-hot-toast';

const ServiceCard = ({ service }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePush = () => {
    if (isAuthenticated) {
      const type = encodeURIComponent(service.name);
      navigate(`/providers?serviceType=${type}&serviceId=${service._id}`);
    } else {
      toast.error("Authentication required to access specialists.");
      navigate('/register');
    }
  };

  return (
    <div className="group relative bg-white rounded-[2.5rem] border border-sky-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(14,165,233,0.1)] hover:-translate-y-2">
      
      {/* Decorative Accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full transition-colors duration-500 ${
        isAuthenticated ? 'bg-sky-500/5 group-hover:bg-sky-500/10' : 'bg-slate-50'
      }`}></div>

      <div className="p-10 relative z-10">
        {/* Category Icon Placeholder */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${
          isAuthenticated 
          ? 'bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white group-hover:rotate-12' 
          : 'bg-slate-50 text-slate-300'
        }`}>
          {isAuthenticated ? <FiActivity size={24} /> : <FiSettings size={24} />}
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter">
          {service.name}
        </h3>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">
          Professional Category
        </p>
        
        <button
          onClick={handlePush}
          className={`flex items-center justify-between w-full px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 group/btn ${
            isAuthenticated 
              ? "bg-[#020617] text-white hover:bg-sky-500 shadow-xl shadow-sky-100" 
              : "bg-slate-50 text-slate-400 border border-dashed border-slate-200 hover:border-sky-200 hover:bg-sky-50/30"
          }`}
        >
          <span className="relative z-10">
            {isAuthenticated ? "Explore Specialists" : "Access Restricted"}
          </span>
          
          <div className={`p-2 rounded-xl transition-all duration-500 ${
            isAuthenticated ? 'bg-white/10 group-hover/btn:bg-white/20' : 'bg-slate-100'
          }`}>
            {isAuthenticated ? (
              <FiArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            ) : (
              <FiLock size={14} className="group-hover:rotate-12 transition-transform" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;