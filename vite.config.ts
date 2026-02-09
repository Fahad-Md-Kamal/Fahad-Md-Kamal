import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/Fahad-Md-Kamal/'
const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isProd ? repoBase : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
