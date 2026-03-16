<template>
  <div class="flex flex-col gap-6">
    <h2 class="text-xl font-bold text-blue tracking-wide">Reporte de Pagos</h2>

    <!-- Filtros -->
    <div class="flex items-end gap-6 flex-wrap">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-blue font-medium tracking-wide">Fecha Inicio</label>
        <Calendar
          v-model="fechaInicio"
          placeholder="Seleccione una fecha"
          dateFormat="yy-mm-dd"
          class="rock-calendar"
          showIcon />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs text-blue font-medium tracking-wide">Fecha Fin</label>
        <Calendar
          v-model="fechaFin"
          placeholder="Seleccione una fecha"
          dateFormat="yy-mm-dd"
          class="rock-calendar"
          showIcon />
      </div>

      <Button
        icon="pi pi-search"
        label="Reportes de Pagos"
        class="!bg-cyan-500 !border-cyan-500 !font-semibold"
        @click="buscarReportes" />
    </div>

    <!-- Tabla -->
    <DataTable
      :value="reportesFiltrados"
      class="rock-table"
      :rows="10"
      stripedRows>

      <Column field="nombre"   header="Nombre" />
      <Column field="tipo"     header="Tipo de membresía" />
      <Column field="monto"    header="Monto">
        <template #body="{ data }">
          <span>{{ data.monto }}</span>
        </template>
      </Column>
      <Column field="fecha"    header="Fecha de registro" />
      <Column header="Acción">
        <template #body="{ data }">
          <Button
            label="Ver"
            size="small"
            severity="info"
            outlined
            @click="openReporte(data)" />
        </template>
      </Column>
    </DataTable>

    <!-- Botones inferiores -->
    <div class="flex items-center gap-4 justify-center mt-2">
      <Button
        icon="pi pi-file-pdf"
        label="Exportar a PDF"
        severity="secondary"
        outlined
        class="!px-8"
        @click="exportarPDF" />
      <Button
        icon="pi pi-refresh"
        label="Limpiar"
        severity="secondary"
        outlined
        class="!px-8"
        @click="limpiarFiltros" />
    </div>

    <!-- Modal -->
    <ReportesPagosDialog
      :visible="showReporte"
      :reporte="selectedReporte"
      @close="showReporte = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column    from 'primevue/column'
import Button    from 'primevue/button'
import Calendar  from 'primevue/calendar'

import navbar from '@/components/layouts/AdminLayout.vue'
import ReportesPagosDialog from '@/components/admin/Reportes/ReportesPagosDialog.vue'


const fechaInicio     = ref(null)
const fechaFin        = ref(null)
const showReporte     = ref(false)
const selectedReporte = ref(null)

const reportes = ref([
  { id: 1, nombre: 'Carlos López',    tipo: 'Premium', monto: '$850.00 / mes', fecha: '2025-04-20' },
  { id: 2, nombre: 'Ana Martínez',    tipo: 'Básica',  monto: '$500.00 / mes', fecha: '2025-04-18' },
  { id: 3, nombre: 'Luis García',     tipo: 'VIP',     monto: '$1,200.00 / mes',fecha: '2025-04-15' },
  { id: 4, nombre: 'María Fernández', tipo: 'Premium', monto: '$850.00 / mes', fecha: '2025-04-12' },
  { id: 5, nombre: 'Jorge Ramírez',   tipo: 'Básica',  monto: '$500.00 / mes', fecha: '2025-04-10' },
])

const reportesFiltrados = computed(() => {
  if (!fechaInicio.value && !fechaFin.value) return reportes.value
  return reportes.value.filter(r => {
    const fecha = new Date(r.fecha)
    const desde = fechaInicio.value ? new Date(fechaInicio.value) : null
    const hasta = fechaFin.value    ? new Date(fechaFin.value)    : null
    if (desde && fecha < desde) return false
    if (hasta && fecha > hasta) return false
    return true
  })
})

const openReporte  = (r) => { selectedReporte.value = r; showReporte.value = true }
const limpiarFiltros = () => { fechaInicio.value = null; fechaFin.value = null }
const buscarReportes = () => { /* el computed ya filtra reactivamente */ }
const exportarPDF    = () => { console.log('Exportar a PDF') }
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
  background: rgba(79,195,247,0.04) !important;
}
.rock-table .p-datatable-tbody > tr.p-row-odd {
  background: #0f161e !important;
}
.rock-table {
  border: 1px solid rgba(79,195,247,0.2);
  border-radius: 12px;
  overflow: hidden;
}

/* Calendar */
.rock-calendar .p-inputtext {
  background: #0d1520 !important;
  border: 1px solid rgba(79,195,247,0.2) !important;
  color: #c8dde8 !important;
  border-radius: 8px 0 0 8px !important;
}
.rock-calendar .p-inputtext::placeholder { color: #4a6070 !important; }
.rock-calendar .p-inputtext:focus {
  border-color: rgba(79,195,247,0.5) !important;
  box-shadow: none !important;
}
.rock-calendar .p-button {
  background: #0d1520 !important;
  border: 1px solid rgba(79,195,247,0.2) !important;
  border-left: none !important;
  color: #4fc3f7 !important;
  border-radius: 0 8px 8px 0 !important;
}
 
</style>