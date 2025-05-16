// vite.widget.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import path from 'path'

const mode = process.env.BUILD_MODE
const isProd = mode === 'production'

export default defineConfig({
  plugins: [react(), cssInjectedByJs()],
  publicDir: isProd ? 'public/assets' : 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: isProd,
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
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
