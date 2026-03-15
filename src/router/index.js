import { createRouter, createWebHistory } from 'vue-router'

// 1. IMPORTAMOS LAS VISTAS
import HomeView from '@/views/home/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import RecuperarContrasena from '@/views/auth/RecuperarContrasena.vue'
    import RestablecerContrasena from '@/views/auth/RestablecerContrasena.vue'
import GestionUsuarios from '@/views/admin/GestionUsuarios.vue'
import GestionMembresias from '@/views/admin/GestionMembresias.vue'
import Reportes from '@/views/admin/Reportes.vue'


    
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
     
      

     

     // Admin (rutas anidadas dentro del AdminLayout)
 

    // RUTA DEL REGISTRO (Preparada para el futuro)
    /*
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    */

    // RUTAS DE LOS DASHBOARDS (Preparadas para cuando las creemos)
    /*
    {
      path: '/user/dashboard',
      name: 'user-dashboard',
      component: () => import('@/views/dashboard/UserDashboard.vue')
    },
    
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('@/views/dashboard/AdminDashboard.vue')
    }
    */
  ]
})

export default router
