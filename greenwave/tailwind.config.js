/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'creamy': '#FEFAE0',
        'cream': '#E9EDC9',
        'hover': '#AAB49A',
        'boton': '#939A86',
        'clear': '#597A5C',
        'hover-clear': '#678E6A'
      },
      colors: {
        'custom-green': '#A9B076', 
      },
    },
  },
  plugins: [],
}
