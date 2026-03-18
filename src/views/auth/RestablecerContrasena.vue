<template>
  <div class="min-h-screen flex items-center justify-center bg-gym-base font-inter p-4">
    <div class="w-full max-w-md bg-gym-card border border-gym-border rounded-2xl p-8 shadow-glow">

      <div class="text-center mb-6">
        <h1 class="text-3xl font-poppins font-bold text-gym-text uppercase tracking-wide mb-2">
          Nueva <span class="text-gym-accent">Clave</span>
        </h1>
        <p class="text-gym-muted text-sm leading-relaxed">
          Ingresa tu nueva contraseña para recuperar tu cuenta.
        </p>
      </div>

      <div v-if="successMessage" class="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
        <i class="pi pi-check-circle mr-2"></i> {{ successMessage }}
        <p class="mt-2 text-xs">Redirigiendo al login...</p>
      </div>

      <div v-if="errorMessage" class="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
        <i class="pi pi-exclamation-circle mr-2"></i> {{ errorMessage }}
      </div>

      <form v-if="!successMessage" @submit.prevent="submitNewPassword" class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gym-text">Nueva Contraseña</label>
          <div class="relative">
            <i class="pi pi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gym-muted"></i>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gym-input border border-gym-border text-gym-inputText placeholder-gym-muted rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-gym-accent focus:ring-1 focus:ring-gym-accent transition-all"
              required
              :disabled="loading"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gym-text">Confirmar Contraseña</label>
          <div class="relative">
            <i class="pi pi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gym-muted"></i>
            <input
              v-model="form.password_confirmation"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gym-input border border-gym-border text-gym-inputText placeholder-gym-muted rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-gym-accent focus:ring-1 focus:ring-gym-accent transition-all"
              required
              :disabled="loading"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gym-accent hover:bg-[#3ab0e5] text-gym-base font-poppins font-bold text-lg py-3 rounded-lg transition-colors mt-2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Guardar Contraseña</span>
          <span v-else>
            <i class="pi pi-spin pi-spinner mr-2"></i> Guardando...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const successMessage = ref(null)
const errorMessage = ref(null)

const form = reactive({
  token: '',
  email: '',
  password: '',
  password_confirmation: ''
})

onMounted(() => {
  // Aquí capturamos lo que viene en la URL del botón de Mailtrap
  form.token = route.query.token || ''
  form.email = route.query.email || ''

  if (!form.token || !form.email) {
    errorMessage.value = "Enlace inválido. Por favor, solicita una nueva recuperación."
  }
})

const submitNewPassword = async () => {
  if (!form.token || !form.email) return

  loading.value = true
  errorMessage.value = null

  try {
    
    const response = await api.post('/password/reset', form)

    successMessage.value = response.data.message || 'Tu contraseña ha sido restablecida.'

    setTimeout(() => {
      router.push('/login')
    }, 3000)

  } catch (error) {
    if (error.response?.data?.errors) {
      const errores = error.response.data.errors
      errorMessage.value = Object.values(errores)[0][0]
    } else if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = "No se pudo restablecer la contraseña. El enlace podría haber expirado."
    }
  } finally {
    loading.value = false
  }
}
</script>
