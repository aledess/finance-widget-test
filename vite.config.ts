// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // include tutto (demo + assets)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
