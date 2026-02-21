import React from 'react';
import { Link } from 'react-router-dom';
import serviceService from '../../services/serviceService';
import ServiceCard from './ServiceCard';
import { FiAlertCircle, FiInbox, FiArrowRight, FiActivity, FiSearch } from 'react-icons/fi';

const ServiceList = ({ limit, showAllLink = false }) => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAll();
      
      let data = response.data ? response.data : response;

      if (data && data.data && Array.isArray(data.data)) {
        data = data.data;
      }

      const finalData = Array.isArray(data) ? data : [];
      setServices(limit ? finalData.slice(0, limit) : finalData);
      setError(null);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Communication interrupted. Unable to sync with service registry.');
    } finally {
      setLoading(false);
    }
  };

  // --- ELITE SKELETON LOADING ---
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(limit || 6)].map((_, i) => (
          <div key={i} className="relative overflow-hidden bg-white rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-sky-50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-50/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            <div className="w-16 h-16 bg-slate-100 rounded-2xl mb-8"></div>
            <div className="h-8 bg-slate-100 rounded-xl w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-50 rounded-lg w-1/2 mb-10"></div>
            <div className="h-16 bg-slate-50 rounded-2xl w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  // --- PREMIUM ERROR STATE ---
  if (error) {
    return (
      <div className="py-24 flex flex-col items-center text-center max-w-lg mx-auto bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-rose-50 px-10">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <FiAlertCircle size={36} />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Registry Sync Error</h3>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">"{error}"</p>
        <button 
          onClick={loadServices}
          className="group flex items-center gap-3 px-10 py-4 bg-[#020617] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-sky-500 transition-all shadow-xl shadow-sky-100"
        >
          <FiActivity className="group-hover:animate-spin" /> Re-establish Connection
        </button>
      </div>
    );
  }

  // --- SOPHISTICATED EMPTY STATE ---
  if (services.length === 0) {
    return (
      <div className="py-32 bg-white rounded-[4rem] border-2 border-dashed border-sky-100 text-center px-6">
        <div className="w-28 h-28 bg-sky-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-sm border border-sky-100">
          <FiSearch className="text-sky-300" size={40} />
        </div>
        <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Catalog Empty</h3>
        <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg leading-relaxed">
          Our specialist network is currently updating. Please monitor this space for new service deployments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Services Grid with Professional Animation Staggering */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div 
            key={service._id} 
            className="group relative"
            style={{ 
              animation: `fadeInUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards ${index * 0.15}s`,
              opacity: 0 
            }}
          >
            {/* Visual Depth Glow */}
            <div className="absolute -inset-4 bg-gradient-to-b from-sky-400/10 to-transparent rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10">
              <ServiceCard service={service} />
            </div>
          </div>
        ))}
      </div>

      {/* Modern Catalog Navigation */}
      {showAllLink && services.length >= limit && (
        <div className="flex justify-center pt-10">
          <Link
            to="/services"
            className="group relative flex items-center gap-6 px-14 py-6 bg-[#020617] text-white rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] overflow-hidden transition-all hover:shadow-2xl hover:shadow-sky-200 active:scale-95"
          >
            <div className="absolute inset-0 bg-sky-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <span className="relative z-10">Explore Full Professional Catalog</span>
            <div className="relative z-10 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:rotate-45">
              <FiArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-all duration-500" />
            </div>
          </Link>
        </div>
      )}

      {/* Professional Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ServiceList;