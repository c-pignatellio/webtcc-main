import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: '/view/index/index.html',
      },
    },
  },
  server: {
    open: '/view/index/index.html',
    headers: {
      'Referrer-Policy': 'same-origin',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    /*proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          Connection: 'keep-alive'
        }
      }
    }*/
  }
}
)
