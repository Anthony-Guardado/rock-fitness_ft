import api from './api'

export default {

  getMisPagos() {
    return api.get('/pagos/mispagos')
  },


  getAll() {
    return api.get('/pagos')
  }
}
