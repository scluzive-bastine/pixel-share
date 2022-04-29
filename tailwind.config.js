module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        WaterBrush: ['Water Brush', 'cursive'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
