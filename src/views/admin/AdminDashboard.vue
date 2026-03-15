<template>
  <div class="flex items-center justify-center h-full min-h-[calc(100vh-64px)]">
    <div class="relative w-full max-w-lg bg-[#111820] border border-cyan-500/30 rounded-2xl px-10 py-12 flex flex-col items-center gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

      <!-- Glow top -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <!-- Avatar -->
      <div class="avatar-ring">
        <div class="w-full h-full rounded-full bg-[#161d26] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 80 80" fill="none" class="w-20 h-20">
            <circle cx="40" cy="40" r="38" fill="#1e2a35" stroke="#4fc3f7" stroke-width="1.5"/>
            <circle cx="40" cy="30" r="14" fill="#2d3e4e"/>
            <ellipse cx="40" cy="65" rx="22" ry="14" fill="#2d3e4e"/>
          </svg>
        </div>
      </div>

      <!-- Name badge -->
      <div class="flex items-center gap-2 bg-cyan-500/[0.06] border border-cyan-500/20 rounded-lg px-6 py-2.5 min-w-[220px] justify-center">
        <span class="text-xs text-slate-400 font-medium tracking-wide">Administrador:</span>
        <span class="text-sm font-semibold text-slate-100">{{ adminName }}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const adminName = ref('Juan Pérez')
</script>

<style scoped>
.avatar-ring {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #4fc3f7, #0d1117 60%, #4fc3f7);
  padding: 2px;
  animation: spin-slow 8s linear infinite;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>