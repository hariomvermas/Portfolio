import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Dev proxy: while the React dev server runs on 5173, every request to
    // /api/* is forwarded to the Spring Boot backend on 8080. Same-origin
    // from the browser's point of view, so CORS never blocks local dev.
    // Start the backend first, then `npm run dev`.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
