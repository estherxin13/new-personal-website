import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/new-personal-website/',
  plugins: [react()],
  server: {
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
})
