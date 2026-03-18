<template>
  <div class="relative w-full min-h-[85vh] flex items-center justify-center font-inter overflow-hidden">

    <img
      src="@/assets/logo1.jpeg"
      alt="Fondo Gimnasio Rock Fitness"
      class="absolute inset-0 w-full h-full object-cover z-0"
    />

    <div class="absolute inset-0 bg-gym-base/90 z-10"></div>

    <div class="container mx-auto px-6 relative z-10 py-12 text-gym-text grid md:grid-cols-12 gap-10 items-center">

      <div class="md:col-span-7 flex flex-col gap-12">
        <h1 class="font-poppins font-bold text-5xl md:text-6xl uppercase tracking-tighter leading-none text-gym-text">
          Donde la disciplina<br>
          se vuelve<br>
          <span class="text-gym-accent">inquebrantable</span>
        </h1>

        <div class="flex items-start gap-6 bg-gym-card/50 p-6 rounded-lg border border-gym-border max-w-2xl">
          <div class="flex flex-wrap gap-4 pt-1">
            <svg class="w-10 h-10 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path><text x="12" y="17" text-anchor="middle" font-size="8" font-family="Poppins" font-weight="bold" fill="currentColor">12</text></svg>
            <svg class="w-10 h-10 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 00-6.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
          </div>
          <p class="font-inter font-medium text-xl leading-relaxed">
            <span class="font-semibold text-gym-accent">Invertir tu tiempo</span> en tu salud<br>
            es la mejor opción.
          </p>
        </div>
      </div>

      <div class="md:col-span-5 flex justify-center items-center py-10 md:py-0">
        <img
          src="@/assets/logo2.jpeg"
          alt="Rock Fitness Logo Oficial"
          class="w-full max-w-[320px] md:max-w-[420px] h-auto object-contain drop-shadow-glow"
        />
      </div>

    </div>
  </div>
</template>


