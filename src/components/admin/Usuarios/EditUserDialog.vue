<template>
  <Dialog :visible="visible" modal header="EDITAR USUARIO" :style="{ width: '500px' }" @update:visible="$emit('close')">
    <div class="grid p-fluid" v-if="localUser">

              <div class="col-6 mb-3">
  <label class="text-xs text-orange-400 ml-1">Nombre</label>
  <InputText 
    v-model="localUser.nombre" 
    :class="{ 'p-invalid': (submitted || localUser.nombre) && !nombreValido }" 
  />
  <small v-if="submitted && !localUser.nombre" class="p-error">Requerido</small>
  <small v-if="localUser.nombre && !nombreValido" class="p-error">No se admiten números ni caracteres especiales</small>
</div>

<div class="col-6 mb-3">
  <label class="text-xs text-orange-400 ml-1">Apellido</label>
  <InputText 
    v-model="localUser.apellido" 
    :class="{ 'p-invalid': (submitted || localUser.apellido) && !apellidoValido }" 
  />
  <small v-if="submitted && !localUser.apellido" class="p-error">Requerido</small>
  <small v-if="localUser.apellido && !apellidoValido" class="p-error">No se admiten números ni caracteres especiales</small>
</div>

      <div class="col-6 mb-3">
        <label class="text-xs text-orange-400 ml-1">Teléfono</label>
        <InputMask v-model="localUser.telefono" mask="9999-9999" :class="{ 'p-invalid': submitted && !telefonoValido }" />
        <small v-if="submitted && !telefonoValido" class="p-error">Formato: 0000-0000</small>
      </div>

      <div class="col-6 mb-3">
        <label class="text-xs text-orange-400 ml-1">DUI</label>
        <InputMask v-model="localUser.dui" mask="99999999-9" placeholder="12345678-9" :class="{ 'p-invalid': submitted && !duiValido }" />
        <small v-if="submitted && !duiValido" class="p-error">Formato: 00000000-0</small>
      </div>

      <div class="col-12 mb-3">
        <label class="text-xs text-orange-400 ml-1">Email</label>
        <InputText v-model="localUser.email" :class="{ 'p-invalid': submitted && !emailValido }" />
        <small v-if="submitted && !emailValido" class="p-error">Email no válido</small>
      </div>

    </div>

    <template #footer>
      <div class="flex justify-content-center">
        <Button label="Guardar" class="p-button-cyan w-6" @click="handleUpdate" :loading="isSaving" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { userService } from '@/services/userService';
import Swal from 'sweetalert2';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';

const props = defineProps(['visible', 'user']);
const emit = defineEmits(['close', 'refresh']);
const localUser = ref(null);
const isSaving = ref(false);
const submitted = ref(false);

// ← Aquí el fix: resetear submitted al abrir con nuevo usuario
watch(() => props.user, (val) => { 
  if (val) {
    localUser.value = { ...val };
    submitted.value = false;
  }
});

// ── Validaciones ──────────────────────────────────────────
const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

const nombreValido   = computed(() => localUser.value?.nombre && soloLetras.test(localUser.value.nombre));
const apellidoValido = computed(() => localUser.value?.apellido && soloLetras.test(localUser.value.apellido));
const telefonoValido = computed(() => /^\d{4}-\d{4}$/.test(localUser.value?.telefono));
const duiValido      = computed(() => /^\d{8}-\d$/.test(localUser.value?.dui));
const emailValido    = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localUser.value?.email));

const formularioValido = computed(() =>
  nombreValido.value &&
  apellidoValido.value &&
  telefonoValido.value &&
  duiValido.value &&
  emailValido.value
);

// ── Actualizar ────────────────────────────────────────────
const handleUpdate = async () => {
  submitted.value = true;

  if (!formularioValido.value) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Por favor completa todos los campos correctamente',
      icon: 'warning',
      background: '#111820',
      color: '#fff',
      confirmButtonColor: '#00bcd4'
    });
    return;
  }

  isSaving.value = true;
  try {
    await userService.update(localUser.value.id, localUser.value);
    Swal.fire({ title: '¡Actualizado!', icon: 'success', background: '#111820', color: '#fff', timer: 1500, showConfirmButton: false });
    emit('refresh');
    emit('close');
  } catch (error) {
    Swal.fire({ title: 'Error', text: 'No se pudo actualizar', icon: 'error', background: '#111820', color: '#fff' });
  } finally {
    isSaving.value = false;
    submitted.value = false;
  }
};
</script>
<style scoped>
:deep(.p-inputtext) {
  background: #ffffff !important;
  color: #111820 !important;
  padding: 0.75rem !important;
  border-radius: 6px !important;
  width: 100% !important;
}

.p-error {
  color: #f87171 !important;
  font-size: 0.7rem;
  margin-top: 4px;
  font-weight: bold;
  display: block;
}

:deep(.p-dialog-header) {
  background: #0d1520;
  color: white;
  border-bottom: 1px solid rgba(79, 195, 247, 0.2);
}

:deep(.p-dialog-content) { background: #0d1520; }
:deep(.p-dialog-footer)  { background: #0d1520; border-top: none; }
</style>