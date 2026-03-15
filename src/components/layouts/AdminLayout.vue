<template>
  <div class="flex flex-col h-screen bg-[#0d1117] text-slate-100">

    <header class="flex items-center justify-between px-6 h-16 bg-[#0d1520] border-b border-cyan-500/20 z-20">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold tracking-[2.5px] text-cyan-400">ROCK FITNESS</span>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex flex-col items-end mr-2">
          <span class="text-sm font-semibold text-slate-100">Administrador</span>
        
        </div>
        <Button icon="pi pi-bell" text rounded severity="secondary" class="!text-slate-400" />
        <Button icon="pi pi-cog" text rounded severity="secondary" class="!text-slate-400" />
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <AdminSidebar />

      <main class="flex-1 overflow-y-auto p-8 bg-[#101720]">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import Button from 'primevue/button' // Asegúrate de que esto funcione o regístralo global
</script>

<style scoped>
/* Un toque de elegancia: transición suave entre pantallas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>