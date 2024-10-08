// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       colors: {
//         web3Dark: {
//           100: '#0f2027',
//           200: '#203a43',
//           300: '#2c5364',
//         },
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
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
        //   web3Bright: {
        //     100: '#1a2a6c', // Dark Blue
        //     200: '#b21f1f', // Deep Purple
        //     300: '#fdbb2d', // Vibrant Blue
        //   },
        //   // Optional: You can adjust these colors or add more shades as needed
        // },
        // backgroundImage: {
        //   'gradient-web3':
        //     'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
        // },
        web3Bright: {
          100: '#1e3a8a', // Royal Blue
          200: '#07184797', // Purple
          300: '#071847', // Bright Blue
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
