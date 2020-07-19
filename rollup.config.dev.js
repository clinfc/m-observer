const path = require('path')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')

module.exports = {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    file: path.resolve(__dirname, 'dist/index.js'),
    format: 'es',
    name: 'MObserver'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}