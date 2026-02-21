import axios from 'axios';

// Hubi in Port-ku yahay 5006 sidii aan Backend-ka ugu xidhnay
const API_URL = 'http://localhost:5006/api/reviews';

const getByService = async (serviceId) => {
    try {
        const response = await axios.get(`${API_URL}/service/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return []; // Soo celi liis madhan haddii ciladi dhacdo
    }
};

// Hubi in magaca function-ka halkan lagu daray (Export)
const reviewService = {
    getByService
};

export default reviewService;