<template>
  <div class="flex flex-col gap-6">
    <h2 class="text-xl font-bold text-blue tracking-wide">Gestión de Usuarios</h2>

    <!-- Tabla PrimeVue -->
    <DataTable
      :value="users"
      class="rock-table"
      :rows="10"
      stripedRows>

      <Column field="nombre"   header="Nombre"   />
      <Column field="apellido" header="Apellido" />
      <Column field="email"    header="Email"    />
      <Column field="telefono" header="Teléfono" />
      <Column field="dui"      header="DUI"      />
      <Column header="Password">
        <template #body>
          <span class="tracking-widest text-slate-400">••••••</span>
        </template>
      </Column>
      <Column field="tipo" header="Tipo de usuario">
        <template #body="{ data }">
          <Tag
            :value="data.tipo"
            :severity="data.tipo === 'Admin' ? 'warning' : 'info'" />
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <Button
              icon="pi pi-plus"
              label="Nuevo"
              size="small"
              severity="info"
              outlined
              @click="openAdd" />
            <Button
              icon="pi pi-pencil"
              label="Editar"
              size="small"
              severity="warning"
              outlined
              @click="openEdit(data)" />
            <Button
              icon="pi pi-trash"
              label="Eliminar"
              size="small"
              severity="danger"
              outlined
              @click="openDelete(data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Modales -->
    <AddUserDialog    :visible="showAdd"    @close="showAdd = false" />
    <EditUserDialog   :visible="showEdit"   :user="selectedUser" @close="showEdit = false" />
    <DeleteUserDialog :visible="showDelete" :user="selectedUser" @close="showDelete = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column   from 'primevue/column'
import Button   from 'primevue/button'
import Tag      from 'primevue/tag'

import AddUserDialog    from '@/components/admin/Usuarios/AddUserDialog.vue'
import EditUserDialog   from '@/components/admin/Usuarios/EditUserDialog.vue'
import DeleteUserDialog from '@/components/admin/Usuarios/DeleteUserDialog.vue'

const showAdd    = ref(false)
const showEdit   = ref(false)
const showDelete = ref(false)
const selectedUser = ref(null)

const users = ref([
  { id: 1, nombre: 'Juan',   apellido: 'Pérez',     email: 'juan.perez@email.com',      telefono: '503-1234-5678', dui: '000000-0', tipo: 'Usuario' },
  { id: 2, nombre: 'María',  apellido: 'Gómez',     email: 'maria.gomez@email.com',     telefono: '503-8765-4321', dui: '000000-0', tipo: 'Usuario' },
  { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', email: 'carlos.rodriguez@email.com', telefono: '503-2345-6789', dui: '000000-0', tipo: 'Usuario' },
  { id: 4, nombre: 'Ana',    apellido: 'López',     email: 'ana.lopez@email.com',       telefono: '503-9876-5432', dui: '000000-0', tipo: 'Usuario' },
  { id: 5, nombre: 'Pedro',  apellido: 'Torres',    email: 'pedro.torres@email.com',    telefono: '503-1111-2222', dui: '000000-0', tipo: 'Admin'   },
])

const openAdd    = ()     => { showAdd.value = true }
const openEdit   = (user) => { selectedUser.value = user; showEdit.value = true }
const openDelete = (user) => { selectedUser.value = user; showDelete.value = true }
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
}

.rock-table .p-datatable-tbody > tr.p-row-odd {
  background: #0f161e !important;
}
.rock-table {
  border: 1px solid rgba(79,195,247,0.2);
  border-radius: 12px;
  overflow: hidden;
}
</style>