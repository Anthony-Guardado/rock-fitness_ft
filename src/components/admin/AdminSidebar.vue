<template>
  <aside class="w-52 min-w-[210px] h-full bg-[#111820] border-r border-cyan-500/15 flex flex-col pt-4">
    <nav class="flex flex-col gap-1 px-2 flex-1">

      <template v-if="authStore.isAuthenticated && authStore.isAdmin">
        <div class="px-3 mb-2 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Admin Menú</div>

        <router-link to="/admin/AdminDashboard" class="nav-item" active-class="nav-item-active">
          <i class="pi pi-home text-base" />
          <span>Inicio Admin</span>
        </router-link>

        <router-link to="/admin/GestionUsuarios" class="nav-item" active-class="nav-item-active">
          <i class="pi pi-users text-base" />
          <span>Usuarios</span>
        </router-link>

        <router-link to="/admin/GestionMembresias" class="nav-item" active-class="nav-item-active">
          <i class="pi pi-id-card text-base" />
          <span>Membresías</span>
        </router-link>

        <router-link to="/admin/GestionPagos" class="nav-item" active-class="nav-item-active">
        <i class="pi pi-money-bill" />
        <span>Gestión Pagos</span>
        </router-link>

        <router-link to="/admin/Reportes" class="nav-item" active-class="nav-item-active">
          <i class="pi pi-file text-base" />
          <span>Reportes</span>
        </router-link>
      </template>

      <template v-if="authStore.isAuthenticated && !authStore.isAdmin">
        <div class="px-3 mb-2 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Mi Espacio</div>

        <router-link to="/dashboard" class="nav-item" active-class="nav-item-active">
          <i class="pi pi-th-large text-base" />
          <span>Mi Panel</span>
        </router-link>

        <router-link to="/dashboard/pagos" class="nav-item" active-class="nav-item-active">
          <i class="pi pi-history text-base" />
          <span>Historial Pagos</span>
        </router-link>
      </template>

      <div class="mt-auto border-t border-white/5 pt-4 mb-4">
        <button
          v-if="authStore.isAuthenticated"
          class="nav-item hover:!bg-red-500/10 hover:!text-red-400 group"
          @click="handleLogout"
        >
          <i class="pi pi-sign-out text-base group-hover:rotate-180 transition-transform duration-300" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

    </nav>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.warn("Error en logout de red, procediendo con limpieza local.")
  } finally {
    router.push('/')
  }
}
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-3 py-3 rounded-lg
         text-slate-400 text-sm font-medium transition-all duration-200
         border-none bg-transparent cursor-pointer w-full text-left no-underline;
}
.nav-item:hover {
  @apply bg-cyan-500/[0.07] text-slate-300;
}
.nav-item-active {
  @apply bg-cyan-500/[0.12] text-cyan-400 border-l-[3px] border-l-cyan-400;
}
</style>
