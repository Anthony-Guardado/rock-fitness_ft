<template>
  <div class="min-h-screen flex items-center justify-center bg-gym-base font-inter p-4">

    <div class="w-full max-w-md bg-gym-card border border-gym-border rounded-2xl p-8 shadow-glow">

      <div class="text-center mb-6">
        <h1 class="text-3xl font-poppins font-bold text-gym-text uppercase tracking-wide mb-2">
          Recuperar <span class="text-gym-accent">Clave</span>
        </h1>
        <p class="text-gym-muted text-sm leading-relaxed">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      <div v-if="successMessage" class="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
        <i class="pi pi-check-circle mr-2"></i> {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
        <i class="pi pi-exclamation-circle mr-2"></i> {{ errorMessage }}
      </div>

      <form v-if="!successMessage" @submit.prevent="submitEmail" class="flex flex-col gap-6">

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gym-text">Correo Electrónico</label>
          <div class="relative">
            <i class="pi pi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gym-muted"></i>
            <input
              v-model="email"
              type="email"
              placeholder="ejemplo@correo.com"
              class="w-full bg-gym-input border border-gym-border text-gym-inputText placeholder-gym-muted rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-gym-accent focus:ring-1 focus:ring-gym-accent transition-all"
              required
              :disabled="loading"
            /> </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gym-accent hover:bg-[#3ab0e5] text-gym-base font-poppins font-bold text-lg py-3 rounded-lg transition-colors mt-2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Enviar Enlace</span>
          <span v-else>
            <i class="pi pi-spin pi-spinner mr-2"></i> Enviando...
          </span>
        </button>

      </form> <p class="mt-6 text-center text-sm text-gym-muted">
        ¿Recordaste tu contraseña?
        <router-link to="/login" class="text-gym-accent hover:underline font-medium transition-all">
          Vuelve al Login
        </router-link>
      </p>

    </div> </div> </template> <script setup>
import { ref } from 'vue'
import api from '@/services/api'

const email = ref('')
const loading = ref(false)
const successMessage = ref(null)
const errorMessage = ref(null)

const submitEmail = async () => {
  loading.value = true
  errorMessage.value = null
  successMessage.value = null

  try {
    // Busca esta línea en la función submitEmail:
const response = await api.post('/password/email', { // Antes decía /forgot-password
  email: email.value
})

    successMessage.value = response.data.message || 'Enlace enviado con éxito.'
    email.value = ''

  } catch (error) {
    if (error.response?.data?.errors?.email) {
      errorMessage.value = error.response.data.errors.email[0]
    } else {
      errorMessage.value = "Ocurrió un error al enviar el correo. Verifica e intenta de nuevo."
    }
  } finally {
    loading.value = false
  }
}
</script>
