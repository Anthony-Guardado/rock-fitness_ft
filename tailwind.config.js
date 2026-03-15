/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Agrupamos tus colores bajo el prefijo 'gym' para tenerlos ordenados
        gym: {
          base: '#181A1F',      // Fondo general
          card: '#1F232A',      // Cards / Paneles
          input: '#242830',     // Fondo de inputs
          inputText: '#C2C2C7', // Texto dentro de inputs
          text: '#F5F5F5',      // Texto principal
          muted: '#B4B4BC',     // Texto secundario / placeholder
          accent: '#4FC3F7',    // Acento (acciones / focus)
          border: '#23374D',    // Borde estándar
        }
      },
      boxShadow: {
        // Creamos una sombra suave usando tu color #F0F0F5 con un poco de transparencia
        'glow': '0 4px 15px rgba(240, 240, 245, 0.1)',
      },
      fontFamily: {
        // Definimos las fuentes
        poppins: ['Poppins', 'sans-serif'], // Para títulos y botones
        inter: ['Inter', 'sans-serif'],     // Para textos largos
      }
    },
  },
  plugins: [],
}
