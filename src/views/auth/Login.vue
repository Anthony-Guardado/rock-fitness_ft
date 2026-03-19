<template>
  <div class="min-h-screen flex items-center justify-center bg-gym-base font-inter p-4">

    <div class="w-full max-w-md bg-gym-card border border-gym-border rounded-2xl p-8 shadow-glow">

      <div class="text-center mb-8">
        <h1 class="text-3xl font-poppins font-bold text-gym-text uppercase tracking-wide mb-2">
          Bienvenido a <span class="text-gym-accent">Rock</span>
        </h1>
        <p class="text-gym-muted text-sm">Ingresa tus credenciales para continuar</p>
      </div>

      <div v-if="errorMessage"
        class="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
        <i class="pi pi-exclamation-circle mr-2"></i> {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-6">

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gym-text">Correo Electrónico</label>
          <div class="relative">
            <i class="pi pi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gym-muted"></i>
            <input v-model="form.email" type="email" placeholder="ana.prendas@gmail.com"
              class="w-full bg-gym-input border border-gym-border text-gym-inputText placeholder-gym-muted
              rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-gym-accent focus:ring-1 focus:ring-gym-accent transition-all" required :disabled="loading" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-gym-text">Contraseña</label>
            <router-link to="/recuperar-contrasena" class="text-xs text-gym-accent hover:underline transition-all">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
          <div class="relative">
            <i class="pi pi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gym-muted"></i>
            <input v-model="form.password" type="password" placeholder="••••••••" class="w-full bg-gym-input border border-gym-border text-gym-inputText placeholder-gym-muted rounded-lg pl-10 pr-4
              py-3 focus:outline-none focus:border-gym-accent focus:ring-1 focus:ring-gym-accent transition-all"
              required :disabled="loading" />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-gym-accent hover:bg-[#3ab0e5] text-gym-base font-poppins font-bold text-lg py-3 rounded-lg transition-colors
          mt-2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed">
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else>
            <i class="pi pi-spin pi-spinner mr-2"></i> Ingresando...
          </span>
        </button>

      </form>

      <p class="mt-6 text-center text-sm text-gym-muted">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-gym-accent hover:underline font-medium transition-all">
          Regístrate
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'


// Inicializamos herramientas
const authStore = useAuthStore()
const router = useRouter()

// Variables de estado local
const loading = ref(false)
const errorMessage = ref(null)

// Objeto reactivo para capturar los inputs
const form = reactive({
  email: '',
  password: ''
})

// Función principal de acceso
const handleLogin = async () => {
  loading.value = true
  errorMessage.value = null
  

  try {
    // 1. Intentamos el login a través del store
    await authStore.login(form)

    // 2. Redirección por PATH DIRECTO (más seguro para tu configuración)
    if (authStore.isAdmin) {
      // Coincide con el path: '/admin/AdminDashboard' de tu index.js
      router.push('/admin/AdminDashboard')
    } else {
      // Coincide con el path: '/dashboard' del cliente
      router.push('/dashboard')
    }
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Sesión iniciada correctamente",
      showConfirmButton: false,
      timer: 1500
    })


  } catch (err) {
    // 3. Manejo de errores amigable
    if (err.response?.status === 401) {
      errorMessage.value = 'Correo o contraseña incorrectos.'
    } else if (err.response?.status === 422) {
      errorMessage.value = 'Por favor, revisa que el formato del correo sea válido.'
    } else {
      errorMessage.value = 'No se pudo conectar con el servidor. Intenta de nuevo.'
    }
  } finally {
    loading.value = false
  }
}
</script>
