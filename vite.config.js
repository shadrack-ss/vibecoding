import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://n8n.nrmcampaign.com',
        changeOrigin: true,
        rewrite: () => '/webhook/oddshoes-chat-trigger/chat',
      },
    },
  },
})
