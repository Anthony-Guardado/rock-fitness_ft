import api from './api'

export default {
  getAll() {
    return api.get('/user')
  },

  getPerfil(id) {
    return api.get(`/user/${id}`)
  },

  store(formData) {
    return api.post('/user', formData)
  },

  update(id, formData) {
    return api.post(`/user/${id}?_method=PUT`, formData)
  },

  destroy(id) {
    return api.delete(`/user/${id}`)
  },

  restore(id) {
    return api.post(`/users/${id}/restore`)
  }
}


