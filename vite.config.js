import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const cleanPage = (from, to) => ({
  name: `clean-${from.slice(1)}`,
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const path = req.url?.split('?')[0]
      if (path === from) req.url = to
      next()
    })
  }
})

export default defineConfig({
  plugins: [
    cleanPage('/guides', '/guides.html'),
    cleanPage('/guides/own-the-company', '/guide-own-the-company.html'),
    cleanPage('/guides/nine-to-five', '/guide-nine-to-five.html'),
    cleanPage('/guides/visible-website', '/guide-visible-website.html'),
    cleanPage('/guides/five-spreadsheets', '/guide-five-spreadsheets.html'),
    cleanPage('/about', '/about.html'),
    cleanPage('/services', '/services.html'),
    cleanPage('/portfolio', '/portfolio.html'),
    cleanPage('/contact', '/contact.html'),
    cleanPage('/onboarding', '/onboarding.html'),
    react()
  ],
  base: './', // <- ensures relative paths for JS/CSS on any hosting
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion']
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  // Ensure public assets are copied correctly
  publicDir: 'public'
})

