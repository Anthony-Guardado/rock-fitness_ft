import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // Importante para el guardián

// Importaciones directas
import HomeView from '@/views/home/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import RecuperarContrasena from '@/views/auth/RecuperarContrasena.vue'
import RestablecerContrasena from '@/views/auth/RestablecerContrasena.vue'
import Register from '@/views/auth/Register.vue'
import UserLayout from '@/components/layouts/UserLayout.vue'
import UserDashboard from '@/views/user/UserDashboard.vue'
import HistorialPagos from '@/views/user/HistorialPagos.vue' // <--- Tu archivo de pagos
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: Login, meta: { guest: true } },
    { path: '/register', component: Register, meta: { guest: true } },
    { path: '/recuperar-contrasena', component: RecuperarContrasena },
    { path: '/restablecer-contrasena', component: RestablecerContrasena },
    { path: '/suscripciones', component: () => import('@/views/home/Suscripciones.vue') },

    // --- RUTA CLIENTE ---
    {
      path: '/dashboard',
      component: UserLayout,
      meta: { requiresAuth: true, role: 'CLIENTE' },
      children: [
        { path: '', component: UserDashboard },
        { path: 'pagos', component: HistorialPagos }, // Esto crea /dashboard/pagos
      ]
    },

    // --- RUTA ADMIN ---
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true, role: 'ADMIN' },
      children: [
        { path: 'AdminDashboard', component: () => import("@/views/admin/AdminDashboard.vue") },
        { path: 'GestionMembresias', component: () => import("@/views/admin/GestionMembresias.vue") },
        { path: 'GestionPagos', component: () => import("@/views/admin/GestionPagos.vue") },
        { path: 'GestionUsuarios', component: () => import("@/views/admin/GestionUsuarios.vue") },
        { path: 'Reportes', component: () => import("@/views/admin/Reportes.vue") }
      ]
    }
  ]
})

// GUARDÍAN DE NAVEGACIÓN (Añádelo para que no te deje entrar sin loguear)
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return '/login'
  if (to.meta.guest && auth.isAuthenticated) return '/'

  if (to.meta.role) {
    const hasRole = auth.user?.roles?.some(r => r.name === to.meta.role)
    if (!hasRole) return '/'
  }
})

export default router
