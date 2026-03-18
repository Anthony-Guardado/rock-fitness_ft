<template>
  <!-- Overlay oscuro -->
  <div class="fixed inset-0 bg-[#181A1F] z-50 flex items-center justify-center">

    <div class="flex flex-col items-center gap-8 p-8">

      <button class="absolute top-0 right-0 text-[#B4B4BC] hover:text-[#F5F5F5] transition-colors"
        @click="$emit('cerrar')">
        <i class="pi pi-times text-xl"></i>
      </button>

      <!-- Título -->
      <h2 class="text-[#F5F5F5] text-2xl font-bold tracking-wide">
        Elige tu membresía
      </h2>

      <!-- Cards -->
      <div class="flex flex-col md:flex-row gap-6">

        <Card v-for="plan in membresias" :key="plan.id"
          style="width: 200px; background: #1F232A; border: 1px solid #23374D;">
          <template #title>
            <span class="text-[#F5F5F5]">{{ plan.nombre }}</span>
          </template>
          <template #subtitle>
            <span class="text-[#B4B4BC]">{{ plan.duracion_mes }} mes(es)</span>
          </template>
          <template #content>
            <p class="text-[#4FC3F7] text-3xl font-bold text-center m-0">${{ plan.precio }}</p>
          </template>
          <template #footer>
            <Button label="Elegir" class="w-full" @click="elegir(plan)" />
          </template>
        </Card>
      </div>

      <StripeForm v-if="clientSecret" :clientSecret="clientSecret" />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import membresiaService from '@/services/membresiaService'
import pagoService from '@/services/pagoService'
import StripeForm from '@/components/user/StripeForm.vue'


defineEmits(['cerrar'])

const membresias = ref([])
const loading = ref(false)


onMounted(async () => {
  const { data } = await membresiaService.getMembresias()
  console.log(data)
  membresias.value = data

})

const clientSecret = ref(null)

const elegir = async (plan) => {
  loading.value = true
  try {
    await membresiaService.seleccionar({ membresia_id: plan.id })

    const { data: detalle } = await membresiaService.getMiMembresia()

    const { data: pago } = await pagoService.crearPago({
      detalle_membresia_id: detalle.data.id,
      metodo_pago_id: 1
    })

    const { data: intent } = await pagoService.crearIntent({
      pago_id: pago.pago_id
    })

    clientSecret.value = intent.client_secret

  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}




</script>
