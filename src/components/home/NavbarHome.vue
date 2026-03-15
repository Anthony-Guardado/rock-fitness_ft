<template>
  <div class="min-h-screen bg-gym-base font-inter py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">

    <div class="text-center mb-16 max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-poppins font-bold text-gym-text mb-4">
        Impulsa tu <span class="text-gym-accent">Entrenamiento</span>
      </h1>
      <p class="text-gym-muted text-lg">
        Elige la membresía que mejor se adapte a tus objetivos. Comienza tu registro y únete a la comunidad GymRook.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20 w-full">
      <i class="pi pi-spin pi-spinner text-4xl text-gym-accent"></i>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl items-stretch">

      <div
        v-for="(plan, index) in membresias"
        :key="plan.id"
        class="rounded-2xl p-8 flex flex-col transition-all duration-300 relative"
        :class="destacarPlan(index)
          ? 'bg-gym-card border-2 border-gym-accent shadow-[0_0_30px_rgba(45,170,225,0.1)] transform md:-translate-y-4 z-10'
          : 'bg-[#1c1c21] border border-gym-border hover:border-gray-500'"
      >
        <div class="mb-6">
          <h3 class="text-2xl font-poppins font-bold text-white capitalize">
            {{ plan.nombre }}
          </h3>
          <p class="text-gym-muted text-sm mt-1">
            Duración: {{ plan.duracion_mes }} mes(es)
          </p>
        </div>

        <div class="mb-8 flex items-baseline gap-2">
          <span class="text-5xl font-bold text-white">${{ plan.precio }}</span>
          <span class="text-sm text-gym-muted">USD / total</span>
        </div>

        <button
          @click="irARegistro(plan.id)"
          class="w-full font-poppins font-semibold py-3.5 rounded-xl transition-all duration-300 mb-8 text-sm"
          :class="destacarPlan(index)
            ? 'bg-gym-accent hover:bg-[#3ab0e5] text-gym-base'
            : 'bg-transparent border border-gym-border hover:bg-gym-border text-white'"
        >
          Obtener Plan {{ plan.nombre }}
        </button>

        <div class="border-t border-gym-border pt-6 flex-grow">
          <p class="text-gym-muted text-sm leading-relaxed mb-6">
            {{ plan.descripcion }}
          </p>

          <ul class="space-y-4">
             <li class="flex items-start gap-3 text-sm text-gray-300">
                <i class="pi pi-check text-gym-accent mt-0.5 text-xs"></i>
                <span>Acceso completo a instalaciones</span>
             </li>
             <li class="flex items-start gap-3 text-sm text-gray-300">
                <i class="pi pi-check text-gym-accent mt-0.5 text-xs"></i>
                <span>Soporte de entrenadores</span>
             </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

// Ya no importamos Card de PrimeVue

const router = useRouter()
const membresias = ref([])
const loading = ref(true)

// Función visual: Si hay 3 planes, destacamos el de en medio (índice 1).
const destacarPlan = (index) => {
  return index === 1
}

const fetchMembresias = async () => {
  try {
    const response = await api.get('/membresias')
    membresias.value = response.data
  } catch (error) {
    console.error("Error al cargar las membresías:", error)
  } finally {
    loading.value = false
  }
}

const irARegistro = (planId) => {
  router.push({ path: '/register', query: { plan: planId } })
}

onMounted(() => {
  fetchMembresias()
})
</script>

<style scoped>
/* Ya no necesitamos sobrescribir los estilos de PrimeVue */
</style>
