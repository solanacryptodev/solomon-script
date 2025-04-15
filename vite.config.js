import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
      host: 'https://workspace.philippinetower-solomonsweb.replit.dev'
    }
  },
  build: {
    target: 'esnext',
  },
});