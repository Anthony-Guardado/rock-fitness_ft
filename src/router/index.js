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

// GUARDÍAN DE NAVEGACIÓN BLINDADO (Vue Router 4)
router.beforeEach((to) => {
  const auth = useAuthStore()

  // 1. Escaneamos si la ruta a la que va (O CUALQUIERA DE SUS PADRES) requiere auth
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 2. Escaneamos si la ruta a la que va (O CUALQUIERA DE SUS PADRES) exige un rol
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role

  // REGLA A: Si requiere login y no está autenticado -> Al login
  if (requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }

  // REGLA B: Si ya está logueado y quiere ir al login/registro -> Al inicio
  if (to.meta.guest && auth.isAuthenticated) {
    return '/'
  }

  // REGLA C: Validación estricta de Roles (Protege Admin y Cliente)
  if (requiredRole && auth.isAuthenticated) {
    // Verificamos si el usuario tiene el rol que pide la ruta
    const hasRole = auth.user?.roles?.some(r => r.name.toUpperCase() === requiredRole.toUpperCase())

    if (!hasRole) {
      console.warn(`Acceso denegado: Necesitas ser ${requiredRole}`)
      // Redirección inteligente: si es Admin lo mandamos a su panel, si no, al home
      return auth.isAdmin ? '/admin/AdminDashboard' : '/'
    }
  }
})
export default router
