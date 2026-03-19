<template>
  <Dialog 
    :visible="visible" 
    modal 
    :style="{ width: '400px' }" 
    @update:visible="$emit('close')" 
    :showHeader="false"
  >
    <div class="bg-slate-900 text-white rounded-2xl px-6 py-7 relative shadow-xl">

      <!-- Botón cerrar -->
      <button 
        class="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
        @click="$emit('close')"
      >
        ✕
      </button>

      
      <div class="flex justify-center mb-4 mt-2">
        <div class="bg-red-500/20 text-red-400 p-4 rounded-full text-2xl">
          ⚠️
        </div>
      </div>

      
      <p class="text-center text-xl font-semibold mb-1">
        ¿Cancelar membresía?
      </p>

      
      <!-- Nombre del usuario -->
      <div class="bg-slate-800 rounded-md px-3 py-2 text-center mb-6">
        {{ membresia?.user?.nombre }} {{ membresia?.user?.apellido }}
      </div>

      <!-- Botones -->
      <div class="flex gap-4 mt-2">
        <button
          class="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2.5 rounded-lg transition"
          @click="confirmar"
          :disabled="saving"
        >
          {{ saving ? 'Cancelando...' : 'Sí, cancelar' }}
        </button>

        <button
          class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition"
          @click="$emit('close')"
        >
          No, volver
        </button>
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
:deep(.p-dialog-mask) {
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.6) !important;
}

:deep(.p-dialog-content) {
  background: transparent !important;
  padding: 0;
  border-radius: 16px;
}
</style>