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
  },
//CONEXIONES PARA DATOS DEL USUARIO Y ACTUALIZACIÓN DE MEMBRESIA A DETALLE_MEMBRESIA
    getMiMembresia() {
        return api.get(`/detalle_membresias/miMembresia`)
    },

    getMembresias() {
        return api.get('/membresias')
    },

    crearDetalle(datos) {
        return api.post('/detalle_membresias', datos)
    },

    cambiarPlan(id, datos) {
        return api.patch(`/detalle_membresias/${id}/cambiar`, datos)
    },

    cambiarEstado(id, datos) {
        return api.patch(`/detalle_membresias/${id}/estado`, datos)
    },

    seleccionar(datos) {
    return api.post('/detalle_membresias/seleccionar', datos)
}

}
export default membresiaService;
