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

// 2. Habaynta __dirname (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
// Waxaan ku darnay 'Origin' si uusan browser-ku u xannibin XMLHttpRequest
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); 
app.use(express.json());

// 3. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch((err) => console.error("❌ Database Error:", err.message));

// 4. API Routes
app.use('/api/auth', userRoutes);      
app.use('/api/users', userRoutes);      
app.use('/api/services', serviceRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes); 

// 5. Serving Frontend (Static Files)
// Jidkan wuxuu aqrinayaa Frontend/dist
app.use(express.static(path.join(__dirname, 'Frontend/dist'))); 

// 6. Root Route (Handling Frontend Routing)
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'Frontend', 'dist', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            // Haddii uu kan soo baxo, hubi in 'npm run build' uu Railway-ga ku guulaystay
            res.status(500).send("Cillad: Ma la heli karo Frontend Build-ka. Fadlan hubi dhismaha Railway.");
        }
    });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ 
        success: false, 
        message: "Cillad farsamo ayaa dhacday!",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 5006;

// '0.0.0.0' waa lagama maarmaan marka la joogo Railway
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});