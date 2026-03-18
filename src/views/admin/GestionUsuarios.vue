<template>
  <div class="flex flex-col gap-6 p-4 bg-slate-900 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-blue-400 tracking-wide uppercase">
        Gestión de Usuarios
      </h2>
      <Button 
        label="Nuevo Usuario" 
        icon="pi pi-user-plus" 
        class="p-button-cyan shadow-lg" 
        @click="openAdd" 
      />
    </div>

    <DataTable 
      :value="users" 
      :loading="loading" 
      class="rock-table" 
      :rows="rows" 
      :rowsPerPageOptions="[5,10,15,20]"
      paginator 
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Mostrando {first} a {last}+ de {totalRecords}"
      responsiveLayout="stack"
      stripedRows
    >
      <template #empty>
        <div class="text-center p-4 text-slate-400">No se encontraron usuarios en la base de datos.</div>
      </template>

      <Column field="nombre" header="Nombre" sortable />
      <Column field="apellido" header="Apellido" sortable />
      <Column field="email" header="Email" />
      <Column field="telefono" header="Teléfono" />
      <Column field="dui" header="DUI" />
      
      <Column field="roles" header="Rol">
        <template #body="{ data }">
          <Tag 
            :value="data.roles && data.roles.length > 0 ? data.roles[0].name : 'CLIENTE'" 
            :severity="getSeverity(data.roles)" 
          />
        </template>
      </Column>

      <Column header="Acciones" class="w-10rem">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button 
              icon="pi pi-pencil" 
              class="p-button-rounded p-button-warning p-button-text" 
              @click="openEdit(data)" 
              v-tooltip.top="'Editar'"
            />
            <Button 
              icon="pi pi-trash" 
              class="p-button-rounded p-button-danger p-button-text" 
              @click="openDelete(data)" 
              v-tooltip.top="'Desactivar'"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <AddUserDialog 
      :visible="showAdd" 
      @close="showAdd = false" 
      @refresh="fetchUsers" 
    />
    
    <EditUserDialog 
      :visible="showEdit" 
      :user="selectedUser" 
      @close="showEdit = false" 
      @refresh="fetchUsers" 
    />
    
    <DeleteUserDialog 
      :visible="showDelete" 
      :user="selectedUser" 
      @close="showDelete = false" 
      @refresh="fetchUsers" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

// Importación del servicio y modales
import { userService } from '@/services/userService';
import AddUserDialog from '@/components/admin/Usuarios/AddUserDialog.vue';
import EditUserDialog from '@/components/admin/Usuarios/EditUserDialog.vue';
import DeleteUserDialog from '@/components/admin/Usuarios/DeleteUserDialog.vue';

// Estados
const users = ref([]);
const loading = ref(false);
const showAdd = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);
const selectedUser = ref(null);

// Función para obtener usuarios de Laravel
const fetchUsers = async () => {
  loading.value = true;
  try {
    const data = await userService.getAll();
    users.value = data;
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    // Aquí podrías disparar un SweetAlert si el error es 401 (No autorizado)
  } finally {
    loading.value = false;
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchUsers();
});

// Lógica de apertura de modales
const openAdd = () => {
  showAdd.value = true;
};

const openEdit = (user) => {
  selectedUser.value = { ...user };
  showEdit.value = true;
};

const openDelete = (user) => {
  selectedUser.value = user;
  showDelete.value = true;
};

// Estilo de los Tags según el Rol
const getSeverity = (roles) => {
  if (!roles || roles.length === 0) return 'info';
  const roleName = roles[0].name.toUpperCase();
  switch (roleName) {
    case 'ADMIN': return 'danger';
    case 'ENTRENADOR': return 'warning';
    case 'CLIENTE': return 'success';
    default: return 'info';
  }
};
</script>

<style>
/* Estilos para mantener la estética oscura y azul */
.rock-table.p-datatable {
  background: #0d1520 !important;
  border-radius: 12px;
  border: 1px solid rgba(79, 195, 247, 0.1);
}

.rock-table .p-datatable-thead > tr > th {
  background: #0d1520 !important;
  color: #4fc3f7 !important;
  border-bottom: 2px solid #1e293b !important;
  padding: 1rem;
}

.rock-table .p-datatable-tbody > tr {
  background: #111820 !important;
  color: #ffffff !important;
  border-bottom: 1px solid #1e293b !important;
}

.rock-table .p-datatable-tbody > tr:hover {
  background: #16202c !important;
}

.p-button-cyan {
  background-color: #4fc3f7 !important;
  border-color: #4fc3f7 !important;
  color: #0d1520 !important;
  font-weight: bold;
}
.swal2-container {
  z-index: 99999 !important;
  }
</style>