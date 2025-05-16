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
      fileName: () => 'widget.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'widget.js',
      },
    },
    outDir: 'dist', // stesso output dell'app
    emptyOutDir: false, // NON svuotare, così non cancella index.html
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
