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

    <DataTable
      :value="pagosFiltrados"
      responsiveLayout="scroll"
      stripedRows
      class="p-datatable-sm dark-table"
    >
      <Column field="referencia" header="Referencia" />

      <Column field="tipo_membresia" header="Tipo membresía" />

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

      <Column field="fecha" header="Fecha" />

      <Column field="descripcion_metodo_pago" header="Método de pago">
        <template #body="slotProps">
          <span class="text-[#B4B4BC]">{{ slotProps.data.descripcion_metodo_pago ?? 'N/A' }}</span>
        </template>
      </Column>

    </DataTable>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const buscar = ref('')

const pagos = ref([
  { referencia: 'REF-ABC123', tipo_membresia: 'Premium', monto: '15.00', estado: 'pagado', fecha: '2025-01-01', descripcion_metodo_pago: 'Tarjeta xxxx-xxxx-xxxx-9849' },
  { referencia: 'REF-DEF456', tipo_membresia: 'Básica', monto: '30.00', estado: 'pendiente', fecha: '2025-02-01', descripcion_metodo_pago: 'Tarjeta xxxx-xxxx-xxxx-1234' },
  { referencia: 'REF-GHI789', tipo_membresia: 'VIP', monto: '60.00', estado: 'fallido', fecha: '2025-03-01', descripcion_metodo_pago: null },
])

const pagosFiltrados = computed(() => {
  if (!buscar.value) return pagos.value
  return pagos.value.filter(p =>
    p.referencia.toLowerCase().includes(buscar.value.toLowerCase()) ||
    p.tipo_membresia.toLowerCase().includes(buscar.value.toLowerCase()) ||
    p.estado.toLowerCase().includes(buscar.value.toLowerCase())
  )
})

const getSeverity = (estado) => {
  if (estado === 'pagado')    return 'success'
  if (estado === 'pendiente') return 'warning'
  if (estado === 'fallido')   return 'danger'
  return null
}
</script>

<style>
.dark-table .p-datatable-thead > tr > th {
  background: #242830 !important;
  color: #F5F5F5 !important;
  border-color: #23374D !important;
}

.dark-table .p-datatable-tbody > tr {
  background: #1F232A !important;
  color: #F5F5F5 !important;
  border-color: #23374D !important;
}

.dark-table .p-datatable-tbody > tr:nth-child(even) {
  background: #242830 !important;
}

.dark-table .p-datatable-tbody > tr:hover {
  background: #2a2f3a !important;
}
</style>
