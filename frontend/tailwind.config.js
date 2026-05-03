export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pixelBg: "#0b1220",
        pixelGold: "#f59e0b",
        pixelGreen: "#22c55e",
        pixelBlue: "#60a5fa",
      },
      fontFamily: {
        pixel: ["Press Start 2P", "system-ui"],
        terminal: ["VT323", "monospace"],
      },
    },
  },
  plugins: [],
};
