import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['index.ts'],
  format: ['esm', 'cjs'],
  minify: false,
  sourcemap: true,
  target: 'es2021',
  deps: {
    neverBundle: true
  }
});
