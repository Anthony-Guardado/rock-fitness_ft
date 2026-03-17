<template>
  <aside class="w-52 min-w-[210px] h-full bg-[#111820] border-r border-cyan-500/15 flex flex-col pt-4">
    <nav class="flex flex-col gap-1 px-2 flex-1">

      <router-link to="/admin/AdminDashboard" exact
        class="nav-item"
        active-class="nav-item-active">
        <i class="pi pi-home text-base" />
        <span>Inicio</span>
      </router-link>

      <router-link to="/admin/GestionUsuarios"
        class="nav-item"
        active-class="nav-item-active">
        <i class="pi pi-users text-base" />
        <span>Gestión de Usuarios</span>
      </router-link>

      <router-link to="/admin/GestionMembresias"
        class="nav-item"
        active-class="nav-item-active">
        <i class="pi pi-id-card text-base" />
        <span>Gestión de membresías</span>
      </router-link>\

      <router-link to="/admin/GestionMembresias"
        class="nav-item"
        active-class="nav-item-active">
        <i class="pi pi-id-card text-base" />
        <span>Historial de pagos</span>
      </router-link>

      <router-link to="/admin/Reportes"
        class="nav-item"
        active-class="nav-item-active">
        <i class="pi pi-file text-base" />
        <span>Reporte de pagos</span>
      </router-link>

      <button
        class="nav-item mt-auto hover:!bg-red-500/10 hover:!text-red-400"
        @click="handleLogout">
        <i class="pi pi-sign-out text-base" />
        <span>Salir</span>
      </button>

    </nav>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleLogout = () => router.push('/login')
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
