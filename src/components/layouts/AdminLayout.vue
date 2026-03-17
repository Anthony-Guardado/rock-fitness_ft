<template>
  <div class="flex flex-col h-screen bg-[#0d1117] text-slate-100 overflow-hidden">

    <!-- NAVBAR -->
   <Navbar @toggleSidebar="toggleSidebar" />

      <!-- Right -->
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-slate-100">Administrador</span>
        <Button icon="pi pi-bell"    text rounded severity="secondary" class="!text-slate-400 hover:!text-cyan-400" />
        <Button icon="pi pi-cog"     text rounded severity="secondary" class="!text-slate-400 hover:!text-cyan-400" />
      </div>


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
import Navbar from '../shared/Navbar.vue';


</script>
