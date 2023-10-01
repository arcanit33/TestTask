module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      '2xl': '1536px',
    },
    extend: {
      colors:{
        default: '#FCF7E6',
        '1e': '#1E1E1E',
      },
    },
  },
  plugins: [],
}

