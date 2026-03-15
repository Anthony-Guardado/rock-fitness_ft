<template>
  <div class="min-h-screen flex flex-col bg-[#181A1F]">

    <!-- Navbar -->
    <Navbar @toggleSidebar="toggleSidebar" />

    <div class="flex flex-1 relative">

      <!-- Overlay mobile -->
      <div
        v-if="sidebarOpen && isMobile"
        class="fixed inset-0 bg-black/40 z-30"
        @click="closeSidebar"
      ></div>

      <!-- Sidebar -->
      <UserSidebar
        :open="sidebarOpen"
        :isMobile="isMobile"
        @navigate="closeSidebar"
      />

      <!-- Contenido principal -->
      <main
        :class="[
          'flex-1 p-6 overflow-y-auto transition-all duration-300',
          !isMobile ? 'ml-60' : ''
        ]"
      >
        <!-- Overlay de planes si membresía vencida -->
        <PlanesMembresia v-if="membresiaVencida" />

        <!-- Aquí se renderizan las vistas -->
        <router-view />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Navbar from '@/components/shared/Navbar.vue'
import UserSidebar from '@/components/user/UserSidebar.vue'
import PlanesMembresia from '@/components/user/PlanesMembresia.vue'

const sidebarOpen = ref(false)
const isMobile = ref(false)

// Por ahora hardcodeado, después viene del store
const membresiaVencida = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768

  if (!isMobile.value) {
    sidebarOpen.value = true
  } else {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
</script>
