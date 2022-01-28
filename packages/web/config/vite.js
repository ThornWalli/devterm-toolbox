
const { join } = require('path');
// const vuePlugin = require('@vitejs/plugin-vue');
const { readFileSync, existsSync } = require('fs');
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

const certificateName = null;
let https = {
  key: join(__dirname, '../../../env/certs', `${certificateName}.key`),
  cert: join(__dirname, '../../../env/certs', `${certificateName}.cert`)
};
if (existsSync(https.key) && existsSync(https.cert)) {
  https = {
    key: readFileSync(https.key),
    cert: readFileSync(https.cert)
  };
} else {
  https = null;
}

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: join(__dirname, '..'),
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 8050,
    open: true,
    https
  },
  define: {
    __VERSION__: process.env.nextRelease || JSON.stringify(process.env.npm_package_version)
  },
  open: true,
  build: {
    outDir: join(__dirname, '..', 'build'),
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        // entryFileNames: 'assets/[name].js',
        // chunkFileNames: 'assets/[name].js',
        // assetFileNames: 'assets/[name].[ext]',
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
