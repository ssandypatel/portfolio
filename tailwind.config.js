/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          dark: "#050816",
          DEFAULT: "#0f172a",
          accent: "#38bdf8",
          highlight: "#f472b6"
        }
      },
      boxShadow: {
        glow: "0 10px 40px rgba(56, 189, 248, 0.35)",
        card: "0 25px 50px rgba(15, 23, 42, 0.25)"
      },
      backgroundImage: {
        "grid-overlay":
          "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"
      },
      backgroundSize: {
        "grid-overlay": "30px 30px"
      }
    }
  },
  plugins: []
};

