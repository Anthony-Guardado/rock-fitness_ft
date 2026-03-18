import api from './api'

export default {

    getMiMembresia() {
        return api.get(`/detalle_membresias/miMembresia`)
    },

    getMembresias() {
        return api.get('/membresias')
    },

    crearDetalle(datos) {
        return api.post('/detalle_membresias', datos)
    },

    cambiarPlan(id, datos) {
        return api.patch(`/detalle_membresias/${id}/cambiar`, datos)
    },

    cambiarEstado(id, datos) {
        return api.patch(`/detalle_membresias/${id}/estado`, datos)
    },

    seleccionar(datos) {
    return api.post('/detalle_membresias/seleccionar', datos)
}
}
