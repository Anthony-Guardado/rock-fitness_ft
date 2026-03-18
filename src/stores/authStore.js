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
    isAdmin: (state) => state.user?.roles?.some(role => role.name === 'ADMIN'),
    isCliente: (state) => state.user?.roles?.some(role => role.name === 'CLIENTE')
  },
  actions: {
    async login(credentials) {
      const { data } = await api.post('/auth/login', credentials)
      this.token = data.access_token
      this.user = data.user
      return data.user // Devolvemos el usuario para que el componente navegue
    },
    async register(payload) {
      const { data } = await api.post('/auth/register', payload)

      this.token = data.access_token
      this.user = data.user
      return data.user
    },
    async logout() {
    try {
    // Agregamos 'auth/' antes de logout para que coincida con tu api.php
    if (this.token) await api.post('auth/logout')
  } catch (error) {
    console.warn("Error de red al cerrar sesión, limpiando localmente...");
  } finally {
    this.$reset()
    localStorage.removeItem('auth')
    // Es buena práctica limpiar los headers de axios aquí también
    // si tu servicio 'api' no lo hace automáticamente al resetear.
  }
}
  }
})
