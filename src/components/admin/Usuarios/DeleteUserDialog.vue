<template>
  <Dialog :visible="visible" modal header="ELIMINAR USUARIO" :style="{ width: '500px' }" @update:visible="$emit('close')">
    <div class="grid p-fluid" v-if="user">
        <div class="col-6 mb-3">
        <InputText :value="user.nombre" disabled />
      </div>
      <div class="col-6 mb-3">
        <InputText :value="user.telefono" disabled />
      </div>
      <div class="col-6 mb-3">
        <InputText :value="user.apellido" disabled />
      </div>
      <div class="col-6 mb-3">
        <InputText :value="user.dui" disabled />
      </div>
      <div class="col-12 mb-3">
        <InputText :value="user.email" disabled />
      </div>
    </div>
    <template #footer>
      <div class="flex justify-center">
        <Button label="Eliminar" class="p-button-danger w-6" @click="handleDelete" :loading="isSaving" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { userService } from '@/services/userService';
import Swal from 'sweetalert2';

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps(['visible', 'user']);
const emit = defineEmits(['close', 'refresh']);
const isSaving = ref(false);

const handleDelete = async () => {
  //Alerta de confirmación

  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar a ${props.user.nombre}? Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    background: '#111820',
    color: '#fff',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    reverseButtons: true
  });

  //Si el usuario confirma, procedemos
  if (result.isConfirmed) {
    isSaving.value = true;
    try {
      await userService.delete(props.user.id);
      Swal.fire({
        title: 'Desactivado',
        text: 'Usuario movido a la papelera (Soft Delete)',
        icon: 'success',
        background: '#111820',
        color: '#fff',
        timer: 2000,
        showConfirmButton: false
      });
      emit('refresh');
      emit('close');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar',
        icon: 'error',
        background: '#111820',
        color: '#fff'
      });
    } finally {
      isSaving.value = false;
    }
  }else{
    emit ('close')
  }
};
</script>
