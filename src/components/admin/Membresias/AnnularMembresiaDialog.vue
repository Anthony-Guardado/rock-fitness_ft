<template>
  <Dialog
    :visible="visible"
    modal
    :style="{ width: '480px' }"
    :closable="false"
    class="rock-dialog"
    @update:visible="$emit('close')">

    <template #header>
      <div class="flex justify-end w-full">
        <Button icon="pi pi-times" rounded text severity="danger" @click="$emit('close')" class="!w-7 !h-7" />
      </div>
    </template>

    <div class="flex flex-col items-center gap-6 px-4 pb-2">
      <p class="text-center text-base font-semibold text-slate-100 leading-relaxed">
        ¿Deseas anular la membresía de este usuario?
      </p>
      <InputText v-model="form.nombre" placeholder="Nombre" class="rock-input w-full" />
      <div class="flex gap-4 w-full justify-center">
        <Button label="Si, deseo anular." class="!bg-cyan-500 !border-cyan-500 !px-6" @click="handleConfirm" />
        <Button label="Cancelar" severity="danger" class="!px-8" @click="$emit('close')" />
      </div>
    </div>

    <template #footer></template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog    from 'primevue/dialog'
import Button    from 'primevue/button'
import InputText from 'primevue/inputtext'

const props = defineProps({ visible: Boolean, membresia: Object })
defineEmits(['close'])

const form = ref({ nombre: '' })

watch(() => props.membresia, (val) => {
  if (val) form.value.nombre = val.cliente || ''
}, { immediate: true })

const handleConfirm = () => {
  console.log('Anular membresía:', form.value.nombre)
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
  padding: 16px 20px 0 !important;
}
.rock-dialog .p-dialog-content {
  background: #111820 !important;
  padding: 8px 24px !important;
}
.rock-dialog .p-dialog-footer {
  background: #111820 !important;
  padding: 0 !important;
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
</style>