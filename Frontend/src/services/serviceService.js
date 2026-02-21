import api from './api'

const serviceService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters)
    const response = await api.get(`/services?${params}`)
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/services/${id}`)
    return response.data
  },

  create: async (serviceData) => {
    const response = await api.post('/services', serviceData)
    return response.data
  },

  update: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/services/${id}`)
    return response.data
  },

  getByProvider: async (providerId) => {
    const response = await api.get(`/services/provider/${providerId}`)
    return response.data
  },
}

export default serviceService; // KHADKAN AYAA MUHIIM AH