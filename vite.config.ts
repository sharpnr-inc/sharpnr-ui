import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // ← add this
    react(),
    dts({ include: ["src"] }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // ← this is what shadcn needs
    },
  },
});
