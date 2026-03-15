import { defineStore } from 'pinia'
import api from '@/services/api' // Asegúrate de tener configurado tu Axios aquí
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),

  // Para la persistencia automática (asegúrate de tener instalado pinia-plugin-persistedstate)
  persist: true,

  getters: {
    isAuthenticated: (state) => !!state.token,

    // Verificamos si es ADMIN
    isAdmin: (state) => {
      return state.user?.roles?.some(role => role.name === 'ADMIN')
    },

    // Verificamos si es CLIENTE
    isCliente: (state) => {
      return state.user?.roles?.some(role => role.name === 'CLIENTE')
    }
  },

  actions: {
    async login(credentials) {
      try {
        const { data } = await api.post('/login', credentials)

        this.token = data.access_token
        this.user = data.user

        // Redirección estricta para nuestros 2 roles
        if (this.isAdmin) {
          router.push('/admin/dashboard')
        } else {
          router.push('/user/dashboard')
        }
      } catch (error) {
        console.error("Error en login", error)
        throw error // Lanza el error para que Login.vue atrape el 401
      }
    },

    async register(payload) {
      try {
        const { data } = await api.post('/register', payload)

        this.token = data.access_token
        this.user = data.user

        // Como en tu backend de Laravel le asignas 'CLIENTE' por defecto,
        // lo mandamos directo a su dashboard tras registrarse
        router.push('/user/dashboard')
      } catch (error) {
        console.error("Error al registrarse", error)
         throw error // Lanzamos el error por si Laravel devuelve un 422 (errores de validación)
      }
    },

    async logout() {
      try {
        if (this.token) {
          // Usamos la ruta de logout de tu backend
          await api.post('/logout')
        }
      } catch (error) {
        console.error("Error al cerrar sesión", error)
      } finally {
        // Limpiamos el estado y devolvemos al usuario a la página principal
        this.$reset()
        router.push('/')
      }
    }
  }
})
