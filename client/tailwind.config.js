export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        web3Dark: {
          100: '#0f2027',
          200: '#203a43',
          300: '#2c5364',
        },

        web3Bright: {
          100: '#1e3a8a',
          200: '#07184797',
          300: '#071847',
        },
      },
      backgroundImage: {
        'gradient-web3':
          'linear-gradient(135deg, #1e3a8a 0%, #071847 50%, #071847 100%)',
      },
    },
  },
  plugins: [],
};
