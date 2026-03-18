<template>
  <div class="flex flex-col gap-6">
    <Toast />
    <PlanesMembresia v-if="(detalle.estado === 'inactiva' || detalle.estado === 'cancelada') && mostrarPlanes"
      @cerrar="mostrarPlanes = false" />

    <!-- Card principal del usuario -->
    <div class="bg-[#1F232A] border border-[#23374D] rounded-xl p-8 flex flex-col items-center gap-4">

      <!-- Foto de perfil -->
      <div
        class="w-24 h-24 rounded-full bg-[#242830] border-2 border-[#4FC3F7] flex items-center justify-center overflow-hidden cursor-pointer"
        @click="inputFoto.click()">
        <img v-if="fotoUrl" :src="fotoUrl" class="w-full h-full object-cover rounded-full" />
        <i v-else class="pi pi-user text-[#4FC3F7] text-4xl"></i>
      </div>
      <input type="file" accept="image/*" ref="inputFoto" class="hidden" @change="cambiarFoto" />

      <!-- Nombre y correo -->
      <div class="text-center">
        <h2 class="text-[#F5F5F5] text-xl font-bold">{{ usuario.nombre }} {{ usuario.apellido }}</h2>
        <p class="text-[#B4B4BC] text-sm">{{ usuario.email }}</p>
      </div>

      <!-- Datos -->
      <div class="w-full bg-[#242830] border border-[#23374D] rounded-lg p-4 flex flex-col gap-3 mt-2">
        <h3 class="text-[#B4B4BC] text-sm">Datos:</h3>
        <hr class="border-[#23374D]">

        <div class="flex items-center justify-between">
          <span class="text-[#B4B4BC] text-sm">Estado</span>
          <Tag :value="detalle.estado" :severity="getSeverity(detalle.estado)" />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#B4B4BC] text-sm">Membresía</span>
          <span class="text-[#F5F5F5] text-sm font-semibold">
            {{ detalle.estado === 'cancelada' ? '-' : detalle.membresia?.nombre }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#B4B4BC] text-sm">Expira el</span>
          <span class="text-[#F5F5F5] text-sm font-semibold">
            {{ detalle.estado === 'cancelada' ? '-' : formatFecha(detalle.fecha_fin) }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#B4B4BC] text-sm">Teléfono</span>
          <span class="text-[#F5F5F5] text-sm font-semibold">{{ usuario.telefono }}</span>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex flex-wrap justify-center gap-3 mt-2">
        <Button label="Editar perfil" icon="pi pi-user-edit" @click="abrirModalPerfil" />


        <Button v-if="detalle.estado === 'cancelada' || detalle.estado === 'inactiva'" label="Renovar membresía"
          icon="pi pi-refresh" severity="success" @click="mostrarPlanes = true" />

        <Button v-if="detalle.estado === 'activa'" label="Cancelar membresía" icon="pi pi-times-circle"
          severity="danger" outlined @click="modalCancelar = true" />
      </div>

    </div>

    <!-- MODAL EDITAR PERFIL -->
    <Dialog v-model:visible="modalPerfil" header="EDITAR PERFIL"
      :style="{ width: '30rem', background: '#1F232A', border: '1px solid #23374D' }" :modal="true">
      <div class="flex flex-col gap-5 pt-2">

        <div class="flex flex-col gap-1">
          <span class="text-[#F5F5F5] font-semibold text-sm">FOTO DE PERFIL</span>
          <input type="file" accept="image/*"
            class="text-[#B4B4BC] text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#4FC3F7] file:text-[#181A1F] file:font-semibold cursor-pointer"
            @change="cambiarFoto" />
        </div>

        <div class="flex flex-col gap-3">
          <span class="text-[#F5F5F5] font-semibold text-sm">INFORMACIÓN DE CONTACTO</span>
          <div class="flex flex-col gap-1">
            <label class="text-[#B4B4BC] text-xs">Número telefónico</label>
            <InputText v-model="form.telefono" placeholder="Número telefónico" class="w-full" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[#B4B4BC] text-xs">Correo electrónico</label>
            <InputText v-model="form.email" placeholder="Correo electrónico" class="w-full" />
          </div>
        </div>

      </div>

      <template #footer>
        <div class="flex gap-2">
          <Button label="Cancelar" severity="secondary" outlined class="w-full" @click="modalPerfil = false" />
          <Button label="GUARDAR" class="w-full" :loading="loadingPerfil" @click="guardarPerfil" />
        </div>
      </template>
    </Dialog>


    <!-- MODAL CANCELAR MEMBRESÍA -->
    <Dialog v-model:visible="modalCancelar" header="CANCELAR MEMBRESÍA"
      :style="{ width: '28rem', background: '#1F232A', border: '1px solid #23374D' }" :modal="true">
      <div class="flex flex-col items-center gap-4 pt-2">
        <i class="pi pi-exclamation-triangle text-red-400 text-5xl"></i>
        <p class="text-[#F5F5F5] text-center text-sm">
          ¿Estás seguro que deseas cancelar tu membresía? Esta acción no se puede deshacer.
        </p>
      </div>

      <template #footer>
        <div class="flex gap-2">
          <Button label="No, mantener" severity="secondary" outlined class="w-full" @click="modalCancelar = false" />
          <Button label="Sí, cancelar" severity="danger" class="w-full" :loading="loadingCancelar"
            @click="cancelarMembresia" />
        </div>
      </template>
    </Dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/authStore'
import Tag from 'primevue/tag'
import userService from '@/services/userService'
import membresiaService from '@/services/membresiaService'
import PlanesMembresia from '@/components/user/PlanesMembresia.vue'

const toast = useToast()
const authStore = useAuthStore()
const mostrarPlanes = ref(true)

const usuario = ref({})
const detalle = ref({})
const membresias = ref([])
const fotoUrl = ref(null)
const inputFoto = ref(null)

const modalPerfil = ref(false)
const modalPlan = ref(false)
const modalCancelar = ref(false)

const planSeleccionado = ref(null)
const loadingPerfil = ref(false)
const loadingPlan = ref(false)
const loadingCancelar = ref(false)

const form = ref({
  email: '',
  telefono: ''
})

onMounted(() => {
  cargarDatos()
})

const cargarDatos = async () => {
  try {
    const [resUsuario, resDetalle, resMembresias] = await Promise.all([
      userService.getPerfil(authStore.user.id),
      membresiaService.getMiMembresia(),
      membresiaService.getMembresias()
    ])

    usuario.value = resUsuario.data
    detalle.value = resDetalle.data.data
    membresias.value = resMembresias.data.data

    form.value.email = usuario.value.email
    form.value.telefono = usuario.value.telefono

    if (usuario.value.imagenes?.length > 0) {
      fotoUrl.value = `http://localhost:8000/images/users/${usuario.value.imagenes[0].nombre}`
    }

  } catch (error) {
    console.error('Error al cargar datos', error)
  }
}

const formatFecha = (fecha) => {
  if (!fecha) return '-'
  const d = new Date(fecha)
  return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`
}

const getSeverity = (estado) => {
  if (estado === 'activa') return 'success'
  if (estado === 'inactiva') return 'warning'
  if (estado === 'cancelada') return 'danger'
  if (estado === 'suspendida') return 'danger'
  return null
}

const cambiarFoto = (e) => {
  const archivo = e.target.files[0]
  if (archivo) {
    fotoUrl.value = URL.createObjectURL(archivo)
  }
}

const abrirModalPerfil = () => {
  form.value.email = usuario.value.email
  form.value.telefono = usuario.value.telefono
  modalPerfil.value = true
}

const guardarPerfil = async () => {
  loadingPerfil.value = true
  try {
    const formData = new FormData()
    formData.append('user', JSON.stringify({
      email: form.value.email,
      telefono: form.value.telefono
    }))

    const { status, data } = await userService.update(authStore.user.id, formData)

    if (status === 200) {
      usuario.value = data.user
      modalPerfil.value = false
      toast.add({ severity: 'success', summary: 'Éxito', detail: data.message, life: 3000 })
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el perfil', life: 3000 })
  } finally {
    loadingPerfil.value = false
  }
}


const cancelarMembresia = async () => {
  loadingCancelar.value = true
  try {
    const { status, data } = await membresiaService.cambiarEstado(authStore.user.id, {
      estado: 'cancelada'
    })

    if (status === 200) {
      await cargarDatos()
      modalCancelar.value = false
      toast.add({ severity: 'success', summary: 'Membresía cancelada', detail: data.message, life: 3000 })
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cancelar la membresía', life: 3000 })
  } finally {
    loadingCancelar.value = false
  }
}


</script>

<style>
.p-dialog {
  background: #1F232A !important;
  border: 1px solid #23374D !important;
}

.p-dialog .p-dialog-header {
  background: #1F232A !important;
  color: #F5F5F5 !important;
  border-bottom: 1px solid #23374D !important;
}

.p-dialog .p-dialog-content {
  background: #1F232A !important;
  color: #F5F5F5 !important;
}

.p-dialog .p-dialog-footer {
  background: #1F232A !important;
  border-top: 1px solid #23374D !important;
}
</style>
