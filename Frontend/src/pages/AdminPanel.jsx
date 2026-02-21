import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity, FiShield, FiArrowLeft, FiGrid, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../services/api'; 
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeProviders: 0,
    pendingProviders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAdminData = async () => {
      try {
        setLoading(true);
        const [statsRes, dashboardRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/dashboard-stats')
        ]);

        const sData = statsRes.data.stats;
        const dData = dashboardRes.data.stats;

        setStats({
          totalUsers: sData.totalUsers || 0,
          activeProviders: sData.activeProviders || 0,
          pendingProviders: sData.pendingProviders || 0,
          totalBookings: dData.totalRequests || 0,
          totalRevenue: dData.totalSpent || 0
        });

      } catch (error) {
        console.error("Dashboard Error:", error);
        toast.error("Failed to fetch real-time analytics");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchAllAdminData();
    }
  }, [user]);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] px-6">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center border border-rose-50">
          <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <FiShield size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Access Denied</h2>
          <p className="text-slate-400 font-medium mb-10">You do not have the required permissions to view the admin console.</p>
          <Link to="/" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-sky-500 transition-all shadow-lg shadow-sky-100">
            <FiArrowLeft /> Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-500 border-opacity-20"></div>
            <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-t-4 border-sky-500 border-l-transparent border-r-transparent border-b-transparent"></div>
          </div>
          <p className="text-sky-600 font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">Synchronizing Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f9ff] py-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <FiActivity /> System Overview
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Admin <span className="text-sky-500 italic">Control</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-md">Real-time platform monitoring, financial analytics, and provider management.</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Authenticated as</p>
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-sky-100 shadow-sm">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="font-black text-slate-800 uppercase text-xs">{user?.name || 'Administrator'}</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <StatCard icon={FiUsers} title="Customers" value={stats.totalUsers} trend="+12.5%" color="bg-sky-500" />
          <StatCard icon={FiShoppingBag} title="Total Bookings" value={stats.totalBookings} trend="+8.2%" color="bg-indigo-500" />
          <StatCard icon={FiDollarSign} title="Total Revenue" value={`$${stats.totalRevenue}`} trend="+14.9%" color="bg-emerald-500" />
          <StatCard icon={FiActivity} title="Active Providers" value={stats.activeProviders} trend="+4.1%" color="bg-amber-500" />
        </div>

        {/* Management Sections */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* User Management */}
          <section className="bg-white rounded-[3.5rem] shadow-[0_30px_60px_rgba(186,230,253,0.25)] border border-white p-10 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="flex items-center gap-5 mb-10 relative">
              <div className="w-14 h-14 bg-sky-500 text-white rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-sky-100">
                <FiUsers size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">User <span className="text-sky-500">Core</span></h2>
            </div>
            
            <div className="space-y-5 relative">
              <AdminAction
                icon={FiShield}
                title="Verify Applications"
                description={`${stats.pendingProviders} professionals are waiting for review.`}
                link="/admin/verifications"
                badge={stats.pendingProviders > 0 ? stats.pendingProviders : null} 
              />
              <AdminAction
                icon={FiUsers}
                title="User Directory"
                description="Manage customer accounts and professional profiles."
                link="/admin/users"
              />
            </div>
          </section>

          {/* Service Management */}
          <section className="bg-white rounded-[3.5rem] shadow-[0_30px_60px_rgba(186,230,253,0.25)] border border-white p-10 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>

            <div className="flex items-center gap-5 mb-10 relative">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-emerald-100">
                <FiGrid size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Service <span className="text-emerald-500">Ops</span></h2>
            </div>

            <div className="space-y-5 relative">
              <AdminAction icon={FiShoppingBag} title="Service Inventory" description="Add, edit, or remove categories and service types." link="/admin/services" color="emerald" />
              <AdminAction icon={FiActivity} title="Global Bookings" description="Monitor and moderate all active service requests." link="/admin/bookings" color="emerald" />
            </div>
          </section>
        </div>

        <footer className="mt-20 text-center">
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">HomeCare Advanced Analytics • v2.0</p>
        </footer>
      </div>
    </div>
  );
};

// Refined StatCard
const StatCard = ({ icon: Icon, title, value, trend, color }) => (
    <div className="bg-white rounded-[2.5rem] shadow-[0_15px_40px_rgba(186,230,253,0.15)] border border-white p-8 hover:shadow-sky-200 transition-all duration-500 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white ${color} shadow-lg shadow-opacity-20 transform group-hover:rotate-6 transition-transform`}>
        <Icon size={28} />
      </div>
      <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-4xl font-black text-slate-900 tracking-tighter">{value}</p>
        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg">
          <FiTrendingUp size={12} /> {trend}
        </div>
      </div>
    </div>
  );
  
// Refined AdminAction
const AdminAction = ({ icon: Icon, title, description, link, badge, color = "sky" }) => (
    <Link to={link} className="group block p-6 bg-slate-50/50 rounded-[2.2rem] border border-slate-50 hover:bg-slate-900 transition-all duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className={`flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors`}>
            <Icon className={`text-${color}-500 group-hover:text-white transition-colors`} size={24} />
          </div>
          <div>
            <h3 className="font-black text-slate-900 group-hover:text-white transition-colors text-lg tracking-tight">{title}</h3>
            <p className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors font-bold uppercase tracking-tight">{description}</p>
          </div>
        </div>
        {badge ? (
          <span className="bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg shadow-rose-200 animate-pulse">
            {badge} NEW
          </span>
        ) : (
          <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-700 transition-colors">
             <FiArrowLeft className="rotate-180 text-slate-300" />
          </div>
        )}
      </div>
    </Link>
);

export default AdminPanel;