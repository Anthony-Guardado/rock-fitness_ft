import api from "./api";

export default {
  getMisPagos() {
    return api.get("/pagos/mispagos");
  },

  getAll() {
    return api.get("/pagos");
  },

  crearPago(datos) {
    return api.post("/pagos/crear", datos);
  },

  crearIntent(datos) {
    return api.post("/payment/crear-intent", datos);
  },

  marcarFallido(id) {
    return api.patch(`/pagos/${id}/fallido`);
  },
};
