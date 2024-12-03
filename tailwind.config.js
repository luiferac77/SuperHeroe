/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',  // Incluye todas las vistas .ejs en /views
    './public/js/**/*.js', // Incluye todos los scripts en la carpeta public
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'btn',
    'btn-sm',
    'btn-danger',
    'btn-warning', // Agrega todas las clases que quieres incluir
  ],
  plugins: [],
}