import api from './api';

const bookingService = {
  /**
   * 1. In ballan cusub la abuuro
   */
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data?.data || response.data || response;
  },

  /**
   * 2. MUHIIM: Waxaa loo isticmaalaa Dashboard-ka
   */
  getMyBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    // Hubi inaan soo celinno array-ga ballamaha
    return response.data?.data || response.data || [];
  },

  /**
   * 3. SAXIDDA TYPEERROR: Magaca function-kan waa inuu la mid noqdaa kan BookingsPage
   */
  getUserBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data?.data || response.data || [];
  },

  /**
   * 4. In la soo rido ballan gaar ah
   */
  getById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data?.data || response.data || response;
  },

  /**
   * 5. In la beddelo xaaladda ballanta
   */
  updateStatus: async (id, status) => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data?.data || response.data || response;
  }
};

// Waxaan u dhoofinaynaa labada qaab si looga fogaado import errors
export { bookingService };
export default bookingService;