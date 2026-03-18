import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/services/userService'

export const useUserStore = defineStore('users', () => {
  const usuarios = ref([])
  const loading = ref(false)

  // Ver todos los usuarios
  const fetchAll = async () => {
    loading.value = true
    try {
      const { data } = await userService.getAll()
      usuarios.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

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
