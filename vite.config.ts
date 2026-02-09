import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Fahad-Md-Kamal/', // GitHub repository name
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true
  }
})