<template>
  <div class="flex flex-col gap-6">
    <h2 class="text-xl font-bold text-blue tracking-wide">Gestión de Membresias</h2>

    <!-- Tabla PrimeVue -->
    <DataTable
      :value="membresias"
      class="rock-table"
      :rows="10"
      stripedRows>

      <Column field="cliente" header="Cliente" />
      <Column field="tipo"    header="Tipo" />
      <Column field="precio"  header="Precio">
        <template #body="{ data }">
          <span>${{ data.precio.toFixed(2) }}</span>
        </template>
      </Column>
      <Column field="estado" header="Estado">
        <template #body="{ data }">
          <Tag :value="data.estado" :severity="estadoSeverity(data.estado)" />
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <div class="flex items-center gap-2 flex-wrap">
            <Button
              icon="pi pi-pencil"
              label="Editar"
              size="small"
              severity="warning"
              outlined
              @click="openEdit(data)" />
            <Button
              icon="pi pi-times"
              label="Cancelar"
              size="small"
              severity="danger"
              outlined
              @click="openCancel(data)" />
            <Button
              icon="pi pi-ban"
              label="Anular"
              size="small"
              severity="secondary"
              outlined
              @click="openAnnul(data)" />
            <Button
              icon="pi pi-pause"
              label="Suspender"
              size="small"
              severity="info"
              outlined
              @click="openSuspend(data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Modales -->
    <EditMembresiaDialog        :visible="showEdit"    :membresia="selected" @close="showEdit = false" />
    <EditMembresiaUsuarioDialog :visible="showEditUsr" :membresia="selected" @close="showEditUsr = false" />
    <CancelMembresiaDialog      :visible="showCancel"  :membresia="selected" @close="showCancel = false" />
    <AnnularMembresiaDialog     :visible="showAnnul"   :membresia="selected" @close="showAnnul = false" />
    <SuspendMembresiaDialog     :visible="showSuspend" :membresia="selected" @close="showSuspend = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column    from 'primevue/column'
import Button    from 'primevue/button'
import Tag       from 'primevue/tag'

import EditMembresiaDialog        from '@/components/admin/Membresias/EditMembresiaDialog.vue'
import EditMembresiaUsuarioDialog from '@/components/admin/Membresias/EditMembresiaUsuarioDialog.vue'
import CancelMembresiaDialog      from '@/components/admin/Membresias/CancelMembresiaDialog.vue'
import AnnularMembresiaDialog     from '@/components/admin/Membresias/AnnularMembresiaDialog.vue'
import SuspendMembresiaDialog     from '@/components/admin/Membresias/SuspendMembresiaDialog.vue'

const showEdit    = ref(false)
const showEditUsr = ref(false)
const showCancel  = ref(false)
const showAnnul   = ref(false)
const showSuspend = ref(false)
const selected    = ref(null)

const membresias = ref([
  { id: 1, cliente: 'Juan Pérez',     tipo: 'Básica',   precio: 25.00, estado: 'Activa'     },
  { id: 2, cliente: 'Pedro Gómez',    tipo: 'Premium',  precio: 50.00, estado: 'Cancelada'  },
  { id: 3, cliente: 'Carlos Orellana',tipo: 'VIP',      precio: 75.00, estado: 'Anulada'    },
  { id: 4, cliente: 'Víctor Orellana',tipo: 'Premium',  precio: 50.00, estado: 'Suspendida' },
])

const estadoSeverity = (estado) => {
  const map = {
    'Activa':     'success',
    'Cancelada':  'danger',
    'Anulada':    'secondary',
    'Suspendida': 'warning',
  }
  return map[estado] || 'info'
}

const openEdit    = (m) => { selected.value = m; showEdit.value = true }
const openCancel  = (m) => { selected.value = m; showCancel.value = true }
const openAnnul   = (m) => { selected.value = m; showAnnul.value = true }
const openSuspend = (m) => { selected.value = m; showSuspend.value = true }
</script>

<style>
.rock-table .p-datatable-thead > tr > th {
  background: #0d1520 !important;
  color: #4fc3f7 !important;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(79,195,247,0.2) !important;
}
.rock-table .p-datatable-tbody > tr {
  background: #111820 !important;
  color: #c8dde8 !important;
  border-bottom: 1px solid rgba(255,255,255,0.04) !important;
}

.rock-table .p-datatable-tbody > tr:hover {
  background: inherit !important;
}
.rock-table .p-datatable-tbody > tr:hover {
  background: #111820 !important;
  color: #c8dde8 !important;
}
.rock-table {
  border: 1px solid rgba(79,195,247,0.2);
  border-radius: 12px;
  overflow: hidden;
}
</style>
