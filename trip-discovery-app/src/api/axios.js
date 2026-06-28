import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/products';

export const api = {
  getAllTrips: async (limit = 100) => {
    const response = await axios.get(`${API_BASE_URL}?limit=${limit}`);
    return response.data;
  },

  searchTrips: async (query) => {
    const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  getTripsByCategory: async (category) => {
    const response = await axios.get(`${API_BASE_URL}/category/${category}`);
    return response.data;
  },

  getTripById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};