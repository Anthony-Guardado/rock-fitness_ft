<template>
  <Dialog :visible="visible" modal header="AGREGAR NUEVO USUARIO" :style="{ width: '500px' }" @update:visible="$emit('close')">
    <div class="grid p-fluid">

            <div class="col-6 mb-3">
          <label class="text-xs text-blue-400 ml-1">Nombre</label>
          <InputText v-model="form.nombre" placeholder="Nombre" :class="{ 'p-invalid': submitted && !nombreValido }" />
          <small v-if="submitted && !form.nombre" class="p-error">Requerido</small>
          <small v-else-if="submitted && !nombreValido" class="p-error">No se admiten números</small>
        </div>

        <div class="col-6 mb-3">
          <label class="text-xs text-blue-400 ml-1">Apellido</label>
          <InputText v-model="form.apellido" placeholder="Apellido" :class="{ 'p-invalid': submitted && !apellidoValido }" />
          <small v-if="submitted && !form.apellido" class="p-error">Requerido</small>
          <small v-else-if="submitted && !apellidoValido" class="p-error">No se admiten números</small>
        </div>

      <div class="col-6 mb-3">
        <label class="text-xs text-blue-400 ml-1">Teléfono</label>
        <InputMask v-model="form.telefono" mask="9999-9999" placeholder="0000-0000" :class="{ 'p-invalid': submitted && !telefonoValido }" />
        <small v-if="submitted && !telefonoValido" class="p-error">Formato: 0000-0000</small>
      </div>

      <div class="col-6 mb-3">
        <label class="text-xs text-blue-400 ml-1">DUI</label>
        <InputMask v-model="form.dui" mask="99999999-9" placeholder="00000000-0" :class="{ 'p-invalid': submitted && !duiValido }" />
        <small v-if="submitted && !duiValido" class="p-error">Formato: 00000000-0</small>
      </div>

      <div class="col-6 mb-3">
        <label class="text-xs text-blue-400 ml-1">Email</label>
        <InputText v-model="form.email" placeholder="ejemplo@correo.com" :class="{ 'p-invalid': submitted && !emailValido }" />
        <small v-if="submitted && !emailValido" class="p-error">Email no válido</small>
      </div>

      <div class="col-6 mb-3">
        <label class="text-xs text-blue-400 ml-1">Contraseña</label>
        <Password v-model="form.password" placeholder="Contraseña" :feedback="false" toggleMask :class="{ 'p-invalid': submitted && !passwordValido }" />
        <small v-if="submitted && !passwordValido" class="p-error">Mínimo 8 caracteres</small>
      </div>

    </div>

    <template #footer>
      <div class="flex justify-content-center">
        <Button label="Guardar" class="p-button-cyan w-6" @click="handleSave" :loading="isSaving" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { userService } from '@/services/userService';
import Swal from 'sweetalert2';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const props = defineProps(['visible']);
const emit = defineEmits(['close', 'refresh']);
const isSaving = ref(false);
const submitted = ref(false);

const form = ref({ 
  nombre: '', apellido: '', email: '', 
  telefono: '', dui: '', password: '', rol: 'CLIENTE' 
});

// ── Validaciones ──────────────────────────────────────────
const emailValido    = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email));
const telefonoValido = computed(() => /^\d{4}-\d{4}$/.test(form.value.telefono));
const duiValido      = computed(() => /^\d{8}-\d$/.test(form.value.dui));
const passwordValido = computed(() => form.value.password.length >= 8);

// Agrega estos dos computed junto a los demás
const nombreValido   = computed(() => form.value.nombre && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.value.nombre));
const apellidoValido = computed(() => form.value.apellido && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.value.apellido));

// Actualiza formularioValido así
const formularioValido = computed(() =>
  nombreValido.value &&
  apellidoValido.value &&
  emailValido.value &&
  telefonoValido.value &&
  duiValido.value &&
  passwordValido.value
);

// ── Guardar ───────────────────────────────────────────────
const handleSave = async () => {
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
    await userService.create(form.value);
    Swal.fire({ title: '¡Creado!', text: 'Usuario registrado con éxito', icon: 'success', background: '#111820', color: '#fff', timer: 2000, showConfirmButton: false });
    emit('refresh');
    emit('close');
    resetForm();
  } catch (error) {
    const msg = error.response?.data?.errors
      ? Object.values(error.response.data.errors)[0][0]
      : 'Error al guardar';
    Swal.fire({ title: 'Error', text: msg, icon: 'error', background: '#111820', color: '#fff' });
  } finally {
    isSaving.value = false;
  }
};

const resetForm = () => {
  form.value = { nombre: '', apellido: '', email: '', telefono: '', dui: '', password: '', rol: 'CLIENTE' };
  submitted.value = false;
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

:deep(.p-password) {
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