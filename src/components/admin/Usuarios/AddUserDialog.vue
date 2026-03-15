<template>
  <Dialog
    :visible="visible"
    modal
    header="AGREGAR NUEVO"
    :style="{ width: '560px' }"
    :closable="false"
    class="rock-dialog"
    @update:visible="$emit('close')">

    <template #header>
      <div class="flex items-center justify-between w-full">
        <span class="text-sm font-bold tracking-widest text-slate-100">AGREGAR NUEVO USUARIO</span>
        <Button icon="pi pi-times" rounded text severity="danger" @click="$emit('close')" class="!w-7 !h-7" />
      </div>
    </template>

    <div class="grid grid-cols-2 gap-4 pt-2">
      <InputText v-model="form.nombre"     placeholder="Nombre"     class="rock-input" />
      <InputText v-model="form.telefono"   placeholder="Teléfono"   class="rock-input" />
      <InputText v-model="form.apellido"   placeholder="Apellido"   class="rock-input" />
      <InputText v-model="form.dui"        placeholder="DUI"        class="rock-input" />
      <Password  v-model="form.contrasena" placeholder="Contraseña" class="rock-input" :feedback="false" toggleMask />
      <InputText v-model="form.email"      placeholder="Email"      class="rock-input" />
    </div>

    <template #footer>
      <div class="flex justify-center pt-2">
        <Button label="Guardar" class="!bg-cyan-500 !border-cyan-500 !px-12" @click="handleGuardar" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import Dialog    from 'primevue/dialog'
import Button    from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password  from 'primevue/password'

defineProps({ visible: Boolean })
defineEmits(['close'])

const form = ref({ nombre: '', apellido: '', contrasena: '', telefono: '', dui: '', email: '' })

const handleGuardar = () => {
  console.log('Nuevo usuario:', form.value)
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
.rock-input.p-inputtext, .rock-input .p-inputtext {
  background: #0d1520 !important;
  border: 1px solid rgba(79,195,247,0.2) !important;
  color: #c8dde8 !important;
  border-radius: 8px !important;
  width: 100% !important;
}
.rock-input.p-inputtext::placeholder, .rock-input .p-inputtext::placeholder {
  color: #4a6070 !important;
}
.rock-input.p-inputtext:focus, .rock-input .p-inputtext:focus {
  border-color: rgba(79,195,247,0.5) !important;
  box-shadow: none !important;
}
</style>