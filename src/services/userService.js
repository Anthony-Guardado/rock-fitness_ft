import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; 

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
    },

//RUTAS 
   

  getPerfil(id) {
    return api.get(`/user/${id}`)
  },

  store(formData) {
    return api.post('/user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  update(id, formData) {
    return api.post(`/user/${id}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

    restore(id) {
    return api.post(`/users/${id}/restore`)
  }
}
