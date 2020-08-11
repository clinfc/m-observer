const path = require('path')
const babel = require('rollup-plugin-babel')
import { nodeResolve } from '@rollup/plugin-node-resolve'
const commonjs = require('rollup-plugin-commonjs')
import { eslint } from "rollup-plugin-eslint"
const { terser } = require('rollup-plugin-terser')

// 当前是生成环境
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

let plugins = [
  babel({
    exclude: 'node_modules/**'
  }),
  commonjs(),
  nodeResolve({
    customResolveOptions: {
      moduleDirectory: 'lib/*'
    }
  })
]

if (IS_PRODUCTION) {
  plugins.push(terser())
}
else {
  plugins.unshift(eslint({
    fix: true,
    // throwOnError: true
  }))
}

module.exports = {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    file: path.resolve(__dirname, IS_PRODUCTION ? 'dist/index.min.js' : 'dist/index.js'),
    format: 'umd',
    name: 'MObserver',
    sourcemap: !IS_PRODUCTION,
    exports: 'named'
  },
  plugins: plugins,
  external: [
    'core-js/modules/es.object.assign',
    'core-js/modules/web.dom-collections.iterator'
  ]
}