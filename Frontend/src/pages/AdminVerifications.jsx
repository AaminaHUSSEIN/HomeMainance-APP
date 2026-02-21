import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FiCheck, FiX, FiUser, FiPhone, FiMail, FiArrowLeft, FiShield, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminVerifications = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProviders();
  }, []);

  const fetchPendingProviders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/pending-providers');
      if (res.data.success) {
        setPendingProviders(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await api.put(`/admin/approve-provider/${id}`);
      if (res.data.success) {
        toast.success("Provider has been approved! ✨");
        fetchPendingProviders();
      }
    } catch (err) {
      toast.error("Error occurred during approval");
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      try {
        const res = await api.delete(`/admin/reject-provider/${id}`);
        if (res.data.success) {
          toast.error("Application rejected");
          fetchPendingProviders();
        }
      } catch (err) {
        toast.error("An error occurred");
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        <p className="text-sky-600 font-black uppercase text-[10px] tracking-[0.2em]">Loading Requests...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0f9ff] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <Link to="/admin" className="inline-flex items-center gap-2 text-sky-600 font-black text-xs uppercase tracking-widest mb-10 hover:text-slate-900 transition-all group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-sky-100 pb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              Provider <span className="text-sky-500 italic">Verifications</span>
            </h1>
            <p className="text-slate-400 font-medium flex items-center gap-2 italic">
              <FiShield className="text-sky-400" /> Review and verify new professional accounts.
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-sky-100 shadow-sm">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block">Pending Count</span>
            <span className="text-2xl font-black text-sky-600 leading-none">{pendingProviders.length} Requests</span>
          </div>
        </div>

        {/* Main Content */}
        {pendingProviders.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md p-20 rounded-[3.5rem] text-center border-2 border-dashed border-sky-200">
            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiAlertCircle className="text-sky-300" size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No new applications at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {pendingProviders.map((provider) => (
              <div key={provider._id} className="group bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(186,230,253,0.15)] border border-white hover:border-sky-100 transition-all duration-500 flex flex-col lg:flex-row justify-between items-center gap-8">
                
                {/* Profile Info */}
                <div className="flex items-center gap-6 flex-1">
                  <div className="w-20 h-20 bg-sky-50 text-sky-500 rounded-[1.8rem] flex items-center justify-center shadow-inner group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                    <FiUser size={35} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase">
                      {provider.fullName || provider.name}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <FiMail className="text-sky-400" /> {provider.email}
                      </span>
                      <span className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <FiPhone className="text-sky-400" /> {provider.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 w-full lg:w-auto">
                  <button 
                    onClick={() => handleApprove(provider._id)}
                    className="flex-1 lg:flex-none bg-sky-500 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-sky-100 group/btn"
                  >
                    <FiCheck size={18} className="group-hover/btn:scale-125 transition-transform" /> Approve
                  </button>
                  <button 
                    onClick={() => handleReject(provider._id)}
                    className="flex-1 lg:flex-none bg-white text-rose-500 border border-rose-100 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <FiX size={18} /> Reject
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Footer info */}
        <p className="text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] mt-20">
          Admin Control Center • HomeCare Elite 2026
        </p>
      </div>
    </div>
  );
};

export default AdminVerifications;