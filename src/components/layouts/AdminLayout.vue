<template>
  <div class="flex flex-col h-screen bg-[#0d1117] text-slate-100 overflow-hidden">

    <!-- NAVBAR -->
    <header class="flex items-center justify-between px-6 h-16 bg-[#0d1117] border-b border-cyan-500/25 shrink-0 z-10">

      <!-- Logo -->
      <div class="flex items-center gap-2">
        
        <span class="text-xs font-bold tracking-[2.5px] text-slate-100">ROCK FITNESS</span>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-slate-100">Administrador</span>
        <Button icon="pi pi-bell"    text rounded severity="secondary" class="!text-slate-400 hover:!text-cyan-400" />
        <Button icon="pi pi-cog"     text rounded severity="secondary" class="!text-slate-400 hover:!text-cyan-400" />
      </div>
    </header>

    <!-- BODY -->
    <div class="flex flex-1 overflow-hidden">
      <AdminSidebar />
      <main class="flex-1 overflow-y-auto bg-[#0d1117] p-8">
        <router-view />
      </main>
    </div>

  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import Button from 'primevue/button'
</script>