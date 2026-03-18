import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  // Leemos el localStorage que genera pinia-plugin-persistedstate
  const authRaw = localStorage.getItem('auth')

  if (authRaw) {
    const authData = JSON.parse(authRaw)
    if (authData.token) {
      config.headers.Authorization = `Bearer ${authData.token}`
    }
  }

  return config
})

export default api
