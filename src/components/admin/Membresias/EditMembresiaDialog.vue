<template>
  <Dialog 
    :visible="visible" 
    modal 
    :style="{ width: '420px' }" 
    @update:visible="$emit('close')" 
    :showHeader="false"
  >
    <div class="bg-slate-900 text-white rounded-2xl px-6 py-7 relative shadow-xl">

      
      <button 
        class="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
        @click="$emit('close')"
      >
        ✕
      </button>

      
      <p class="text-center text-xl font-semibold mb-1">
        Editar membresía
      </p>

    
      
      <div v-if="local" class="space-y-4">

        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-400">Tipo actual</label>
            <InputText 
              :value="local.membresia?.nombre" 
              disabled 
              class="mt-1 w-full"
            />
          </div>

          <div>
            <label class="text-xs text-gray-400">Precio actual</label>
            <InputText 
              :value="'$' + local.membresia?.precio" 
              disabled 
              class="mt-1 w-full"
            />
          </div>
        </div>

        
        <div>
          <label class="text-xs text-gray-400">Nuevo tipo de membresía</label>
          <Dropdown
            v-model="nuevoTipo"
            :options="tipos"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccionar tipo"
            class="w-full mt-1"
            :class="{ 'p-invalid': submitted && !nuevoTipo }"
          />
          <small v-if="submitted && !nuevoTipo" class="p-error">
            Selecciona un tipo
          </small>
        </div>

      </div>

      <!-- Botón -->
      <div class="mt-6">
        <button
          class="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2.5 rounded-lg transition"
          @click="handleSave"
          :disabled="saving"
        >
          {{ saving ? 'Guardando...' : 'Guardar cambios' }}
        </button>
      </div>

    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useMembresiaStore } from '@/stores/membresiaStore';
import { membresiaService } from '@/services/membresiaService';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const props = defineProps(['visible', 'membresia']);
const emit = defineEmits(['close']);
const store = useMembresiaStore();

const local = ref(null);
const nuevoTipo = ref(null);
const tipos = ref([]);
const saving = ref(false);
const submitted = ref(false);

onMounted(async () => {
  try {
    const { data } = await membresiaService.getTipos();
    tipos.value = data.data ?? data;
  } catch {
    tipos.value = [];
  }
});

watch(() => props.membresia, (val) => {
  if (val) {
    local.value = { ...val, membresia: { ...val.membresia } };
    nuevoTipo.value = val.membresia_id;
    submitted.value = false;
  }
});

const handleSave = async () => {
  submitted.value = true;
  if (!nuevoTipo.value) return;
  saving.value = true;
  const ok = await store.cambiarTipo(local.value.usuario_id, nuevoTipo.value);
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

/* Inputs */
:deep(.p-inputtext),
:deep(.p-dropdown) {
  background: #1e293b !important; /* slate-800 */
  color: #fff !important;
  border: 1px solid #334155 !important;
  padding: 0.6rem !important;
  border-radius: 8px !important;
}

/* Placeholder dropdown */
:deep(.p-dropdown .p-dropdown-label) {
  color: #cbd5f5 !important;
}

/* Error */
.p-error {
  color: #f87171 !important;
  font-size: 0.7rem;
  margin-top: 4px;
  font-weight: bold;
}
</style>