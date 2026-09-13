import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split the big vendors so they cache independently and download in
        // parallel instead of arriving as one 560 kB blocking chunk.
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  server: {
    watch: {
      // Browser downloads landing in the project folder are locked by the OS
      // while in flight, which kills the dev server's watcher on Windows.
      ignored: ['**/*.crdownload', '**/*.part', '**/*.tmp', '**/~$*'],
    },
  },
});
