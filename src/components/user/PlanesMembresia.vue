<template>
  <!-- Overlay oscuro -->
  <div class="fixed inset-0 bg-[#181A1F] z-50 flex items-center justify-center">

    <div class="flex flex-col items-center gap-8 p-8">

      <!-- Título -->
      <h2 class="text-[#F5F5F5] text-2xl font-bold tracking-wide">
        Elige tu membresía
      </h2>



      <!-- Cards -->
      <div class="flex flex-col md:flex-row gap-6">

        <button class="absolute top-6 right-8 text-[#B4B4BC] hover:text-[#F5F5F5] transition-colors"
          @click="cerrarFormulario">
          <i class="pi pi-times text-xl"></i>
        </button>


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
            <Button label="Elegir" class="w-full"
              :disabled="pagoStore.procesandoPago || pagoStore.planBloqueadoId !== null" @click="elegir(plan)" />
          </template>
        </Card>
      </div>

      <StripeForm v-if="pagoStore.clientSecret" :clientSecret="pagoStore.clientSecret"
        :nombrePlan="pagoStore.nombreMembresia" :precioPlan="pagoStore.montoMembresia" />

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import membresiaService from '@/services/membresiaService'
import StripeForm from '@/components/user/StripeForm.vue'
import { usePagoStore } from '@/stores/paymentStore'

const emit = defineEmits(['cerrar'])
const membresias = ref([])
const pagoStore = usePagoStore()

onMounted(async () => {
  const { data } = await membresiaService.getMembresias()
  membresias.value = data
})

const elegir = async (plan) => {
  await pagoStore.iniciarPagoMembresia(plan)
}

const cerrarFormulario = async () => {
  await pagoStore.cerrarPago()
  emit('cerrar')
}
</script>
