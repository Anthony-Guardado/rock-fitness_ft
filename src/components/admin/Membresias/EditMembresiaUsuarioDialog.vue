<template>
  <Dialog
    :visible="visible"
    modal
    :style="{ width: '520px' }"
    :closable="false"
    class="rock-dialog"
    @update:visible="$emit('close')">

    <template #header>
      <div class="flex items-center justify-between w-full">
        <span class="text-sm font-bold tracking-widest text-slate-100">EDITAR MEMBRESIA</span>
        <Button icon="pi pi-times" rounded text severity="danger" @click="$emit('close')" class="!w-7 !h-7" />
      </div>
    </template>

    <div class="grid grid-cols-2 gap-4 pt-2">
      <InputText v-model="form.cliente" placeholder="Nombre del cliente" class="rock-input" />
      <Dropdown
        v-model="form.tipo"
        :options="tiposMembresia"
        placeholder="Tipo de membresía"
        class="rock-dropdown w-full" />
    </div>

    <template #footer>
      <div class="flex justify-center pt-2">
        <Button label="Guardar" class="!bg-cyan-500 !border-cyan-500 !px-12" @click="handleGuardar" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog    from 'primevue/dialog'
import Button    from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown  from 'primevue/dropdown'

const props = defineProps({ visible: Boolean, membresia: Object })
defineEmits(['close'])

const tiposMembresia = ['Básica', 'Premium', 'VIP']
const form = ref({ cliente: '', tipo: null })

watch(() => props.membresia, (val) => {
  if (val) form.value = { cliente: val.cliente || '', tipo: val.tipo || null }
}, { immediate: true })

const handleGuardar = () => {
  console.log('Editar membresía usuario:', form.value)
}
</script>

<style>
.rock-dialog .p-dialog {
  background: #111820 !important;
  border: 1px solid rgba(79,195,247,0.2) !important;
  border-radius: 14px !important;
}
.rock-dialog .p-dialog-header {
  background: #111820 !important;
  padding: 20px 24px 12px !important;
}
.rock-dialog .p-dialog-content {
  background: #111820 !important;
  padding: 0 24px 8px !important;
}
.rock-dialog .p-dialog-footer {
  background: #111820 !important;
  padding: 8px 24px 24px !important;
  border-top: none !important;
}
.rock-input.p-inputtext {
  background: #0d1520 !important;
  border: 1px solid rgba(79,195,247,0.2) !important;
  color: #c8dde8 !important;
  border-radius: 8px !important;
  width: 100% !important;
}
.rock-input.p-inputtext::placeholder { color: #4a6070 !important; }
.rock-input.p-inputtext:focus {
  border-color: rgba(79,195,247,0.5) !important;
  box-shadow: none !important;
}
.rock-dropdown.p-dropdown {
  background: #0d1520 !important;
  border: 1px solid rgba(79,195,247,0.2) !important;
  border-radius: 8px !important;
}
.rock-dropdown.p-dropdown .p-dropdown-label {
  color: #4a6070 !important;
}
.rock-dropdown.p-dropdown.p-focus {
  border-color: rgba(79,195,247,0.5) !important;
  box-shadow: none !important;
}
.p-dropdown-panel {
  background: #0d1520 !important;
  border: 1px solid rgba(79,195,247,0.2) !important;
}
.p-dropdown-panel .p-dropdown-item {
  color: #c8dde8 !important;
}
.p-dropdown-panel .p-dropdown-item:hover {
  background: rgba(79,195,247,0.08) !important;
}
</style>