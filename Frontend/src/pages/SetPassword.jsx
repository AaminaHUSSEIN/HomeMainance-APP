import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiLock, FiMail, FiShield } from 'react-icons/fi';

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/set-initial-password', { email, password });
      toast.success("Password set successfully! You can now log in.");
      navigate('/login');
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
      {/* Background Decorative Circles */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="w-full max-w-md p-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white p-10">
          
          {/* Header Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 rotate-3 group hover:rotate-0 transition-transform duration-300">
              <FiShield size={32} />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Set Password</h2>
            <p className="text-slate-400 font-medium mt-2">Secure your account to get started</p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Email Display (Read-only look) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FiMail size={20} />
              </div>
              <div className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-medium text-sm">
                {email || 'user@example.com'}
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-500">
                <FiLock size={20} />
              </div>
              <input 
                type="password" 
                placeholder="New Secure Password" 
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all duration-300 font-medium"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              className={`w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600 hover:shadow-indigo-200'}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Save & Continue</>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <p className="text-center mt-8 text-xs text-slate-400 font-bold uppercase tracking-widest">
            Protected by Industry Standard Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;