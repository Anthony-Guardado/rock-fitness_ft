<template>
  <Dialog
    :visible="visible"
    modal
    :style="{ width: '520px' }"
    :closable="false"
    class="rock-dialog"
    @update:visible="$emit('close')">

    <template #header>
      <div class="flex items-center justify-between w-full">
        <span class="text-sm font-bold tracking-widest text-slate-100">DETALLE DE PAGO</span>
        <Button icon="pi pi-times" rounded text severity="danger" @click="$emit('close')" class="!w-7 !h-7" />
      </div>
    </template>

    <div v-if="reporte" class="flex flex-col gap-4 pt-2">

      <!-- Fila de datos -->
      <div class="grid grid-cols-2 gap-4">
        <div class="detail-field">
          <span class="detail-label">Nombre</span>
          <span class="detail-value">{{ reporte.nombre }}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Tipo de Membresía</span>
          <span class="detail-value">
            <Tag :value="reporte.tipo" severity="info" />
          </span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Monto</span>
          <span class="detail-value text-cyan-400 font-semibold">{{ reporte.monto }}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Fecha de Registro</span>
          <span class="detail-value">{{ reporte.fecha }}</span>
        </div>
        <div class="detail-field col-span-2">
          <span class="detail-label">Estado del Pago</span>
          <span class="detail-value">
            <Tag value="Exitoso" severity="success" />
          </span>
        </div>
      </div>

    </div>

    <template #footer>
      <div class="flex justify-center pt-2">
        <Button
          icon="pi pi-file-pdf"
          label="Exportar PDF"
          class="!bg-cyan-500 !border-cyan-500 !px-10"
          @click="exportarPDF" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Tag    from 'primevue/tag'

defineProps({ visible: Boolean, reporte: Object })
defineEmits(['close'])

const exportarPDF = () => {
  console.log('Exportar reporte a PDF')
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

.detail-field {
  @apply flex flex-col gap-1 bg-[#0d1520] border border-cyan-500/15 rounded-lg px-4 py-3;
}
.detail-label {
  @apply text-xs text-slate-500 font-medium tracking-wide uppercase;
}
.detail-value {
  @apply text-sm text-slate-200 font-medium;
}
</style>