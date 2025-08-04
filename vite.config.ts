// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    usePolling: true, // Continuously monitor file changes
    watch: {
      usePolling: true,
    },
    overlay: true, // Show error overlay
  },
});
