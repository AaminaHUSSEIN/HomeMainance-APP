import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html' // Waxaan si toos ah ugu sheegaynaa halka index.html yaallo
    }
  }
})
