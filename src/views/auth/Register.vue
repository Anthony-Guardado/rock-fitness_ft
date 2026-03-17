<template>
  <div class="min-h-screen bg-gym-base font-inter flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">

    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <router-link to="/" class="text-3xl font-poppins font-bold text-gym-text uppercase tracking-wide">
        Gym<span class="text-gym-accent">Rook</span>
      </router-link>
      <h2 class="mt-6 text-center text-3xl font-poppins font-extrabold text-white">
        Crea tu cuenta
      </h2>
      <p class="mt-2 text-center text-sm text-gym-muted">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="font-medium text-gym-accent hover:text-[#3ab0e5] transition-colors">
          Inicia Sesión
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
      <div class="bg-gym-card py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gym-border">

        <div v-if="planId" class="mb-6 bg-[#1c1c21] border border-gym-accent/30 rounded-xl p-4 flex items-center justify-center gap-2">
          <i class="pi pi-check-circle text-gym-accent"></i>
          <span class="text-sm text-gym-muted">Plan seleccionado:</span>
          <span class="font-bold text-gym-accent uppercase">ID #{{ planId }}</span>
        </div>

        <div v-if="errorMessage" class="mb-6 p-4 text-sm text-red-200 bg-red-900/30 border border-red-500/50 rounded-xl flex items-center gap-3">
          <i class="pi pi-exclamation-triangle text-red-400"></i>
          {{ errorMessage }}
        </div>

        <form class="space-y-5" @submit.prevent="sendRegister">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">Nombre</label>
              <input v-model="form.nombre" type="text" required class="appearance-none block w-full px-4 py-3 border border-gym-border rounded-xl bg-[#1c1c21] text-white focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm" placeholder="Ej. Ana" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">Apellido</label>
              <input v-model="form.apellido" type="text" required class="appearance-none block w-full px-4 py-3 border border-gym-border rounded-xl bg-[#1c1c21] text-white focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm" placeholder="Ej. Prendas" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">Teléfono</label>
              <input v-model="form.telefono" type="text" required class="appearance-none block w-full px-4 py-3 border border-gym-border rounded-xl bg-[#1c1c21] text-white focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm" placeholder="0000-0000" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">DUI</label>
              <input v-model="form.dui" type="text" required class="appearance-none block w-full px-4 py-3 border border-gym-border rounded-xl bg-[#1c1c21] text-white focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm" placeholder="00000000-0" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">Correo electrónico</label>
              <input v-model="form.email" type="email" required class="appearance-none block w-full px-4 py-3 border border-gym-border rounded-xl bg-[#1c1c21] text-white focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm" placeholder="tu@correo.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">Foto de Perfil</label>
              <input type="file" @change="handleImage" accept="image/*" class="appearance-none block w-full px-4 py-2 border border-gym-border rounded-xl bg-[#1c1c21] text-gym-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gym-accent file:text-gym-base hover:file:bg-[#3ab0e5] focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm transition-all" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">Contraseña</label>
              <input v-model="form.password" type="password" required class="appearance-none block w-full px-4 py-3 border border-gym-border rounded-xl bg-[#1c1c21] text-white focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm" placeholder="••••••••" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gym-muted mb-1">Confirmar Contraseña</label>
              <input v-model="form.password_confirmation" type="password" required class="appearance-none block w-full px-4 py-3 border border-gym-border rounded-xl bg-[#1c1c21] text-white focus:outline-none focus:ring-1 focus:ring-gym-accent focus:border-gym-accent sm:text-sm" placeholder="••••••••" />
            </div>
          </div>

          <div class="pt-4">
            <button type="submit" :disabled="loading" class="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-poppins font-bold text-gym-base bg-gym-accent hover:bg-[#3ab0e5] transition-all duration-300 disabled:opacity-50">
              <span v-if="loading"><i class="pi pi-spin pi-spinner mr-2"></i> Registrando...</span>
              <span v-else>Registrarse</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const authStore = useAuthStore();

const loading = ref(false);
const errorMessage = ref(null);
const planId = ref(null);

// Variable para la imagen
const imageFile = ref(null);

const form = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  dui: '',
  email: '',
  password: '',
  password_confirmation: ''
});

onMounted(() => {
  if (route.query.plan) {
    planId.value = route.query.plan;
  }
});

// Función para atrapar la imagen del input
const handleImage = (event) => {
  imageFile.value = event.target.files[0];
};

//funcion principal cuando tocamos el boton de registrarse
const sendRegister = async () => {
  loading.value = true;
  errorMessage.value = null;

  // Expresiones regulares para validar los campos
  const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
  const regexDui = /^\d{8}-\d$/;
  const regexTelefono = /^[267]\d{3}-?\d{4}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // mensajes de validacion de las expresiones
  if (!regexTexto.test(form.nombre)) {
    errorMessage.value = "El nombre solo debe contener letras.";
    loading.value = false; return;
  }
  if (!regexTexto.test(form.apellido)) {
    errorMessage.value = "El apellido solo debe contener letras.";
    loading.value = false; return;
  }
  if (!regexTelefono.test(form.telefono)) {
    errorMessage.value = "Teléfono inválido. Ingrese 8 dígitos (ej: 7000-0000).";
    loading.value = false; return;
  }
  if (!regexDui.test(form.dui)) {
    errorMessage.value = "DUI inválido. Formato requerido: 12345678-9.";
    loading.value = false; return;
  }
  if (!regexEmail.test(form.email)) {
    errorMessage.value = "Por favor, ingresa un correo válido.";
    loading.value = false; return;
  }
  if (form.password.length < 8) {
    errorMessage.value = "La contraseña debe tener al menos 8 caracteres.";
    loading.value = false; return;
  }
  if (form.password !== form.password_confirmation) {
    errorMessage.value = "Las contraseñas no coinciden, verifique.";
    loading.value = false; return;
  }

  try {
    // Los datos no van en JSON no puede transportar archivos físicos
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('apellido', form.apellido);
    formData.append('telefono', form.telefono);
    formData.append('dui', form.dui);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('password_confirmation', form.password_confirmation);

    // en esta variable seguardo el plan que selecciono el cliente
    if (planId.value) {
      formData.append('membresia_id', planId.value);
    }

    // si se mando la ft se agrega al formData
    if (imageFile.value) {
      formData.append('imagenes[]', imageFile.value);
    }

    //Enviamos el FormData al store para que pueda iniciar de una vez en la pestaña principal
    await authStore.register(formData);
    /* Atrapa los errores para mostrar el mensaje */
  } catch (err) {
    if (err.response?.status === 422) {
      console.log(err.response.data);
      errorMessage.value = "Datos inválidos o el correo/DUI/teléfono ya están en uso.";
    } else {
      errorMessage.value = "Error al registrar el usuario. Intenta más tarde.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
