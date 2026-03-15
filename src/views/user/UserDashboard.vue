<template>
  <div class="flex flex-col gap-6">

    <!-- Card principal del usuario -->
    <div class="bg-[#1F232A] border border-[#23374D] rounded-xl p-8 flex flex-col items-center gap-4">

      <!-- Foto de perfil -->
      <div class="w-24 h-24 rounded-full bg-[#242830] border-2 border-[#4FC3F7] flex items-center justify-center">
        <i class="pi pi-user text-[#4FC3F7] text-4xl"></i>
      </div>

      <!-- Nombre y correo -->
      <div class="text-center">
        <h2 class="text-[#F5F5F5] text-xl font-bold">Juan Pérez</h2>
        <p class="text-[#B4B4BC] text-sm">juan@gmail.com</p>
      </div>

      <!-- Estado membresía -->
      <div class="w-full bg-[#242830] border border-[#23374D] rounded-lg p-4 flex flex-col gap-3 mt-2">
        <div class="flex items-center justify-between">
          <span class="text-[#B4B4BC] text-sm">Estado</span>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400">
            Activa
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[#B4B4BC] text-sm">Plan</span>
          <span class="text-[#F5F5F5] text-sm font-semibold">Premium</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[#B4B4BC] text-sm">Expira el</span>
          <span class="text-[#F5F5F5] text-sm font-semibold">30/06/2025</span>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex flex-wrap justify-center gap-3 mt-2">
        <Button label="Editar perfil" icon="pi pi-user-edit" @click="modalPerfil = true" />
        <Button label="Cambiar plan" icon="pi pi-sync" severity="secondary" @click="modalPlan = true" />
        <Button label="Cancelar membresía" icon="pi pi-times-circle" severity="danger" outlined
          @click="modalCancelar = true" />
      </div>

    </div>

    <!-- ===== MODAL EDITAR PERFIL ===== -->
    <Dialog v-model:visible="modalPerfil" header="EDITAR PERFIL"
      :style="{ width: '30rem', background: '#1F232A', border: '1px solid #23374D' }" :modal="true">
      <div class="flex flex-col gap-5 pt-2">

        <!-- Foto de perfil -->
        <div class="flex flex-col gap-1">
          <span class="text-[#F5F5F5] font-semibold text-sm">FOTO DE PERFIL</span>
          <input type="file" accept="image/*"
            class="text-[#B4B4BC] text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#4FC3F7] file:text-[#181A1F] file:font-semibold cursor-pointer" />
        </div>

        <!-- Info de contacto -->
        <div class="flex flex-col gap-3">
          <span class="text-[#F5F5F5] font-semibold text-sm">INFORMACIÓN DE CONTACTO</span>
          <div class="flex flex-col gap-1">
            <label class="text-[#B4B4BC] text-xs">Número telefónico</label>
            <InputText v-model="telefono" placeholder="Número telefónico" class="w-full" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[#B4B4BC] text-xs">Correo electrónico</label>
            <InputText v-model="correo" placeholder="Correo electrónico" class="w-full" />
          </div>
        </div>

      </div>

      <template #footer>
        <Button label="GUARDAR" class="w-full" @click="modalPerfil = false" />
      </template>
    </Dialog>

    <!-- ===== MODAL CAMBIAR PLAN ===== -->
    <Dialog v-model:visible="modalPlan" header="CAMBIAR PLAN"
      :style="{ width: '30rem', background: '#1F232A', border: '1px solid #23374D' }" :modal="true">
      <div class="flex flex-col gap-4 pt-2">
        <span class="text-[#B4B4BC] text-sm">Selecciona tu nuevo plan:</span>

        <div class="flex flex-col gap-3">
          <div v-for="plan in planes" :key="plan.id" :class="[
            'flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors duration-200',
            planSeleccionado === plan.id
              ? 'border-[#4FC3F7] bg-[#4FC3F7]/10'
              : 'border-[#23374D] bg-[#242830]'
          ]" @click="planSeleccionado = plan.id">
            <div>
              <p class="text-[#F5F5F5] font-semibold text-sm m-0">{{ plan.nombre }}</p>
              <p class="text-[#B4B4BC] text-xs m-0">{{ plan.duracion }}</p>
            </div>
            <span class="text-[#4FC3F7] font-bold">{{ plan.precio }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="right gap-2">
          <Button label="Cancelar" severity="secondary" outlined class="w-full" @click="modalPlan = false" />
          <Button label="Realizar pago" class="w-full" @click="modalPlan = false" />
        </div>
      </template>
    </Dialog>

    <!-- ===== MODAL CANCELAR MEMBRESÍA ===== -->
    <Dialog v-model:visible="modalCancelar" header="CANCELAR MEMBRESÍA"
      :style="{ width: '28rem', background: '#1F232A', border: '1px solid #23374D' }" :modal="true">
      <div class="flex flex-col items-center gap-4 pt-2">
        <i class="pi pi-exclamation-triangle text-red-400 text-5xl"></i>
        <p class="text-[#F5F5F5] text-center text-sm">
          ¿Estás seguro que deseas cancelar tu membresía? Esta acción no se puede deshacer.
        </p>
      </div>

      <template #footer>
        <div class="right gap-2">
          <Button label="No, mantener" severity="secondary" outlined class="w-full" @click="modalCancelar = false" />
          <Button label="Sí, cancelar" severity="danger" class="w-full" @click="modalCancelar = false" />
        </div>
      </template>
    </Dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const modalPerfil = ref(false)
const modalPlan = ref(false)
const modalCancelar = ref(false)

const telefono = ref('')
const correo = ref('')
const planSeleccionado = ref(null)

const planes = [
  { id: 1, nombre: 'Básica', duracion: '1 mes', precio: '$15.00' },
  { id: 2, nombre: 'Premium', duracion: '3 meses', precio: '$30.00' },
  { id: 3, nombre: 'VIP', duracion: '6 meses', precio: '$60.00' },
]
</script>

<style>
.p-dialog {
  background: #1F232A !important;
  border: 1px solid #23374D !important;
}

.p-dialog .p-dialog-header {
  background: #1F232A !important;
  color: #F5F5F5 !important;
  border-bottom: 1px solid #23374D !important;
}

.p-dialog .p-dialog-content {
  background: #1F232A !important;
  color: #F5F5F5 !important;
}

.p-dialog .p-dialog-footer {
  background: #1F232A !important;
  border-top: 1px solid #23374D !important;
}
</style>
