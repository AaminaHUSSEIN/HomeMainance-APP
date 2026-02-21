import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { FiCalendar, FiMapPin, FiTool, FiCheckCircle, FiCheck, FiX, FiPauseCircle, FiRotateCcw, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings/all'); 
      setBookings(res.data.data || []); 
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/bookings/status/${id}`, { status: newStatus });
      
      const messages = {
        approved: "Booking has been approved! ✅",
        completed: "Work confirmed as completed! 💰",
        rejected: "Booking has been rejected. ❌",
        cancelled: "Work has been paused. ⏸️",
        pending: "Booking has been reset to pending."
      };
      
      toast.success(messages[newStatus] || "Update successful");
      fetchBookings(); 
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'approved': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-amber-50 text-amber-600 border-amber-200';
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
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Booking <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2 italic">
            There are total {bookings.length} bookings in the system.
          </p>
        </header>

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className={`bg-white p-8 rounded-[2rem] shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all ${booking.status === 'rejected' ? 'opacity-75' : ''}`}>
              
              <div className="flex-1 w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${booking.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                    {booking.status === 'completed' ? <FiCheckCircle size={24} /> : <FiTool size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 uppercase">{booking.service?.fullName || "Service Requested"}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Customer: {booking.userId?.name || 'Customer'}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-slate-500 text-sm font-bold mb-4">
                  <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <FiCalendar className="text-blue-500" /> {booking.date || 'Not set'}
                  </span>
                  <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <FiMapPin className="text-blue-500" /> {booking.address || 'Location'}
                  </span>
                </div>

                {/* --- NEW: TRANSACTION ID SECTION --- */}
                {booking.transactionId && (
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl inline-flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
                      <FiDollarSign size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Transaction ID (Payment Proof)</p>
                      <p className="text-sm font-black text-blue-700">{booking.transactionId}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center md:items-end gap-4 min-w-[220px] w-full md:w-auto">
                <div className="text-3xl font-black text-slate-900">${booking.totalPrice || 25}</div>
                
                <div className="flex flex-col gap-2 w-full">
                  <span className={`px-4 py-2 rounded-xl text-[10px] text-center font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>
                    {booking.status === 'cancelled' ? '⏸️ PAUSED' : booking.status === 'rejected' ? '❌ REJECTED' : booking.status}
                  </span>

                  {booking.status === 'pending' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleUpdateStatus(booking._id, 'approved')} className="bg-blue-600 text-white py-2 rounded-xl font-bold text-[10px] uppercase hover:bg-blue-700 transition-all flex items-center justify-center gap-1"><FiCheck /> Approve</button>
                      <button onClick={() => handleUpdateStatus(booking._id, 'rejected')} className="bg-red-600 text-white py-2 rounded-xl font-bold text-[10px] uppercase hover:bg-red-700 transition-all flex items-center justify-center gap-1"><FiX /> Reject</button>
                    </div>
                  )}

                  {booking.status === 'approved' && (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => handleUpdateStatus(booking._id, 'completed')}
                        className={`w-full py-3 rounded-xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-2 ${booking.transactionId ? 'bg-green-600 text-white shadow-lg shadow-green-100 hover:bg-green-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        disabled={!booking.transactionId}
                      >
                        {booking.transactionId ? '✅ Done & Paid' : '⏳ Waiting for Payment'}
                      </button>
                      <button onClick={() => handleUpdateStatus(booking._id, 'cancelled')} className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-bold text-[10px] uppercase hover:bg-gray-300 flex items-center justify-center gap-1"><FiPauseCircle /> Pause Work</button>
                    </div>
                  )}
                  
                  {(booking.status === 'rejected' || booking.status === 'cancelled') && (
                    <button onClick={() => handleUpdateStatus(booking._id, 'pending')} className="w-full border-2 border-dashed border-blue-200 text-blue-600 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-blue-50 flex items-center justify-center gap-2"><FiRotateCcw /> Re-open Booking</button>
                  )}

                  {booking.status === 'completed' && (
                    <p className="text-[9px] text-green-600 font-black text-center uppercase tracking-tighter">This task is closed and completed successfully</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;