import { defineStore } from 'pinia'
import api from '@/services/api'
import router from '@/router'

// ESTA LÍNEA ES LA CLAVE PARA ARREGLAR EL ERROR:
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),

  // Persistencia automática (gracias a pinia-plugin-persistedstate)
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
        const { data } = await api.post('/auth/login', credentials)

        this.token = data.access_token
        this.user = data.user

        // Redirección estricta para nuestros 2 roles
        if (this.isAdmin) {
          router.push('/admin/AdminDashboard')
        } else {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error("Error en login", error)
        throw error // Lanza el error para que Login.vue atrape el 401
      }
    },

    async register(payload) {
      try {
        const { data } = await api.post('/auth/register', payload)

        this.token = data.access_token
        this.user = data.user

        router.push('/dashboard')
      } catch (error) {
         console.error("Error al registrarse", error)
         throw error
      }
    },

    async logout() {
      try {
        if (this.token) {
          await api.post('/logout')
        }
      } catch (error) {
         console.error("Error al cerrar sesión", error)
      } finally {
        this.$reset()
        router.push('/')
      }
    }
  }
})
