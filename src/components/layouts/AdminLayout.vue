<template>
  <div class="flex flex-col h-screen bg-[#0d1117] text-slate-100">

    <!-- NAVBAR -->
   <Navbar @toggleSidebar="toggleSidebar" />

      <div class="flex items-center gap-4">
        <div class="flex flex-col items-end mr-2">
          <span class="text-sm font-semibold text-slate-100">Administrador</span>
        
        </div>
        <Button icon="pi pi-bell" text rounded severity="secondary" class="!text-slate-400" />
        <Button icon="pi pi-cog" text rounded severity="secondary" class="!text-slate-400" />
      </div>


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
import Button from 'primevue/button'
import Navbar from '../shared/Navbar.vue';


</script>
