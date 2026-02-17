import express from 'express';
import { 
    getMyBookings, 
    createBooking, 
    getAllBookings,
    updateBookingStatus // Magacaan waa inuu la mid yahay kan Controller-ka
} from '../Controllers/controllerBooking.js';
import { protect, admin } from '../Middleware/auth.js'; 

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/all', protect, admin, getAllBookings); // Admin kaliya
router.put('/status/:id', protect, admin, updateBookingStatus); // Admin kaliya

export default router;