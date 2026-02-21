import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar'; 

// Pages
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Dashboard from './pages/Dashboard';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import ProviderList from './components/providers/ProviderList';
import ProviderProfile from './components/providers/ProviderProfile';
import BookingsPage from './pages/BookingsPage'; 
import MyBookings from './pages/MyBookings'; // 1. WAA LAGU SOO DARAY
import BookingForm from './components/bookings/BookingForm';

// Admin Pages
import AdminPanel from './pages/AdminPanel';
import AdminVerifications from './pages/AdminVerifications';

// Context
import { AuthContext } from './context/AuthContext';

// --- PROTECTED ROUTE (User) ---
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// --- ADMIN ROUTE ---
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isAuthenticated && user?.role === 'admin') {
    return children;
  }
  return <Navigate to="/dashboard" replace />;
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased bg-[#f8fafc]">
      <Toaster position="top-right" />
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 relative overflow-x-hidden">
        {isAuthenticated && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main className={`flex-grow transition-all duration-300 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <div className="p-4 md:p-8">
            <Routes>
              {/* --- PUBLIC ROUTES --- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/services" element={<ServicesPage />} />
              <Route path="/providers" element={<ProviderList />} />
              <Route path="/provider-profile/:id" element={<ProviderProfile />} />

              {/* --- PROTECTED USER ROUTES --- */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              
              <Route 
                path="/book-service/:providerId" 
                element={<ProtectedRoute><BookingForm /></ProtectedRoute>} 
              />

              {/* 2. JIDKA CUSUB EE MACMIILKA (Si looga fogaado Error 403) */}
              <Route 
                path="/my-bookings" 
                element={<ProtectedRoute><MyBookings /></ProtectedRoute>} 
              />

              {/* --- ADMIN ONLY ROUTES --- */}
              <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
              <Route path="/admin/verifications" element={<AdminRoute><AdminVerifications /></AdminRoute>} />
              
              <Route 
                path="/admin/bookings" 
                element={<AdminRoute><BookingsPage isAdminView={true} /></AdminRoute>} 
              />

              {/* FALLBACK */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;