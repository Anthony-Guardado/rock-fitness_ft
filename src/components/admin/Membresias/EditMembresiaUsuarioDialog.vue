<template>
  <Dialog :visible="visible" modal header="EDITAR MEMBRESÍA USUARIO" :style="{ width: '420px' }" @update:visible="$emit('close')">
    <div class="grid p-fluid mt-2" v-if="local">

      <div class="col-6 mb-3">
        <label class="text-xs text-blue-400 ml-1">Cliente</label>
        <InputText :value="local.user?.nombre + ' ' + local.user?.apellido" disabled class="mt-1" />
      </div>

      <div class="col-6 mb-3">
        <label class="text-xs text-blue-400 ml-1">Tipo actual</label>
        <InputText :value="local.membresia?.nombre" disabled class="mt-1" />
      </div>

      <div class="col-12 mb-3">
        <label class="text-xs text-blue-400 ml-1">Nuevo tipo de membresía</label>
        <Dropdown
          v-model="nuevoTipo"
          :options="tipos"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccionar tipo"
          class="w-full mt-1"
          :class="{ 'p-invalid': submitted && !nuevoTipo }"
        />
        <small v-if="submitted && !nuevoTipo" class="p-error">Selecciona un tipo</small>
      </div>

    </div>

    <template #footer>
      <div class="flex justify-content-center pb-3">
        <Button label="Guardar" class="p-button-cyan w-6" @click="handleSave" :loading="saving" />
      </div>
    </template>
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
:deep(.p-inputtext),
:deep(.p-dropdown) {
  background: #ffffff !important;
  color: #111820 !important;
  padding: 0.75rem !important;
  border-radius: 6px !important;
  width: 100% !important;
}
:deep(.p-dropdown .p-dropdown-label) { color: #111820 !important; }
.p-error { color: #f87171 !important; font-size: 0.7rem; margin-top: 4px; font-weight: bold; display: block; }
:deep(.p-dialog-header) { background: #0d1520; color: white; border-bottom: 1px solid rgba(79,195,247,0.2); }
:deep(.p-dialog-content) { background: #0d1520; }
:deep(.p-dialog-footer) { background: #0d1520; border-top: none; }
</style>