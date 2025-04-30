// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true  // Dosya değişikliklerini sürekli izle
    },
    hmr: {
      overlay: true     // Hata overlay'ini göster
    }
  }
})