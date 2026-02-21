import React, { useState, useEffect } from 'react'; 
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService'; 
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiCheck, FiX, FiActivity, FiCalendar, FiArrowRight, FiShield } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please provide your service location'),
});

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  });

  useEffect(() => {
    const fetchLastBooking = async () => {
      try {
        const res = await bookingService.getUserBookings();
        if (res.data && res.data.length > 0) {
          setLastBooking(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
      }
    };
    if (user) fetchLastBooking();
  }, [user]);

  useEffect(() => {
    reset({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUser({ ...user, ...data });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile settings.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-2 border-indigo-600/10 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Syncing Profile</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-24 font-sans">
      {/* --- MINIMAL HEADER --- */}
      <div className="bg-white border-b border-slate-100 pt-20 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-slate-200">
                  {user.name?.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full"></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{user.name}</h1>
                <div className="flex items-center gap-2 mt-1 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <FiShield className="text-indigo-600" /> Verified Resident Member
                </div>
              </div>
            </div>
            
            <Link to="/my-bookings" className="group flex items-center gap-4 bg-slate-50 border border-slate-100 p-2 pr-6 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-90 transition-transform">
                <FiCalendar className="text-indigo-600" />
              </div>
              <div>
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Schedule</p>
                <p className="text-slate-900 font-black text-sm flex items-center gap-2">View Bookings <FiArrowRight /></p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* --- SETTINGS SIDEBAR --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personal Details</h2>
                  <p className="text-slate-400 font-medium text-sm">Manage your contact and delivery info</p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                    <FiEdit2 size={20} />
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput label="Full Name" register={register('name')} error={errors.name} icon={FiUser} />
                    <FormInput label="Phone Number" register={register('phone')} error={errors.phone} icon={FiPhone} />
                  </div>
                  <FormInput label="Service Address" register={register('address')} error={errors.address} icon={FiMapPin} placeholder="e.g. Hargeisa, Jigjiga Yar" />

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-slate-900 text-white py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <FiActivity className="animate-spin" /> : <FiCheck size={18} />} Update Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsEditing(false); reset(); }}
                      className="px-8 bg-slate-50 text-slate-400 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-y-12 gap-x-8">
                  <InfoBlock icon={FiUser} label="Legal Name" value={user.name} />
                  <InfoBlock icon={FiMail} label="Email Address" value={user.email} />
                  <InfoBlock icon={FiPhone} label="Contact" value={user.phone || 'Not provided'} />
                  <InfoBlock icon={FiMapPin} label="Home Location" value={user.address || 'Address pending'} />
                </div>
              )}
            </div>
          </div>

          {/* --- RECENT ACTIVITY SIDEBAR --- */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-slate-200 sticky top-8">
              <h3 className="text-xl font-black tracking-tight mb-8">Activity Status</h3>
              
              {lastBooking ? (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center">
                        <FiActivity size={20} />
                      </div>
                      <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                        lastBooking.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/10 border-white/10 text-slate-400'
                      }`}>
                        {lastBooking.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Latest Request</p>
                    <p className="text-lg font-bold leading-tight mb-4">{lastBooking.service?.fullName || "Professional Service"}</p>
                    <Link to="/my-bookings" className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-white transition-colors">
                      Track Progress <FiArrowRight />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 opacity-30">
                  <FiCalendar className="mx-auto mb-4" size={40} />
                  <p className="text-xs font-bold uppercase tracking-widest">No recent bookings</p>
                </div>
              )}
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center">Member Since 2026</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS FOR CLEANER CODE --- */

const FormInput = ({ label, register, error, icon: Icon, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase tracking-widest ml-4 text-slate-400">{label}</label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">
        <Icon size={18} />
      </div>
      <input
        {...register}
        placeholder={placeholder}
        className={`w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-indigo-600/20 focus:ring-4 focus:ring-indigo-600/5 ${error ? 'border-red-500/20 bg-red-50' : ''}`}
      />
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold ml-4">{error.message}</p>}
  </div>
);

const InfoBlock = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-5 group">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
      <Icon size={22} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none">{label}</p>
      <p className="text-base font-black text-slate-900 tracking-tight truncate">{value}</p>
    </div>
  </div>
);

export default ProfilePage;