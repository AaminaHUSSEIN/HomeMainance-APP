import React, { useState, useEffect } from 'react'; 
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api'; 
import ProviderCard from './ProviderCard'; // HUBI IN FILENAMES-KU IS-LEEYIHIIN (Case-sensitive)
import { FiSearch, FiZap } from 'react-icons/fi';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const serviceIdFromUrl = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceType');

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        
        // URL-ka saxda ah: /users/providers (Maadaama server.js uu yahay /api/users)
        const url = serviceIdFromUrl 
          ? `/users/providers?serviceId=${serviceIdFromUrl}` 
          : `/users/providers`;

        console.log("Codsiga hadda baxaya waa:", url);

        const res = await api.get(url);
        
        // Check-garee haddii res.data.data uu jiro
        if (res.data && res.data.success) {
          setProviders(res.data.data || []);
        }
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [serviceIdFromUrl]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent shadow-md"></div>
      <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Searching...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-6 pt-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          {serviceName || 'All Experts'} <span className="text-sky-500 italic">Directory</span>
        </h1>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-xl shadow-sky-100/50 border border-sky-50 flex items-center gap-3">
          <div className="bg-sky-500 p-2 rounded-lg text-white">
            <FiZap size={16} />
          </div>
          <span className="font-black text-slate-700">{providers.length} Available</span>
        </div>
      </div>

      {providers.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiSearch size={30} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Specialists Found</h3>
          <p className="text-slate-400 text-sm mt-2">Try checking another category or refresh the page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {providers.map((p) => (
            // Hubi in p._id uu jiro ka hor intaanan card-ka dhisin
            p && <ProviderCard key={p._id} provider={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderList;