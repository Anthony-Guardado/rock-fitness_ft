import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; // ajusta la ruta

const API_URL = 'http://127.0.0.1:8000/api/user';

export const userService = {
    async getAll() {
        const authStore = useAuthStore();
        const token = authStore.token; // ✅ toma el token de Pinia
        
        const { data } = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    },

    async create(userData) {
        const authStore = useAuthStore();
        const token = authStore.token;
        const formData = new FormData();
        formData.append('user', JSON.stringify(userData));

        const { data } = await axios.post(API_URL, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    },

    async update(id, userData) {
        const authStore = useAuthStore();
        const token = authStore.token;
        const formData = new FormData();
        formData.append('user', JSON.stringify(userData));
        formData.append('_method', 'PUT');

        const { data } = await axios.post(`${API_URL}/${id}`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    },

    async delete(id) {
        const authStore = useAuthStore();
        const token = authStore.token;

        const { data } = await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    }
};