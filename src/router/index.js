import { createRouter, createWebHistory } from 'vue-router'

// 1. IMPORTAMOS LAS VISTAS
import HomeView from '@/views/home/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import RecuperarContrasena from '@/views/auth/RecuperarContrasena.vue'
import RestablecerContrasena from '@/views/auth/RestablecerContrasena.vue'
import UserLayout from '@/components/layouts/UserLayout.vue'
import UserDashboard from '@/views/user/UserDashboard.vue'
import HistorialPagos from '@/views/user/HistorialPagos.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import Register from '@/views/auth/Register.vue'




// import Register from '@/views/auth/Register.vue' // Lo descomentamos cuando lo creemos

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // RUTA DEL HOME (La portada principal)
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    // RUTA DEL LOGIN
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    // RUTA DE RECUPERAR CONTRASEÑA
    {
      path: '/recuperar-contrasena',
      name: 'recuperar-contrasena',
      component: RecuperarContrasena
    },


// Restablecer contraseña
    {
      path: '/restablecer-contrasena',
      name: 'restablecer-contrasena',
      component: RestablecerContrasena
    },
//Suscripciones Nabvar
{
      path: '/suscripciones',
      name: 'suscripciones',
      // Aquí es donde Vue enlaza la URL con tu archivo físico
      component: () => import('@/views/home/Suscripciones.vue')
    },
//Ruta de registro
    {
      path: '/register',
      name: 'register',
      component: Register
    },

      //cliente
    {
    path: '/dashboard',
    component: UserLayout,
    meta : { requiresAuth: true, role: ["CLIENTE"]},
    children: [
      { path: '', component: UserDashboard },
      { path: 'pagos', component: HistorialPagos },
    ]
    },
      //admin
    {
      path:"/admin",
      component: AdminLayout,
      meta: { requiresAuth: true, role: ["ADMIN"]},

      children: [
        {
          path: 'AdminDashboard',
          name: "admin-Dashboard",
          component: () => import("@/views/admin/AdminDashboard.vue"),
        },
        {
          path: "GestionMembresias",
          name: "GestionMembresiass",
          component: () => import("@/views/admin/GestionMembresias.vue"),
        },
        {
          path: "GestionPagos",
          name: "admin-pagos",
          component: () => import("@/views/admin/GestionPagos.vue"),
        },
        {
          path: 'GestionUsuarios',
          name: "admin-usuarios",
          component: () => import("@/views/admin/GestionUsuarios.vue"),
        },
        {
          path: 'Reportes',
          name: "admin-reportes",
          component: () => import("@/views/admin/Reportes.vue"),
        }
      ]
    }

  ]
})

export default router
