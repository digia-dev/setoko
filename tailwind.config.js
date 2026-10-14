module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B2948',
        pink: {
          DEFAULT: '#FF4D9E',
          600: '#E03686',
        },
        bg: '#F7F9FB',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(11,41,72,0.08)',
      },
    },
  },
  plugins: [],
};
