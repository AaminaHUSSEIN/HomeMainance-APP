import React, { useState, useEffect } from 'react'; 
import { useSearchParams } from 'react-router-dom';
import { providerService } from '../../services/providerService';
import { useAuth } from '../../context/AuthContext';
import ProviderCard from './ProviderCard';
import { FiSearch } from 'react-icons/fi';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 
  const [searchParams] = useSearchParams();

  // Ka soo saar URL-ka ID-ga iyo magaca adeegga
  const serviceIdFromUrl = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceType');

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        
        /**
         * 1. Haddii uu yahay Admin, fetchId waa null (si uu dhamaan u keeno).
         * 2. Haddii uu yahay Customer, fetchId waa ID-ga adeegga uu riixay.
         */
        const fetchId = user?.role === 'admin' ? null : serviceIdFromUrl;
        
        // Backend-ka ayaa hadda mas'uul ka ah soo shaandhaynta (Filtering)
        const data = await providerService.getAll(fetchId);
        
        // Si toos ah u deji xogta ka timid Backend-ka
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
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-xl font-bold text-slate-600">Waa la soo raryaa...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black text-slate-900">
          {user?.role === 'admin' ? "Maamulista Khubarada" : `Khubarada ${serviceName || ''}`}
        </h1>
        {providers.length > 0 && (
          <span className="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-2 rounded-full">
            {providers.length} Khubaro ayaa la helay
          </span>
        )}
      </div>

      {providers.length === 0 ? (
        <div className="py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <FiSearch size={60} className="mx-auto text-slate-300 mb-6" />
          <h3 className="text-2xl font-black text-slate-800">
            Ma jiro khabiir hadda u diyaarsan {serviceName || 'adeegan'}
          </h3>
          <p className="text-slate-500 mt-2">Fadlan dib u soo eeg waqti kale ama dooro adeeg kale.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <ProviderCard key={provider._id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderList;