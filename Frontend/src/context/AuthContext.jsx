import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService.js';
import api from '../services/api'; // Hubi inuu jiro faylkan api-ga ah
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser && savedUser !== "undefined") {
      try {
        setIsAuthenticated(true);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
    setIsLoading(false);
  }, []);

  // 1. LOGIN LOGIC
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response && response.token) {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Si guul leh ayaad u soo gashay!');
        return response;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login-ku ma suurtagalin');
      throw error;
    }
  };

  // 2. REGISTER LOGIC
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response && response.token && userData.role !== 'provider') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Diiwaangelintu waa guul!');
      } else if (userData.role === 'provider') {
        toast.success('Codsigaaga waa la diray, sug ansixinta adminka.');
      }
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Diiwaangelintu way fashilantay';
      toast.error(message);
      throw error;
    }
  };

  // 3. UPDATE USER LOGIC (KAN AYAA KAA MAQNAA)
  const updateUser = async (updatedData) => {
    try {
      // Halkan waxaan xogta u diraynaa backend-ka si loogu keydiyo DB-ga
      // Hubi in URL-ka backend-ka uu yahay /users/profile ama kan aad u dhisatay
      const response = await api.put('/users/profile', updatedData); 
      
      const newUserXog = response.data.user || response.data; // Xogta cusub ee soo noqotay

      // 1. Cusboonaysii State-ka React-ka
      setUser(newUserXog);
      // 2. Cusboonaysii LocalStorage-ka si haddii page-ka la refresh gareeyo xogtu u jiro
      localStorage.setItem('user', JSON.stringify(newUserXog));
      
      toast.success('Profile-ka waa la cusboonaysiiyey!');
      return newUserXog;
    } catch (error) {
      console.error("Update error:", error);
      toast.error('Laguma guulaysan in la beddelo profile-ka');
      throw error;
    }
  };

  // 4. LOGOUT LOGIC
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Si guul leh ayaad ka baxday!');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};