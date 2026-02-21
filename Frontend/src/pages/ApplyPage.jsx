import React, { useState } from 'react';
import { authService } from '../services/authService';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting your application...");
    try {
      const response = await authService.applyAsProvider(formData);
      if (response.success) {
        toast.success(response.message || "Application sent successfully!", { id: loadingToast });
        setFormData({ fullName: '', email: '', phone: '', serviceType: '', location: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] py-16 px-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-sky-500 clip-path-slant opacity-10 pointer-events-none"></div>
      
      <div className="max-w-xl w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-[0_30px_100px_rgba(186,230,253,0.4)] border border-white relative">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-3xl text-sky-600 mb-2">
            <FiBriefcase size={32} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Join the <span className="text-sky-500 italic">Elite</span>
          </h2>
          <p className="text-slate-400 font-medium">Apply today to become a certified service provider.</p>
        </div>
        
        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-500 transition-colors">
              <FiUser />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              required
              className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-200 focus:bg-white focus:border-sky-400 outline-none transition-all font-medium text-slate-700"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-500 transition-colors">
                <FiMail />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                required
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-200 focus:bg-white focus:border-sky-400 outline-none transition-all font-medium text-slate-700"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Phone */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-500 transition-colors">
                <FiPhone />
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                required
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-200 focus:bg-white focus:border-sky-400 outline-none transition-all font-medium text-slate-700"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-500 transition-colors">
              <FiBriefcase />
            </div>
            <select 
              className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-200 focus:bg-white focus:border-sky-400 outline-none transition-all font-medium text-slate-700 appearance-none"
              value={formData.serviceType}
              onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
              required
            >
              <option value="">Select Your Service</option>
              <option value="Plumbing">Plumbing (Tuubiste)</option>
              <option value="Electrical">Electrical (Laydh)</option>
              <option value="Cleaning">Cleaning (Nadiifin)</option>
              <option value="Painting">Painting (Rinjiyayn)</option>
              <option value="Repairs">General Repairs (Dayactir)</option>
            </select>
          </div>

          {/* Location */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-500 transition-colors">
              <FiMapPin />
            </div>
            <input
              type="text"
              placeholder="Your Location (City/District)"
              value={formData.location}
              required
              className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-200 focus:bg-white focus:border-sky-400 outline-none transition-all font-medium text-slate-700"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-5 px-4 bg-sky-500 text-white rounded-[2rem] hover:bg-slate-900 transition-all duration-500 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-sky-100 flex items-center justify-center gap-3 group"
          >
            Submit Application <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
          By applying, you agree to our professional terms of service.
        </p>
      </div>

      <style>{`
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default ApplyPage;