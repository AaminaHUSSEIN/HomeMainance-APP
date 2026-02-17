import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { FiCalendar, FiClock, FiMapPin, FiTool, FiAlertCircle } from 'react-icons/fi';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      // SAXID: Waxaan isticmaalaynaa jidka macmiilka u furan si looga fogaado Error 403
      const res = await api.get('/bookings/my-bookings');
      setBookings(res.data.data || []); 
    } catch (err) {
      console.error("Qalad xogta xaga keenista:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'rejected':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-amber-50 text-amber-600 border-amber-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Ballamahayga <span className="text-blue-600">Gaarka Ah</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2 italic">
              Waxaad qabsatay guud ahaan {bookings.length} ballan.
            </p>
          </div>
          <div className="hidden md:block">
             <FiAlertCircle className="text-slate-300" size={40} />
          </div>
        </header>

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <div className="bg-white p-16 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200 shadow-sm">
              <p className="text-slate-400 font-bold text-lg italic">Weli wax ballan ah ma aadan qabsan.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 transition hover:shadow-md hover:border-blue-100"
              >
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                      <FiTool size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                        {booking.service?.fullName || "Adeeg la dalbaday"}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400">ID: {booking._id.slice(-8).toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-slate-500 text-sm font-bold">
                    <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <FiCalendar className="text-blue-500" /> {booking.date || 'Lama cayimin'}
                    </span>
                    <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <FiClock className="text-blue-500" /> {booking.time || '10:00 AM'}
                    </span>
                    <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <FiMapPin className="text-blue-500" /> {booking.address || 'Address-ka lama hayo'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3 min-w-[150px] w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">
                    ${booking.totalPrice || 25}
                  </div>
                  
                  <span className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] border ${getStatusStyles(booking.status)}`}>
                    {booking.status || 'pending'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;