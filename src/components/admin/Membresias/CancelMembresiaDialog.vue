<template>
  <Dialog :visible="visible" modal :style="{ width: '420px' }" @update:visible="$emit('close')" :showHeader="false">
    <div class="flex flex-column align-items-center pt-4 pb-2 px-3">
      <div class="w-full flex justify-content-end mb-2">
        <Button icon="pi pi-times" text severity="danger" @click="$emit('close')" />
      </div>
      <p class="text-white text-center text-lg mb-4">
        ¿Deseas cancelar la membresía de este usuario?
      </p>
      <InputText
        :value="membresia?.user?.nombre + ' ' + membresia?.user?.apellido"
        disabled class="w-full mb-4"
      />
      <div class="flex gap-3 w-full justify-content-center">
        <Button label="Sí, deseo cancelar" class="p-button-cyan" @click="confirmar" :loading="saving" />
        <Button label="Cancelar" severity="danger" @click="$emit('close')" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useMembresiaStore } from '@/stores/membresiaStore';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps(['visible', 'membresia']);
const emit = defineEmits(['close']);
const store = useMembresiaStore();
const saving = ref(false);

const confirmar = async () => {
  saving.value = true;
  const ok = await store.cambiarEstado(props.membresia.usuario_id, 'cancelada');
  saving.value = false;
  if (ok) emit('close');
};
</script>

<style scoped>
:deep(.p-inputtext) { background: #1a2535 !important; color: #fff !important; padding: 0.75rem !important; border-radius: 6px !important; width: 100% !important; }
:deep(.p-dialog-content) { background: #0d1520; border-radius: 10px; }
</style>