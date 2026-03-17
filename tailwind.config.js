/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //Los colores definidos sobre el estilo de gym
        gym: {
          base: '#181A1F',
          card: '#1F232A',
          input: '#242830',
          inputText: '#C2C2C7',
          text: '#F5F5F5',
          muted: '#B4B4BC',
          accent: '#4FC3F7',
          border: '#23374D',
        }
      },

      //Sombra para el
      boxShadow: {
        'glow': '0 4px 15px rgba(240, 240, 245, 0.1)',
      },
       //Fuentes
      fontFamily: {
        //Solo se usa en titulo y botones
        poppins: ['Poppins', 'sans-serif'],
        // Solo para los texto
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
