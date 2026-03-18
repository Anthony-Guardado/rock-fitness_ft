<template>
  <!-- aca hay unos estilos globales que estan desde la configuracion de tailwind
  ya que los colores de la empresa ya estan difinidos -->
  <div class="min-h-screen flex flex-col bg-gym-base text-gym-text font-inter">

    <NavbarHome />

    <main class="flex-grow flex flex-col items-center justify-start w-full">
      <HeroSection />
    </main>

    <Footer />

  </div>
</template>

<script setup>
// Importacion del footer
import Footer from '@/components/shared/Footer.vue'

//Importacion de la pantalla principal
import HeroSection from '@/components/home/HeroSection.vue'

//Importacion del navbar
import NavbarHome from '@/components/home/NavbarHome.vue'
</script>
