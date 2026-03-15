<template>
  <div class="min-h-screen flex flex-col bg-gym-base text-gym-text font-inter">

    <NavbarHome />

    <main class="flex-grow flex flex-col items-center justify-start w-full">
      <HeroSection />
    </main>

    <Footer />

  </div>
</template>

<script setup>
// 1. Importamos el Footer
import Footer from '@/components/shared/Footer.vue'

// 2. Importamos el HeroSection
import HeroSection from '@/components/home/HeroSection.vue'

// 3. Importamos el Navbar
import NavbarHome from '@/components/home/NavbarHome.vue'
</script>
