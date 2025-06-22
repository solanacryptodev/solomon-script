import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: ['4dae44f7-b392-4d05-bd03-47e8519ec037-00-hnh3s1jgngyw.worf.replit.dev']
  },
  define: {
    'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(process.env.OPENROUTER_API_KEY),
    'import.meta.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY),
    global: 'globalThis',
  }
})