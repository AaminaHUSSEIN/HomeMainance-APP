import api from './api';

const adminService = {
    // Helitaanka xogta guud (Stats)
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data.data; 
    },
    // Helitaanka xirfadlayaasha sugaya ansixinta
    getPendingProviders: async () => {
        const response = await api.get('/admin/providers/pending');
        return response.data.data;
    }
};

export default adminService;