<template>
  <footer class="bg-gym-card border-t border-gym-border text-gym-muted pt-12 pb-6 font-inter mt-auto">
    <div class="container mx-auto px-6">

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

        <div class="flex flex-col gap-4">
          <h3 class="font-poppins font-bold text-2xl text-gym-text uppercase tracking-wide">
            Rock Fitness
          </h3>
          <p class="text-sm leading-relaxed">
            Donde la disciplina se vuelve inquebrantable.
            Invertir tiempo en tu salud es la mejor decisión que puedes tomar hoy.
          </p>
          <div class="flex gap-4 mt-2">
            <a  class="hover:text-gym-accent transition-colors duration-300">
              <i class="pi pi-facebook text-xl"></i>
            </a>
            <a  class="hover:text-gym-accent transition-colors duration-300">
              <i class="pi pi-instagram text-xl"></i>
            </a>
            <a  class="hover:text-gym-accent transition-colors duration-300">
              <i class="pi pi-twitter text-xl"></i>
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="font-poppins font-semibold text-gym-text text-lg">Enlaces Rápidos</h4>
          <ul class="flex flex-col gap-2 text-sm">
            <router-link  to="/" class="hover:text-gym-accent transition-colors">Inicio</router-link>
            <router-link  to="/suscripciones" class="hover:text-gym-accent transition-colors">Suscripciones</router-link>


          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="font-poppins font-semibold text-gym-text text-lg">Contacto</h4>
          <ul class="flex flex-col gap-3 text-sm">
            <li class="flex items-center gap-2">
              <i class="pi pi-map-marker text-gym-accent"></i>
              <span>Km. 75 Carretera hacia Chalatenango frente a Estadio Municipal Gregorio Martínez, Cantón Upatoro, Chalatenango, El Salvador.</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-phone text-gym-accent"></i>
              <span>+503 7290-1221</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-envelope text-gym-accent"></i>
              <span>rockfitness@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="border-t border-gym-border pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">

        <p>&copy; 2026 Rock Fitness.</p>

        <div class="flex items-center gap-2 font-poppins">
          <i class="pi pi-code text-gym-accent"></i>
          <span class="text-gym-text font-medium tracking-wide ">
              Desarrolladores en proceso
          </span>
        </div>

      </div>
    </div>
  </footer>
</template>



<style scoped>
a {
  text-decoration: none;
}
</style>
