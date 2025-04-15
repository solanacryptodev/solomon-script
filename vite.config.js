import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
      host: '4dae44f7-b392-4d05-bd03-47e8519ec037-00-hnh3s1jgngyw.worf.replit.dev'
    }
  },
  build: {
    target: 'esnext',
  },
});