import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import serviceService from '../../services/serviceService';
import reviewService from '../../services/reviewService';
import bookingService from '../../services/bookingService';

import { FiArrowLeft, FiStar, FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiActivity, FiShield, FiTag, FiZap } from 'react-icons/fi';
import ReviewList from '../reviews/ReviewList';
import ReviewForm from '../reviews/ReviewForm';
import { useForm } from 'react-hook-form';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServiceData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await serviceService.getById(id);
      setService(response.data || response); 

      if (reviewService && typeof reviewService.getByService === 'function') {
        const reviewsResponse = await reviewService.getByService(id);
        const reviewsData = reviewsResponse.data || reviewsResponse;
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      }
    } catch (error) {
      console.error('Error loading service details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadServiceData();
    }
  }, [id, loadServiceData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmitBooking = async (data) => {
    try {
      const bookingData = {
        serviceId: id,
        date: data.date,
        time: data.time,
        address: data.address,
        totalPrice: service?.price || 0,
      };
      
      await bookingService.create(bookingData);
      alert('Booking successfully created!');
      reset();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred during booking';
      alert(`Error: ${errorMsg}`);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-sky-500/10 border-t-sky-500 rounded-[2rem] animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FiZap className="text-sky-500 animate-pulse" size={24} />
        </div>
      </div>
      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Synchronizing Data</p>
    </div>
  );

  if (!service) return (
    <div className="container py-32 text-center bg-white rounded-[3rem] mt-10 shadow-xl mx-auto max-w-2xl">
      <FiShield size={60} className="mx-auto text-slate-200 mb-6" />
      <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Protocol Not Found</h2>
      <p className="text-slate-500 mt-2 mb-8 font-medium">The requested service ID does not exist in our active directory.</p>
      <button onClick={() => navigate('/services')} className="bg-sky-500 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all">
        Return to Directory
      </button>
    </div>
  );

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length 
    : 0;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Dynamic Midnight Header */}
      <div className="bg-[#020617] pt-16 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <button onClick={() => navigate('/services')} className="group flex items-center gap-4 text-white/40 hover:text-white transition-all">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-sky-500 group-hover:border-sky-400 transition-all">
               <FiArrowLeft size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Service Archives</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 max-w-7xl relative z-20">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Service Intelligence */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Primary Info Card */}
            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-sky-50">
              <div className="flex flex-wrap justify-between items-start gap-8 mb-12">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-sky-50 text-sky-500 rounded-lg"><FiShield size={14}/></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500">Verified Protocol</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                    {service.fullName || service.name}
                  </h1>
                </div>
                
                <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 text-center min-w-[180px]">
                  <p className="text-[9px] font-black text-sky-400 uppercase tracking-[0.3em] mb-2 text-center w-full">Fixed Rate</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl font-black text-white/40 mt-2">$</span>
                    <span className="text-5xl font-black text-white tracking-tighter">{service.price || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 mb-12 py-6 border-y border-slate-50">
                <div className="flex items-center gap-3 bg-amber-50 px-5 py-2.5 rounded-2xl">
                  <FiStar className="text-amber-500 fill-current" />
                  <span className="text-lg font-black text-slate-900">{averageRating.toFixed(1)}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-amber-200 pl-3">
                    {reviews.length} Insights
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                  <FiCheckCircle className="text-emerald-500" size={18} /> 
                  Premium Assurance Guarantee
                </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <FiTag className="text-sky-500" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Service Specifications</h3>
                 </div>
                 <p className="text-slate-500 text-xl leading-relaxed font-medium">
                   {service.description || "The technical details for this protocol are currently being updated by our specialist network."}
                 </p>
              </div>
            </div>

            {/* Premium Booking Engine */}
            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-sky-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 text-sky-500/5 rotate-12 -z-0">
                <FiCalendar size={200} />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter uppercase">Deployment <span className="text-sky-500">Scheduler</span></h2>
                <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] ml-4 text-slate-400">Execution Date</label>
                      <input type="date" {...register('date', { required: true })} className="w-full p-6 bg-slate-50 border-none rounded-3xl font-black text-slate-900 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] ml-4 text-slate-400">Operational Window</label>
                      <input type="time" {...register('time', { required: true })} className="w-full p-6 bg-slate-50 border-none rounded-3xl font-black text-slate-900 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] ml-4 text-slate-400">Mission Address</label>
                     <div className="relative">
                        <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-sky-500" size={20} />
                        <input type="text" {...register('address', { required: true })} placeholder="Street, Building, Suite No." className="w-full p-6 pl-16 bg-slate-50 border-none rounded-3xl font-black text-slate-900 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none placeholder:text-slate-300" />
                     </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full h-24 bg-[#020617] text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 hover:bg-sky-500 hover:shadow-2xl hover:shadow-sky-100 transition-all active:scale-95 disabled:opacity-50">
                    {isSubmitting ? 'Syncing Request...' : 'Initialize Professional Booking'}
                    <FiArrowLeft className="rotate-180" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Performance Sidebar */}
          <div className="space-y-10">
            {/* Feed Sidebar */}
            <div className="bg-white p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.02)] border border-sky-50">
              <div className="flex flex-col mb-10">
                <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.4em] mb-2">Public Records</span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Client <span className="text-sky-400 italic">Feed</span></h2>
              </div>
              <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                <ReviewList reviews={reviews} />
              </div>
            </div>

            {/* Submission Sidebar */}
            <div className="bg-[#020617] p-2 rounded-[3.5rem] shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                    <FiZap size={18} />
                  </div>
                  <h3 className="font-black text-[11px] text-white uppercase tracking-[0.3em]">Log Experience</h3>
                </div>
                <ReviewForm serviceId={id} onReviewAdded={loadServiceData} />
              </div>
              
              {/* Background accent for review form */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 blur-3xl -z-0"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;