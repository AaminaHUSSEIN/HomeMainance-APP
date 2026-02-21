import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Hubi in folder-kani uu yahay kan uu server.js raadinayo
  }
})
