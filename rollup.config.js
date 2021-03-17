import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import replace from '@rollup/plugin-replace'

const isProduction = process.env.BUILD !== 'DEBUG'

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'es',
  },
  treeshake: isProduction,
  preserveEntrySignatures: false,
  plugins: [
    del({ targets: 'dist/*' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    nodeResolve(),
    commonjs({ sourceMap: false }),
    typescript(),
    isProduction &&
      terser({
        mangle: {
          properties: {
            regex: /_$/,
          },
        },
        ecma: 2021,
        module: true,
        toplevel: true,
        compress: {
          passes: 10,
        },
      }),
  ],
}
