//Importaciones de los componentes
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomeView from '@/views/home/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import RecuperarContrasena from '@/views/auth/RecuperarContrasena.vue'
import RestablecerContrasena from '@/views/auth/RestablecerContrasena.vue'
import Register from '@/views/auth/Register.vue'
import UserLayout from '@/components/layouts/UserLayout.vue'
import UserDashboard from '@/views/user/UserDashboard.vue'
import HistorialPagos from '@/views/user/HistorialPagos.vue'
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

    //Rutas del cliente
    {
      path: '/dashboard',
      component: UserLayout,
      meta: { requiresAuth: true, role: 'CLIENTE' },
      children: [
        { path: '', component: UserDashboard },
        { path: 'pagos', component: HistorialPagos }, // Esto crea /dashboard/pagos
      ]
    },

    //Rutas del administrador
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


router.beforeEach((to) => {
  const auth = useAuthStore()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)


  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role


  if (requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }


  if (to.meta.guest && auth.isAuthenticated) {
    return '/'
  }

  if (requiredRole && auth.isAuthenticated) {
    // Verificamos si el rol del usuario es igual ala ruta que puede acceder
    const hasRole = auth.user?.roles?.some(r => r.name.toUpperCase() === requiredRole.toUpperCase())

    if (!hasRole) {
      console.warn(`Acceso denegado: Necesitas ser ${requiredRole}`)
      return auth.isAdmin ? '/admin/AdminDashboard' : '/'
    }
  }
})
export default router
