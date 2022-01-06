const { join } = require('path');
// const vuePlugin = require('@vitejs/plugin-vue');
const { createVuePlugin } = require('vite-plugin-vue2');
// const svgLoaderPlugin = require('vite-svg-loader');
const { createSvgPlugin } = require('vite-plugin-vue2-svg');

const { defineConfig } = require('vite');

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: join(__dirname, '..', 'src', 'renderer'),
  publicDir: 'public',
  server: {
    port: 8080
  },
  open: false,
  build: {
    outDir: join(__dirname, '..', 'build', 'renderer'),
    emptyOutDir: true
  },
  plugins: [createVuePlugin(), createSvgPlugin()],
  resolve: {
    alias: {
      '@devterm-toolbox/frontend': join(__dirname, '../..', 'frontend'),
      '@': join(__dirname, '..', 'src', 'renderer')
    }
  }
});

module.exports = config;
