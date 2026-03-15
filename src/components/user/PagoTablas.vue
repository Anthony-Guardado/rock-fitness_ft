<template>
  <div class="bg-[#1F232A] border border-[#23374D] rounded-xl p-6">

    <!-- Toolbar -->
    <Toolbar class="mb-4" style="background: #242830; border: 1px solid #23374D;">
      <template #start>
        <span class="text-[#F5F5F5] font-bold text-lg">Historial de Pagos</span>
      </template>
      <template #end>
        <InputText v-model="buscar" placeholder="Buscar..." class="w-48" />
      </template>
    </Toolbar>

    <DataTable :value="pagos" responsiveLayout="scroll" stripedRows class="p-datatable-sm dark-table">
      <Column field="referencia" header="Referencia" />

      <Column field="tipo_membresia" header="Tipo membresía">
        <template #body="slotProps">
          {{ slotProps.data.detalle_membresia?.membresia?.nombre ?? 'N/A' }}
        </template>
      </Column>

      <Column field="monto" header="Monto">
        <template #body="slotProps">
          <span class="text-[#4FC3F7] font-semibold">${{ slotProps.data.monto }}</span>
        </template>
      </Column>

      <Column field="estado" header="Estado">
        <template #body="slotProps">
          <Tag :value="slotProps.data.estado" :severity="getSeverity(slotProps.data.estado)" />
        </template>
      </Column>

      <Column field="fecha" header="Fecha">
        <template #body="slotProps">
          {{ formatFecha(slotProps.data.fecha) }}
        </template>
      </Column>

      <Column field="descripcion_metodo_pago" header="Método de pago">
        <template #body="slotProps">
          <span class="text-[#B4B4BC]">{{ slotProps.data.descripcion_metodo_pago ?? 'N/A' }}</span>
        </template>
      </Column>

    </DataTable>

  </div>
</template>

<script setup>
// PagoTablas.vue
import { ref, onMounted } from 'vue'
import pagoService from '@/services/pagoService'
import Tag from 'primevue/tag'

const pagos = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await pagoService.getMisPagos()
    pagos.value = data.pagos
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const formatFecha = (fecha) => {
  if (!fecha) return ''
  const d = new Date(fecha)
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`
}

const getSeverity = (estado) => {
  if (estado === 'pagado') return 'success'
  if (estado === 'pendiente') return 'warning'
  if (estado === 'fallido') return 'danger'
  return null
}

const buscar = ref('')

</script>

<style>
.dark-table .p-datatable-thead>tr>th {
  background: #242830 !important;
  color: #F5F5F5 !important;
  border-color: #23374D !important;
}

.dark-table .p-datatable-tbody>tr {
  background: #1F232A !important;
  color: #F5F5F5 !important;
  border-color: #23374D !important;
}

.dark-table .p-datatable-tbody>tr:nth-child(even) {
  background: #242830 !important;
}

.dark-table .p-datatable-tbody>tr:hover {
  background: #2a2f3a !important;
}
</style>
