import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const API_URL = 'http://127.0.0.1:8000/api';

export const membresiaService = {

  getAll() {
    const authStore = useAuthStore();
    const token = authStore.token;
    return axios.get(`${API_URL}/detalle_membresias`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  cambiarEstado(usuario_id, estado) {
    const authStore = useAuthStore();
    const token = authStore.token;
    return axios.patch(`${API_URL}/detalle_membresias/${usuario_id}/estado`, { estado }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getTipos() {
    const authStore = useAuthStore();
    const token = authStore.token;
    return axios.get(`${API_URL}/membresias`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updateTipo(usuario_id, data) {
    const authStore = useAuthStore();
    const token = authStore.token;
    return axios.patch(`${API_URL}/detalle_membresias/${usuario_id}/cambiar`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};