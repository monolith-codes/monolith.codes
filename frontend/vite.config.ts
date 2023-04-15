import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.', // Specify the Vue project's root directory
  plugins: [vue()], // Use the Vue plugin for Vite
  resolve: {
    alias: {
      // You can set up aliases for your directories or modules here
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist', // Specifies the output directory for the built files
  },
  server: {
    port: 8080, // Specifies the port for the development server to listen on
  },
  optimizeDeps: {
    include: [], // You can specify additional dependencies to optimize
  },
  css: {
    postcss: {}, // You can configure PostCSS plugins here
  },
});
