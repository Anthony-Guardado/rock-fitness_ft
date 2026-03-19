import { defineStore } from 'pinia';
import { ref } from 'vue';
import { membresiaService } from '@/services/membresiaService';
import Swal from 'sweetalert2';

export const useMembresiaStore = defineStore('membresias', () => {

  const membresias = ref([]);
  const loading = ref(false);

  const fetchMembresias = async () => {
    loading.value = true;
    try {
      const { data } = await membresiaService.getAll();
      // aqui la api me devuelve { message, data: [...] }
      membresias.value = data.data;
    } catch {
      Swal.fire({ title: 'Error', text: 'No se pudieron cargar las membresías', icon: 'error', background: '#111820', color: '#fff' });
    } finally {
      loading.value = false;
    }
  };

  const cambiarEstado = async (usuario_id, estado) => {
    try {
      await membresiaService.cambiarEstado(usuario_id, estado);
      await fetchMembresias();
      const mensajes = {
        cancelada:  'Membresía cancelada',
        suspendida: 'Membresía suspendida',
        inactiva:   'Membresía desactivada',
        activa:     'Membresía activada',
      };
      Swal.fire({ title: '¡Listo!', text: mensajes[estado], icon: 'success', background: '#111820', color: '#fff', timer: 1500, showConfirmButton: false });
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'No se pudo cambiar el estado';
      Swal.fire({ title: 'Error', text: msg, icon: 'error', background: '#111820', color: '#fff' });
      return false;
    }
  };

  const cambiarTipo = async (usuario_id, membresia_id) => {
    try {
      await membresiaService.updateTipo(usuario_id, { membresia_id });
      await fetchMembresias();
      Swal.fire({ title: '¡Actualizado!', text: 'Tipo de membresía cambiado', icon: 'success', background: '#111820', color: '#fff', timer: 1500, showConfirmButton: false });
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'No se pudo actualizar';
      Swal.fire({ title: 'Error', text: msg, icon: 'error', background: '#111820', color: '#fff' });
      return false;
    }
  };

  return { membresias, loading, fetchMembresias, cambiarEstado, cambiarTipo };
});