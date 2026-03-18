import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  persist: true,
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.roles?.some(role => role.name.toUpperCase() === 'ADMIN'),
    isCliente: (state) => state.user?.roles?.some(role => role.name.toUpperCase() === 'CLIENTE')
  },
  actions: {
    async login(credentials) {
      const { data } = await api.post('/auth/login', credentials)
      this.token = data.access_token
      this.user = data.user
      return data.user
    },
    async register(payload) {
      const { data } = await api.post('/auth/register', payload)
      this.token = data.access_token
      this.user = data.user
      return data.user
    },
    async logout() {
      try {
        if (this.token) await api.post('auth/logout')
      } catch (error) {
        console.warn("Error de red al cerrar sesión, limpiando localmente...");
      } finally {
        this.$reset()
        localStorage.removeItem('auth')
      }
    }
  }
})