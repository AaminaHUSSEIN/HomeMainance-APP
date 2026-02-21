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

// --- TALLAABADA MUHIIMKA AH: CORS (Hagaajinta ugu dambaysa) ---
const allowedOrigins = [
    'https://homemainance-app-production.up.railway.app',
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Oggolow haddii origin-ku ku jiro liiska ama haddii uu yahay isla server-ka (undefined)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Talo: Haddii aad rabto inaad wada oggolaato dhammaan inta aad tijaabada ku jirto, 
            // isticmaal `callback(null, true)` halkii aad error ka bixin lahayd.
            callback(new Error('CORS Policy: Origin not allowed by Security'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// 3. Database Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("❌ ERROR: MONGO_URI is missing in environment variables!");
}

mongoose.connect(mongoURI)
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
const frontendPath = path.resolve(__dirname, 'Frontend', 'dist');
app.use(express.static(frontendPath)); 

// 6. Root Route (Handling Frontend Routing)
app.get('*', (req, res) => {
    // Haddii codsigu yahay API, laakiin aan la helin (404 API)
    if (req.url.startsWith('/api/')) {
        return res.status(404).json({ message: "API route not found" });
    }
    
    const indexPath = path.join(frontendPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(500).send("Cillad: Ma la heli karo Frontend Build-ka. Hubi folder-ka Frontend/dist.");
        }
    });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error Stack:", err.stack);
    res.status(err.status || 500).json({ 
        success: false, 
        message: err.message || "Cillad farsamo ayaa dhacday!"
    });
});

const PORT = process.env.PORT || 5006;

// MUHIIM: '0.0.0.0' ayaa u ogolaanaya Railway inuu banaanka u saaro port-ka
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});