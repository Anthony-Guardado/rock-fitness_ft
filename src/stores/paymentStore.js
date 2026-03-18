import { defineStore } from 'pinia'
import { ref } from 'vue'
import membresiaService from '@/services/membresiaService'
import pagoService from '@/services/pagoService'

export const usePagoStore = defineStore('pago', () => {
  const procesandoPago = ref(false)
  const clientSecret = ref(null)
  const pagoActual = ref(null)
  const nombreMembresia = ref('')
  const montoMembresia = ref(0)
  const planBloqueadoId = ref(null)

  const iniciarPagoMembresia = async (plan) => {
    if (procesandoPago.value || planBloqueadoId.value) return

  planBloqueadoId.value = plan.id
  procesandoPago.value = true

    try {
      await membresiaService.seleccionar({
        membresia_id: plan.id
      })

      const { data: detalle } = await membresiaService.getMiMembresia()

      const { data: pago } = await pagoService.crearPago({
        detalle_membresia_id: detalle.data.id,
        metodo_pago_id: 1
      })

      pagoActual.value = pago

      const { data: intent } = await pagoService.crearIntent({
        pago_id: pago.pago_id
      })

      clientSecret.value = intent.client_secret
      nombreMembresia.value = plan.nombre
      montoMembresia.value = plan.precio

    } catch (error) {
      console.error('Error creando pago:', error)
    } finally {
      procesandoPago.value = false
    }
  }

  const cerrarPago = async () => {
    try {
      if (pagoActual.value && (pagoActual.value.id || pagoActual.value.pago_id)) {
        const idPago = pagoActual.value.id || pagoActual.value.pago_id
        await pagoService.marcarFallido(idPago)
      }
    } catch (error) {
      console.error('Error cerrando pago:', error)
    } finally {
      limpiarPago()
    }
  }

  const limpiarPago = () => {
    clientSecret.value = null
    pagoActual.value = null
    nombreMembresia.value = ''
    montoMembresia.value = 0
    procesandoPago.value = false
    planBloqueadoId.value = null
  }

  const cancelarMembresia = async (usuarioId) => {
  try {
    await membresiaService.cambiarEstado(usuarioId, {
      estado: 'cancelada'
    })

    limpiarPago()
  } catch (error) {
    console.error('Error cancelando membresía:', error)
    throw error
  }
}

  return {
    procesandoPago,
    clientSecret,
    pagoActual,
    nombreMembresia,
    montoMembresia,
    planBloqueadoId,
    cancelarMembresia,
    iniciarPagoMembresia,
    cerrarPago,
    limpiarPago
  }
})
