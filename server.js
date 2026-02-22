import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Soo dhoofinta Routes-ka
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/services.js';
import providerRoutes from './routes/providers.js';
import bookingRoutes from './routes/routeBooking.js'; 
import reviewRoutes from './routes/reviews.js'; 
import adminRoutes from './routes/adminRoutes.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// --- CORS POLICY ---
const allowedOrigins = [
    'https://homemainance-app-production.up.railway.app',
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS Policy: Origin not allowed'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// 2. Database Connection
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
    mongoose.connect(mongoURI)
        .then(() => console.log("✅ MongoDB Connected!"))
        .catch((err) => console.error("❌ Database Error:", err.message));
}

// 3. API Routes 
// Hubi in userRoutes gudihiisa uu jiro router.get('/providers')
app.use('/api/users', userRoutes);      
app.use('/api/services', serviceRoutes);
app.use('/api/providers_extra', providerRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes); 

// 4. Serving Frontend Static Files
// MUHIIM: static files waa in la horkeenaa '*' route-ka
const frontendPath = path.resolve(__dirname, 'Frontend', 'dist');
app.use(express.static(frontendPath)); 

// 5. Global Route Handler (Frontend Routing)
app.get('*', (req, res) => {
    // Haddii URL-ku ku bilaabmo /api/ laakiin aan kor lagu qaban, waa API 404 dhab ah
    if (req.url.startsWith('/api/')) {
        return res.status(404).json({ 
            success: false, 
            message: `API Route ${req.url} lama helin. Hubi Route-kaaga.` 
        });
    }
    
    // Haddii kale, u dir index.html si React Router u xalliyo
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
        if (err) {
            res.status(500).send("Frontend dist folder lama helin. Run 'npm run build'.");
        }
    });
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});