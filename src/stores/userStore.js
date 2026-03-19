
// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '@/services/userService'

export const useUserStore = defineStore('user', () => {
    const users = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchUsers = async () => {
        loading.value = true
        error.value = null
        try {
            users.value = await userService.getAll()
        } catch (e) {
            error.value = e.response?.data?.message || 'Error al obtener usuarios'
        } finally {
            loading.value = false
        }
    }

    return { users, loading, error, fetchUsers }


  // Crear usuario
  const store = async (formData) => {
    await userService.store(formData)
    await fetchAll()
  }

  // Actualizar usuario
  const update = async (id, formData) => {
    await userService.update(id, formData)
    await fetchAll()
  }

  // Desactivar usuario
  const destroy = async (id) => {
    await userService.destroy(id)
    await fetchAll()
  }

  // Reactivar usuario
  const restore = async (id) => {
    await userService.restore(id)
    await fetchAll()
  }

  return { usuarios, loading, fetchAll, store, update, destroy, restore }
})
