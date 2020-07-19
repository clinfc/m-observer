const path = require('path')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

module.exports = {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    file: path.resolve(__dirname, 'dist/index.min.js'),
    format: 'umd',
    name: 'MObserver'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    terser()
  ]
}