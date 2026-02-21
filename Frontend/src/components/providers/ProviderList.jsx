import React, { useState, useEffect } from 'react'; 
import { useSearchParams } from 'react-router-dom';
import { providerService } from '../../services/providerService';
import { useAuth } from '../../context/AuthContext';
import ProviderCard from './ProviderCard';
import { FiSearch, FiLayers, FiZap } from 'react-icons/fi';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 
  const [searchParams] = useSearchParams();

  const serviceIdFromUrl = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceType');

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        const fetchId = user?.role === 'admin' ? null : serviceIdFromUrl;
        const data = await providerService.getAll(fetchId);
        setProviders(data);
      } catch (error) {
        console.error('Error loading providers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [serviceIdFromUrl, user?.role]); 

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#f8fafc]">
        <div className="relative flex items-center justify-center">
          <div className="absolute animate-ping inline-flex h-16 w-16 rounded-full bg-sky-400 opacity-20"></div>
          <div className="relative animate-spin rounded-2xl h-12 w-12 border-4 border-sky-500 border-t-transparent shadow-xl shadow-sky-100"></div>
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Syncing Specialist Database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden pb-24">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 pt-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="h-px w-8 bg-sky-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500">Elite Network</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
              {user?.role === 'admin' ? "Provider " : `${serviceName || 'Expert '} `}
              <span className="text-sky-500 italic">Directory</span>
            </h1>
          </div>

          {providers.length > 0 && (
            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-[2rem] shadow-xl shadow-sky-100/50 border border-sky-50">
              <div className="bg-sky-500 text-white p-3 rounded-2xl">
                <FiZap size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 leading-none">{providers.length}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Active Specialists</span>
              </div>
            </div>
          )}
        </div>

        {/* List Content */}
        {providers.length === 0 ? (
          <div className="py-32 text-center bg-white rounded-[4rem] shadow-2xl shadow-sky-100/20 border border-sky-50 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-50 text-slate-200 rounded-[2.5rem] mb-8">
                <FiSearch size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-4">
                No Specialists Available <br/> 
                <span className="text-sky-500">for {serviceName || 'this service'}</span>
              </h3>
              <p className="text-slate-400 text-sm font-medium max-w-md mx-auto leading-relaxed">
                Our elite network is currently expanding. Please check back shortly or explore our other premium maintenance categories.
              </p>
              <button onClick={() => window.history.back()} className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500 hover:text-slate-900 transition-colors">
                &larr; Return to categories
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {providers.map((provider) => (
              <ProviderCard key={provider._id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderList;