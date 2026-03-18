<template>
<div class="w-full max-w-4xl mx-auto bg-gym-card rounded-2xl shadow-2xl p-8 border border-gym-border font-inter flex flex-col items-center">
      <h2 class="text-3xl font-poppins font-extrabold text-white mb-6 border-b border-gym-border pb-4">
        Reporte de <span class="text-gym-accent">Pagos</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div>
          <label class="block text-sm font-medium text-gym-muted mb-2">Fecha Inicio</label>
          <Calendar
            v-model="fechaInicio"
            dateFormat="yy-mm-dd"
            showIcon
            class="w-full p-fluid"
            inputClass="bg-[#1c1c21] text-white border-gym-border focus:ring-gym-accent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gym-muted mb-2">Fecha Final</label>
          <Calendar
            v-model="fechaFin"
            dateFormat="yy-mm-dd"
            showIcon
            class="w-full p-fluid"
            inputClass="bg-[#1c1c21] text-white border-gym-border focus:ring-gym-accent"
          />
        </div>

        <div class="md:col-span-2 lg:col-span-1">
          <label class="block text-sm font-medium text-gym-muted mb-2">Estado del Pago</label>
          <div class="w-full bg-[#1c1c21] text-gym-accent border border-gym-border rounded-lg px-4 py-2 flex items-center h-[42px] opacity-80 cursor-not-allowed">
            <span class="font-semibold tracking-wide ">Pagado</span>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-col md:flex-row justify-end gap-4 border-t border-gym-border pt-6">

        <Button
          label="Limpiar Filtros"
          icon="pi pi-filter-slash"
          class="p-button-outlined w-full md:w-auto text-gym-muted border-gym-border hover:text-white hover:border-white transition-colors"
          @click="limpiarFiltros"
        />

        <Button
          label="Generar Reporte PDF"
          icon="pi pi-file-pdf"
          :loading="loading"
          class="w-full md:w-auto bg-gym-accent text-gym-base font-bold border-none hover:bg-[#3ab0e5] transition-colors px-6 py-2 rounded-xl"
          @click="generarReporte"
        />
      </div>
    </div>

</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api";

const fechaInicio = ref(null);
const fechaFin = ref(null);
const loading = ref(false);

//funcion para formatear la fecha que se enviará al backend
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  const d = new Date(fecha);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

//funcion para generar el reporte
const generarReporte = async () => {
  if (!fechaInicio.value || !fechaFin.value) {
    Swal.fire({
      icon: "error",
      title: "Faltan datos",
      text: "Debe seleccionar el rango de fechas para el reporte.",
      background: '#1c1c21',
      color: '#ffffff'
    });
    return;
  }

  const f1 = formatearFecha(fechaInicio.value);
  const f2 = formatearFecha(fechaFin.value);

  //Esto esta por que nuestros reportes solo son de estado pagado
  const estadoFijo = "pagado";

  loading.value = true;

  try {
    const response = await api.get(`/reportes/pagos?fecha_inicio=${f1}&fecha_fin=${f2}&estado=${estadoFijo}`, {
      responseType: 'blob'
    });
      //abrir reporte en una nueva pestaña del navegado
      //agregamos el blog ya que tine guardado el token de jwt
      //esto es por que la ruta es privada
    const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    window.open(fileURL, '_blank');

  } catch (error) {
    console.error("Error al generar el PDF:", error);
    Swal.fire({
      icon: "error",
      title: "Error de Servidor",
      text: "No se pudo generar el reporte. Verifica tu conexión o intenta buscar otro rango de fechas.",
      background: '#1c1c21',
      color: '#ffffff'
    });
  } finally {
    loading.value = false;
  }
};

const limpiarFiltros = () => {
  fechaInicio.value = null;
  fechaFin.value = null;
};
</script>


