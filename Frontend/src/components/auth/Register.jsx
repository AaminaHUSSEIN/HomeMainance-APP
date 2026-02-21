import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { FiBriefcase, FiTool, FiUser, FiPhone, FiMail, FiMapPin, FiLock, FiCheckCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Min 10 digits'),
  role: z.enum(['customer', 'provider']).default('customer'),
  serviceType: z.string().optional(),
  location: z.string().min(3, 'Location is required'),
  bio: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Register = () => {
  const { register: submitUser } = useAuth(); 
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'customer' }
  });

  const selectedRole = watch('role');
  const isProvider = selectedRole === 'provider';

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await submitUser(userData);

      if (isProvider) {
        toast.success("Professional application submitted!");
        navigate('/pending-approval'); 
      } else {
        toast.success("Registration successful!");
        navigate('/services'); 
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || "Server connection failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] py-20 px-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-sky-200/40 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-[600px] w-full bg-white/80 backdrop-blur-xl rounded-[3.5rem] shadow-[0_40px_100px_rgba(186,230,253,0.3)] border border-white p-10 md:p-14 relative">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500 text-white rounded-[1.5rem] shadow-lg shadow-sky-200 mb-6">
            {isProvider ? <FiTool size={30} /> : <FiUser size={30} />}
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            {isProvider ? 'Partner ' : 'Create '} 
            <span className="text-sky-500 italic">{isProvider ? 'Join' : 'Account'}</span>
          </h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Start your journey with HomeCare Elite</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Role Selection */}
          <div className="relative group">
            <FiBriefcase className="absolute left-5 top-5 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
            <select {...register('role')} className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[1.8rem] font-bold outline-none ring-sky-100 focus:ring-4 transition-all appearance-none text-slate-700">
              <option value="customer">Customer (Looking for services)</option>
              <option value="provider">Professional (Offering services)</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative group">
              <FiUser className="absolute left-5 top-5 text-slate-300 group-focus-within:text-sky-500" size={18} />
              <input {...register('name')} placeholder="Full Name" className="w-full pl-14 pr-4 py-5 bg-slate-50 rounded-[1.8rem] font-bold border-none focus:ring-4 ring-sky-100 transition-all" />
              {errors.name && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-4">{errors.name.message}</p>}
            </div>
            <div className="relative group">
              <FiPhone className="absolute left-5 top-5 text-slate-300 group-focus-within:text-sky-500" size={18} />
              <input {...register('phone')} placeholder="Phone Number" className="w-full pl-14 pr-4 py-5 bg-slate-50 rounded-[1.8rem] font-bold border-none focus:ring-4 ring-sky-100 transition-all" />
              {errors.phone && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-4">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="relative group">
            <FiMail className="absolute left-5 top-5 text-slate-300 group-focus-within:text-sky-500" size={18} />
            <input {...register('email')} type="email" placeholder="Email Address" className="w-full pl-14 pr-4 py-5 bg-slate-50 rounded-[1.8rem] font-bold border-none focus:ring-4 ring-sky-100 transition-all" />
            {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-4">{errors.email.message}</p>}
          </div>

          <div className="relative group">
            <FiMapPin className="absolute left-5 top-5 text-slate-300 group-focus-within:text-sky-500" size={18} />
            <input {...register('location')} placeholder="Your Location (City/Region)" className="w-full pl-14 pr-4 py-5 bg-slate-50 rounded-[1.8rem] font-bold border-none focus:ring-4 ring-sky-100 transition-all" />
            {errors.location && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-4">{errors.location.message}</p>}
          </div>

          {/* Provider Specific Section */}
          {isProvider && (
            <div className="p-8 bg-sky-50/50 border border-sky-100 rounded-[2.5rem] space-y-4 animate-in fade-in zoom-in duration-300">
              <label className="text-[10px] font-black uppercase text-sky-600 tracking-[0.3em] flex items-center px-2">
                <FiCheckCircle className="mr-2" /> Professional Profile
              </label>
              <select {...register('serviceType')} className="w-full p-4 bg-white rounded-2xl font-bold outline-none border-none shadow-sm text-slate-700">
                <option value="">Select Specialty</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Carpentry">Carpentry</option>
              </select>
              <textarea {...register('bio')} placeholder="Describe your professional experience..." className="w-full p-4 bg-white rounded-2xl font-bold h-24 border-none outline-none shadow-sm resize-none" />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative group">
              <FiLock className="absolute left-5 top-5 text-slate-300 group-focus-within:text-sky-500" size={18} />
              <input {...register('password')} type="password" placeholder="Password" className="w-full pl-14 pr-4 py-5 bg-slate-50 rounded-[1.8rem] font-bold border-none focus:ring-4 ring-sky-100 transition-all" />
              {errors.password && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-4">{errors.password.message}</p>}
            </div>
            <div className="relative group">
              <FiLock className="absolute left-5 top-5 text-slate-300 group-focus-within:text-sky-500" size={18} />
              <input {...register('confirmPassword')} type="password" placeholder="Confirm" className="w-full pl-14 pr-4 py-5 bg-slate-50 rounded-[1.8rem] font-bold border-none focus:ring-4 ring-sky-100 transition-all" />
              {errors.confirmPassword && <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-4">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-sky-500 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-sky-100 active:scale-95 disabled:opacity-50 mt-4"
          >
            {isSubmitting ? 'Securing Profile...' : 'Complete Registration'}
          </button>
          
          <p className="text-center text-slate-400 font-bold text-xs pt-4">
            Already a member? <Link to="/login" className="text-sky-500 underline underline-offset-8 decoration-2 hover:text-slate-900">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;