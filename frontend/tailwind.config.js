/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#0f1f3f',
      secondary: '#D3AC2B',
      tertiary: '#CBD0D8',
      light: '#F4F3EA',
    },
    extend: {
      fontFamily: {
        'noto-sans': ['NotoSans', 'sans-serif'],
        'robot': ['Roboto', 'Sans-serif'],
      }
    },
  },
  plugins: [],
}

