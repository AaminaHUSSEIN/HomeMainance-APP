import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProvider = async () => {
      try {
        setLoading(true);
        // Hubi in URL-ku waafaqsan yahay backend-kaaga
        const res = await axios.get(`http://localhost:5006/api/users/provider/${id}`);
        
        if (res.data.success) {
          setProvider(res.data.data);
          // Debug: Ka saar comment-ka hoose haddii aad rabto inaad aragto xogta soo dhacaysa
          // console.log("Provider Data:", res.data.data);
        }
      } catch (error) {
        console.error("Qalad ayaa dhacay:", error.response?.status);
      } finally {
        setLoading(false);
      }
    };
    loadProvider();
  }, [id]);

  if (loading) return <div className="text-center py-20 font-bold text-blue-600">Soo raryaa...</div>;
  
  if (!provider) return (
    <div className="text-center py-20 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">Provider Not Found</h2>
      <p className="text-slate-500 mt-2 mb-6">Xogta khabiirkan lama helin. Fadlan dib u tijaabi.</p>
      <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold uppercase text-xs tracking-widest">Dib u noqo</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-[2.5rem] mt-10 border border-slate-50">
      <div className="flex items-center space-x-6">
        {/* Profile Avatar */}
        <div className="w-24 h-24 bg-blue-600 rounded-[1.8rem] flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-blue-100 uppercase">
          {provider.name?.charAt(0)}
        </div>
        
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">{provider.name}</h1>
          <p className="text-blue-600 font-black uppercase text-[10px] tracking-[0.2em] mt-1">
             {provider.serviceType || "Professional Specialist"}
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-6 border-t border-slate-50 pt-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Location Box */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-transparent hover:border-blue-100 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
            <p className="font-bold text-slate-800 flex items-center gap-2">
              <span className="text-pink-500">📍</span> 
              {provider.location || "Location-ka lama hayo"}
            </p>
          </div>

          {/* Phone Box */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-transparent hover:border-blue-100 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
            <p className="font-bold text-slate-800 flex items-center gap-2">
              <span className="text-pink-500">📞</span> 
              {provider.phone || "Number-ka lama hayo"}
            </p>
          </div>
        </div>

        {/* Bio/About Section */}
        <div className="bg-slate-50 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">About & Bio</p>
          <p className="text-slate-600 leading-relaxed italic">
            {provider.bio || "Khabiirkan weli ma soo kabsan faahfaahintiisa gaarka ah."}
          </p>
        </div>
      </div>

      {/* Booking Button - Hubi inuu isticmaalayo _id */}
      <button 
        onClick={() => navigate(`/book-service/${provider._id || provider.id}`)}
        className="w-full mt-10 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
      >
        Book Appointment Now
      </button>
    </div>
  );
};

export default ProviderProfile;