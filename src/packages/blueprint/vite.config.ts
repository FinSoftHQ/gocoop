import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    outDir: 'dist',
    insertTypesEntry: true,
  })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@finsoft/blueprint',
      fileName: (format) => `blueprint.${format}.js`
    },
    // rollupOptions: {
    //   external: ['vue'],
    //   output: {
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }, 
  }
});