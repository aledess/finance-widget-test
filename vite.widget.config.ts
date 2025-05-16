// vite.widget.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import path from 'path'

export default defineConfig({
  plugins: [react(), cssInjectedByJs()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'),
      name: 'FinanceWidget',
      fileName: () => 'widget.js', // evita [name].js
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'widget.js', // evita sovrascritture
      },
    },
    outDir: 'dist', // stesso outDir della build React
    emptyOutDir: false, // ⚠️ non svuotare la cartella
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
