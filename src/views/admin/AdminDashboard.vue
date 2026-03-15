<template>
  <div class="dashboard-wrapper">
    <!-- NAVBAR SUPERIOR -->
    <header class="navbar">
      <div class="navbar-logo">
        <div class="logo-icon">
          <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
            <polygon points="25,4 45,40 5,40" fill="none" stroke="#4fc3f7" stroke-width="2.5"/>
            <polygon points="25,12 38,36 12,36" fill="#4fc3f7" opacity="0.15"/>
            <line x1="25" y1="4" x2="25" y2="40" stroke="#4fc3f7" stroke-width="1.5" opacity="0.6"/>
          </svg>
        </div>
        <span class="logo-text">ROCK FITNESS</span>
      </div>

      <div class="navbar-right">
        <span class="admin-label">Administrador</span>
        <div class="nav-icons">
          <button class="icon-btn" title="Notificaciones">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2a2 2 0 0 0-4 0 7 7 0 0 0-4 6v3l-2 2v1h16v-1l-2-2V8a7 7 0 0 0-4-6z"/>
              <path d="M10 18a2 2 0 0 0 4 0"/>
            </svg>
          </button>
          <button class="icon-btn" title="Configuración">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div class="main-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <router-link to="/admin" class="nav-item" active-class="nav-item--active">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </span>
            <span class="nav-label">Inicio</span>
          </router-link>

          <router-link to="/admin/usuarios" class="nav-item" active-class="nav-item--active">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span class="nav-label">Gestión de Usuarios</span>
          </router-link>

          <router-link to="/admin/membresias" class="nav-item" active-class="nav-item--active">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </span>
            <span class="nav-label">Gestión de membresías</span>
          </router-link>

          <router-link to="/admin/reportes" class="nav-item" active-class="nav-item--active">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </span>
            <span class="nav-label">Reporte Pagos</span>
          </router-link>

          <button class="nav-item nav-item--logout" @click="handleLogout">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </span>
            <span class="nav-label">Salir</span>
          </button>
        </nav>
      </aside>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="content-area">
        <div class="profile-card">
          <div class="profile-card-glow"></div>

          <div class="avatar-container">
            <div class="avatar-ring">
              <div class="avatar-inner">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="avatar-svg">
                  <circle cx="40" cy="40" r="38" fill="#1e2a35" stroke="#4fc3f7" stroke-width="1.5"/>
                  <circle cx="40" cy="30" r="14" fill="#2d3e4e"/>
                  <ellipse cx="40" cy="65" rx="22" ry="14" fill="#2d3e4e"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="profile-info">
            <div class="profile-name-badge">
              <span class="profile-name-label">Administrador</span>
              <span class="profile-name-value">{{ adminName }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
/*
const router = useRouter()
const adminName = ref('Juan Pérez')
*/
const handleLogout = () => {
  // Aquí puedes limpiar el store/token y redirigir al login
  router.push('/login')
}
</script>

<style scoped>

:root {
  --bg-dark:      #0d1117;
  --bg-card:      #111820;
  --bg-sidebar:   #161d26;
  --border-cyan:  #4fc3f7;
  --border-cyan2: #29b6f6;
  --text-primary: #e8f4f8;
  --text-muted:   #7a9bb5;
  --accent:       #4fc3f7;
}


.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #0d1117;
  font-family: 'Segoe UI', sans-serif;
  color: #e8f4f8;
  overflow: hidden;
}

/* estilo del navbar*/
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background: #0d1117;
  border-bottom: 1px solid rgba(79, 195, 247, 0.25);
  flex-shrink: 0;
  z-index: 10;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-svg {
  width: 38px;
  height: 38px;
}

.logo-text {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #e8f4f8;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.admin-label {
  font-size: 14px;
  font-weight: 500;
  color: #e8f4f8;
  letter-spacing: 0.5px;
}

.nav-icons {
  display: flex;
  gap: 6px;
}

.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #7a9bb5;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: color 0.2s, background 0.2s;
}

.icon-btn:hover {
  color: #4fc3f7;
  background: rgba(79, 195, 247, 0.08);
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}


.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}


.sidebar {
  width: 210px;
  background: #111820;
  border-right: 1px solid rgba(79, 195, 247, 0.15);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-top: 16px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 8px;
  color: #7a9bb5;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.nav-item:hover {
  background: rgba(79, 195, 247, 0.07);
  color: #b3dff5;
}

.nav-item--active {
  background: rgba(79, 195, 247, 0.12);
  color: #4fc3f7;
  border-left: 3px solid #4fc3f7;
}

.nav-item--logout {
  margin-top: auto;
  color: #7a9bb5;
}

.nav-item--logout:hover {
  background: rgba(239, 68, 68, 0.08);
  color: #f87171;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.content-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1117;
  padding: 32px;
  overflow-y: auto;
}


.profile-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: #111820;
  border: 1px solid rgba(79, 195, 247, 0.3);
  border-radius: 16px;
  padding: 48px 40px 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  box-shadow:
    0 0 0 1px rgba(79, 195, 247, 0.08),
    0 0 40px rgba(79, 195, 247, 0.07),
    0 20px 60px rgba(0, 0, 0, 0.5);
}

.profile-card-glow {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #4fc3f7, transparent);
  border-radius: 50%;
}

/* Avatar */
.avatar-container {
  position: relative;
}

.avatar-ring {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #4fc3f7, #0d1117 60%, #4fc3f7);
  padding: 2px;
  ;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #161d26;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-svg {
  width: 90px;
  height: 90px;
}


.profile-info {
  width: 100%;
  display: flex;
  justify-content: center;
}

.profile-name-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(79, 195, 247, 0.06);
  border: 1px solid rgba(79, 195, 247, 0.2);
  border-radius: 8px;
  padding: 10px 24px;
  min-width: 240px;
  justify-content: center;
}

.profile-name-label {
  font-size: 13px;
  color: #7a9bb5;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.profile-name-value {
  font-size: 14px;
  font-weight: 600;
  color: #e8f4f8;
  letter-spacing: 0.3px;
}
</style>