import React, { useState, useEffect } from 'react';
import api from '../services/api'; 

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        // SAXID: Macmiilku wuxuu xaq u leeyahay jidkan oo kaliya
        const res = await api.get('/bookings/my-bookings'); 
        setBookings(res.data.data || []);
      } catch (err) {
        console.error("Qalad xogta xaga keenista:", err);
      }
    };
    fetchMyData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ballamahayga</h1>
      {bookings.length === 0 ? (
        <p>Weli wax ballan ah ma qabsan.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 shadow mb-2 rounded-xl border">
            <h3>Adeegga: {b.service?.fullName || "Adeeg la dalbaday"}</h3>
            <p>Xaaladda: {b.status}</p>
            <p>Qiimaha: ${b.totalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingList;