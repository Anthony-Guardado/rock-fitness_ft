import { createRouter, createWebHistory } from 'vue-router'

// 1. IMPORTAMOS LAS VISTAS
import HomeView from '@/views/home/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import RecuperarContrasena from '@/views/auth/RecuperarContrasena.vue'
    import RestablecerContrasena from '@/views/auth/RestablecerContrasena.vue'
<<<<<<< HEAD
import UserLayout from '@/components/layouts/UserLayout.vue'
import UserDashboard from '@/views/user/UserDashboard.vue'
import HistorialPagos from '@/views/user/HistorialPagos.vue'

=======
import GestionUsuarios from '@/views/admin/GestionUsuarios.vue'
import GestionMembresias from '@/views/admin/GestionMembresias.vue'
import Reportes from '@/views/admin/Reportes.vue'
>>>>>>> origin/rama_osito



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

    //Rutas de interfaces de cliente y admin

    {
    path: '/dashboard',
    component: UserLayout,
    children: [
      { path: '', component: UserDashboard },
      { path: 'pagos', component: HistorialPagos },
    ]
    },

    {
      path:"/admin/dashboard",
      component: () => import("@/components/layouts/AdminLayout.vue"),

    }

  ]
})

export default router
