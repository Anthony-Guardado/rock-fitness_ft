<template>
  <div class="flex flex-col gap-6 p-4 bg-slate-900 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-blue-400 tracking-wide uppercase">
        Gestión de Membresías
      </h2>
    </div>

    <DataTable
      :value="store.membresias"
      :loading="store.loading"
      class="rock-table"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 15, 20]"
      paginator
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Mostrando {first} a {last}+ de {totalRecords}"
      stripedRows
    >
      <template #empty>
        <div class="text-center p-4 text-slate-400">No se encontraron membresías.</div>
      </template>

      <!-- user.nombre viene de la relación with(['user']) -->
      <Column header="Cliente" sortable>
        <template #body="{ data }">
          {{ data.user?.nombre }} {{ data.user?.apellido }}
        </template>
      </Column>

      <!-- membresia.nombre viene de la relación with(['membresia']) -->
      <Column header="Tipo" sortable>
        <template #body="{ data }">
          {{ data.membresia?.nombre }}
        </template>
      </Column>

      <Column header="Precio">
        <template #body="{ data }">
          ${{ data.membresia?.precio }}
        </template>
      </Column>

      <Column field="estado" header="Estado">
        <template #body="{ data }">
          <Tag :value="data.estado" :severity="getSeverity(data.estado)" />
        </template>
      </Column>

      <Column header="Acciones">
        <template #body="{ data }">
          <div class="flex gap-2 flex-wrap">
            <Button icon="pi pi-pencil"   label="Editar"    class="p-button-warning p-button-sm"                  @click="openEdit(data)" />
            <Button icon="pi pi-times"    label="Cancelar"  class="p-button-danger p-button-sm"                   @click="openCancel(data)" />
            
            <Button icon="pi pi-pause"    label="Suspender" class="p-button-warning p-button-sm p-button-outlined" @click="openSuspender(data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <EditMembresiaDialog    :visible="showEdit"      :membresia="selected" @close="showEdit = false" />
    <CancelMembresiaDialog  :visible="showCancel"    :membresia="selected" @close="showCancel = false" />
   
    <SuspendMembresiaDialog :visible="showSuspender" :membresia="selected" @close="showSuspender = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

import { useMembresiaStore } from '@/stores/membresiaStore';
import EditMembresiaDialog         from '@/components/admin/Membresias/EditMembresiaDialog.vue';
import CancelMembresiaDialog       from '@/components/admin/Membresias/CancelMembresiaDialog.vue';
import SuspendMembresiaDialog      from '@/components/admin/Membresias/SuspendMembresiaDialog.vue';

const store = useMembresiaStore();
const showEdit      = ref(false);
const showCancel    = ref(false);

const showSuspender = ref(false);
const selected      = ref(null);

onMounted(() => store.fetchMembresias());

const openEdit      = (row) => { selected.value = { ...row }; showEdit.value = true; };
const openCancel    = (row) => { selected.value = row; showCancel.value = true; };

const openSuspender = (row) => { selected.value = row; showSuspender.value = true; };

const getSeverity = (estado) => {
  switch (estado?.toLowerCase()) {
    case 'activa':     return 'success';
    case 'cancelada':  return 'danger';
    case 'suspendida': return 'warning';
    case 'inactiva':   return 'secondary';
    default:           return 'info';
  }
};
</script>

<style>
.rock-table.p-datatable { background: #0d1520 !important; border-radius: 12px; border: 1px solid rgba(79,195,247,0.1); }
.rock-table .p-datatable-thead > tr > th { background: #0d1520 !important; color: #4fc3f7 !important; border-bottom: 2px solid #1e293b !important; padding: 1rem; }
.rock-table .p-datatable-tbody > tr { background: #111820 !important; color: #ffffff !important; border-bottom: 1px solid #1e293b !important; }
.rock-table .p-datatable-tbody > tr:hover { background: #16202c !important; }
.p-button-cyan { background-color: #4fc3f7 !important; border-color: #4fc3f7 !important; color: #0d1520 !important; font-weight: bold; }
.swal2-container { z-index: 99999 !important; }
</style>