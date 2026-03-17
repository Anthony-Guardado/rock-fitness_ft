<template>
  <!-- Overlay oscuro -->
  <div class="fixed inset-0 bg-[#181A1F] z-50 flex items-center justify-center">

    <div class="flex flex-col items-center gap-8 p-8">

       <button
        class="absolute top-0 right-0 text-[#B4B4BC] hover:text-[#F5F5F5] transition-colors"
        @click="$emit('cerrar')">
        <i class="pi pi-times text-xl"></i>
      </button>

      <!-- Título -->
      <h2 class="text-[#F5F5F5] text-2xl font-bold tracking-wide">
        Elige tu membresía
      </h2>

      <!-- Cards -->
      <div class="flex flex-col md:flex-row gap-6">

        <!-- Básica -->
        <Card style="width: 200px; background: #1F232A; border: 1px solid #23374D;">
          <template #title>
            <span class="text-[#F5F5F5]">Básica</span>
          </template>
          <template #subtitle>
            <span class="text-[#B4B4BC]">1 mes</span>
          </template>
          <template #content>
            <p class="text-[#4FC3F7] text-3xl font-bold text-center m-0">$15.00</p>
          </template>
          <template #footer>
            <Button
              label="Elegir"
              class="w-full"
              @click="elegir('basica')"
            />
          </template>
        </Card>

        <!-- Premium -->
        <Card style="width: 200px; background: #1F232A; border: 2px solid #4FC3F7;">
          <template #title>
            <div class="flex items-center justify-between">
              <span class="text-[#F5F5F5]">Premium</span>
              <span class="text-xs bg-[#4FC3F7] text-[#181A1F] font-bold px-2 py-1 rounded-full">Popular</span>
            </div>
          </template>
          <template #subtitle>
            <span class="text-[#B4B4BC]">3 meses</span>
          </template>
          <template #content>
            <p class="text-[#4FC3F7] text-3xl font-bold text-center m-0">$30.00</p>
          </template>
          <template #footer>
            <Button
              label="Elegir"
              class="w-full"
              @click="elegir('premium')"
            />
          </template>
        </Card>

        <!-- VIP -->
        <Card style="width: 200px; background: #1F232A; border: 1px solid #23374D;">
          <template #title>
            <span class="text-[#F5F5F5]">VIP</span>
          </template>
          <template #subtitle>
            <span class="text-[#B4B4BC]">6 meses</span>
          </template>
          <template #content>
            <p class="text-[#4FC3F7] text-3xl font-bold text-center m-0">$60.00</p>
          </template>
          <template #footer>
            <Button
              label="Elegir"
              class="w-full"
              @click="elegir('vip')"
            />
          </template>
        </Card>

      </div>

    </div>
  </div>
</template>

<script setup>
const elegir = (plan) => {
  // Después aquí se emite el plan elegido y se abre el modal de pago
  console.log('Plan elegido:', plan)
}

</script>
