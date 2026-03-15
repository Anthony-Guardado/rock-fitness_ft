<template>
  <header class="flex items-center justify-between px-6 h-16 bg-[#1F232A] border-b border-[#23374D]">

    <!-- Logo -->
    <div class="flex items-center gap-1">
      <span class="text-[#F5F5F5] font-bold text-sm tracking-widest">ROCK FITNESS</span>
    </div>
    <!-- Usuario -->
    <div class="flex items-center gap-3">
      <span class="text-[#F5F5F5] font-semibold text-sm tracking-wider">
        PANEL {{ authStore.isAdmin ? 'ADMIN' : 'CLIENTE' }}
      </span>
      <div class="w-9 h-9 rounded-full border border-[#4FC3F7] flex items-center justify-center">
        <i class="pi pi-user text-[#4FC3F7]"></i>
      </div>
    </div>

  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>
