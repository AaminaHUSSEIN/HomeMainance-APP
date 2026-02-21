import api from './api';

const providerService = {
    /**
     * Waxaan u oggolaanaynaa serviceId inuu noqdo mid ikhiyaari ah.
     * Haddii la soo diro, Backend-ka ayaa soo filter-gareynaya.
     */
    getAll: async (serviceId = null) => {
        try {
            // Waxaan isticmaalaynaa 'params' si Axios uu si nidaamsan ugu daro ?serviceId=...
            const response = await api.get('/users/all-providers', {
                params: serviceId ? { serviceId } : {}
            });
            
            // Hubi in response.data.data ay tahay meesha xogtu ku jirto (sida sawiradaadu tuseen)
            return response.data.data || []; 
        } catch (error) {
            console.error("Cillad ayaa ka dhacday keenista khubarada:", error);
            return [];
        }
    }
};

export { providerService };
export default providerService;