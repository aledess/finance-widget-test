// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // stesso output del widget
    emptyOutDir: true, // svuota solo quando parte la build principale
  },
})
