<template>
  <nav class="bg-gym-card border-b border-gym-border sticky top-0 z-50 font-inter">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">

        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-2xl font-poppins font-bold text-gym-text uppercase tracking-wide">
            Gym<span class="text-gym-accent">Rook</span>
          </router-link>
        </div>

        <div class="hidden md:flex space-x-8">

          <router-link
            to="/"
            class="text-gym-muted hover:text-gym-accent transition-colors font-medium"
            active-class="text-gym-accent"
          >
            Inicio
          </router-link>

          <router-link
            to="/suscripciones"
            class="text-gym-muted hover:text-gym-accent transition-colors font-medium"
            active-class="text-gym-accent"
          >
            Suscripciones
          </router-link>

        </div>

        <div class="flex items-center space-x-4">
          <router-link
            to="/login"
            class="text-gym-text hover:text-gym-accent transition-colors font-medium text-sm px-3 py-2"
          >
            Iniciar Sesión
          </router-link>

          <router-link
            to="/register"
            class="bg-gym-accent hover:bg-[#3ab0e5] text-gym-base font-poppins font-bold text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Registrarse
          </router-link>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
// No necesitamos nada aquí, los router-link hacen toda la magia
</script>
