import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    format: 'esm',
    file: './dist/index.mjs',
    sourcemap: true,
  },
  plugins: [typescript(), nodeResolve({ preferBuiltins: true }), commonjs(), json()],
  external: [],
});
