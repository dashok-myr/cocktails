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
        'cocktail-background':
          'url("https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2757&q=80")',
        'logo-cocktail':
          "linear-gradient(to right, rgba(24, 0, 130, 0.5), rgba(255, 0, 255, 0.5)), url('https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2757&q=80')",
      },
      colors: {
        'bright-blue': 'hsl(25, 100%, 94%)',
        'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
        'light-grayish-blue': 'hsl(234, 39%, 85%)',
        'very-dark-grayish-blue': 'hsl(234, 11%, 52%)',
        'dark-grayish-blue': 'hsl(233, 14%, 35%)',
        'dark-grayish-blue1': 'hsl(237, 14%, 26%)',
        'desaturated-blue': 'hsl(235, 24%, 19%)',
      },
    },
  },
  plugins: [],
}
