
const { join } = require('path');
// const vuePlugin = require('@vitejs/plugin-vue');
const { createVuePlugin } = require('vite-plugin-vue2');
// const svgLoaderPlugin = require('vite-svg-loader');
const { createSvgPlugin } = require('vite-plugin-vue2-svg');

const { defineConfig } = require('vite');

const { dependencies } = require('../../frontend/package.json');

function renderChunks (deps) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['vue'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: join(__dirname, '..'),
  publicDir: 'public',
  server: {
    port: 8050
  },
  define: {
    __VERSION__: process.env.nextRelease || JSON.stringify(process.env.npm_package_version)
  },
  open: true,
  build: {
    outDir: join(__dirname, '..', 'build'),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          ...renderChunks(dependencies)
        }
      }
    }
  },
  plugins: [createVuePlugin(), createSvgPlugin()],
  resolve: {
    alias: {
      '@devterm-toolbox/frontend': join(__dirname, '../..', 'frontend'),
      '@': join(__dirname, '..', 'src')
    }
  }
});

module.exports = config;
