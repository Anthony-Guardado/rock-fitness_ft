<template>
  <div
    v-if="open && isMobile"
    class="fixed inset-0 bg-black/40 z-30"
    @click="$emit('navigate')"
  ></div>

  <aside
    :class="[
      'fixed top-0 left-0 h-full z-40 flex flex-col bg-[#1F232A] border-r border-[#23374D] transition-transform duration-300',
      open ? 'translate-x-0' : '-translate-x-full',
      'w-60'
    ]"
  >
    <div class="flex items-center gap-3 px-5 h-16 border-b border-[#23374D]">
      <span class="text-[#F5F5F5] font-bold text-sm tracking-widest">ROCK FITNESS</span>
    </div>

    <nav class="flex flex-col gap-1 p-4 flex-1">

      <router-link
        to="/dashboard"
        class="nav-link"
        :class="{ 'nav-link-active': $route.path === '/dashboard' }"
        @click="$emit('navigate')"
      >
        <i class="pi pi-home text-base"></i>
        <span>Inicio</span>
      </router-link>

      <router-link
        to="/dashboard/pagos"
        class="nav-link"
        :class="{ 'nav-link-active': $route.path === '/dashboard/pagos' }"
        @click="$emit('navigate')"
      >
        <i class="pi pi-wallet text-base"></i>
        <span>Historial de Pagos</span>
      </router-link>

    </nav>

    <div class="p-4 border-t border-[#23374D]">
      <button
        @click="handleLogout"
        class="nav-link w-full text-red-400 hover:bg-red-500/10 transition-colors"
      >
        <i class="pi pi-sign-out text-base"></i>
        <span>Salir</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  open: Boolean,
  isMobile: Boolean
})

const emit = defineEmits(['navigate'])

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.warn("Error de red al cerrar sesión, forzando salida local.")
  } finally {
    // Cerramos el sidebar si estamos en móvil para que no quede abierto al volver
    emit('navigate')
    // Redirigimos al inicio
    router.push('/')
  }
}
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg text-[#B4B4BC] text-sm font-medium transition-colors duration-200 hover:bg-[#242830] hover:text-[#F5F5F5];
}

.nav-link-active {
  @apply bg-[#242830] text-[#4FC3F7] border-l-2 border-[#4FC3F7];
}
</style>
