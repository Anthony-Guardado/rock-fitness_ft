import api from '@/services/api'

export const userService = {
  async getAll() {
    const { data } = await api.get('/user')
    return data
  },

  async create(userData) {
    const formData = new FormData()
    formData.append('user', JSON.stringify(userData))
    const { data } = await api.post('/user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
  },

  async update(id, userData) {
    const formData = new FormData()
    formData.append('user', JSON.stringify(userData))
    formData.append('_method', 'PUT')
    const { data } = await api.post(`/user/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
  },

  async delete(id) {
    const { data } = await api.delete(`/user/${id}`)
    return data
  },

  getPerfil(id) {
    return api.get(`/user/${id}`)
  },

  restore(id) {
    return api.post(`/users/${id}/restore`)
  }
}