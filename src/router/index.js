import { createRouter, createWebHistory } from 'vue-router'

// Home
import HomeView from '../views/home/HomeView.vue'
import AboutView from '../views/home/AboutView.vue'

// Auth
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

// Admin
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import GestionUsuarios from '../views/admin/GestionUsuarios.vue'
import GestionPagos from '../views/admin/GestionPagos.vue'
import GestionMembresias from '../views/admin/GestionMembresias.vue'
import Reportes from '../views/admin/Reportes.vue'

// User
import UserDashboard from '../views/user/UserDashboard.vue'
import Membresia from '../views/user/Membresia.vue'
import HistorialPagos from '../views/user/HistorialPagos.vue'

const routes = [
  // Home
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/about',
    component: AboutView
  },

  // Auth
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },

  // Admin
  {
    path: '/admin',
    component: AdminDashboard
  },
  {
    path: '/admin/usuarios',
    component: GestionUsuarios
  },
  {
    path: '/admin/pagos',
    component: GestionPagos
  },
  {
    path: '/admin/membresias',
    component: GestionMembresias
  },
  {
    path: '/admin/reportes',
    component: Reportes
  },

  // User
  {
    path: '/dashboard',
    component: UserDashboard
  },
  {
    path: '/dashboard/membresia',
    component: Membresia
  },
  {
    path: '/dashboard/pagos',
    component: HistorialPagos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
