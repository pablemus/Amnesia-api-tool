// webpack.main.js
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'electron-main',
  entry: {
    main: path.resolve(__dirname, 'src/main/main.js'),
    preload: path.resolve(__dirname, 'src/main/preload.js') // 👈 importante
  },
  output: {
    path: path.resolve(__dirname, 'dist/main'),
    filename: '[name].js', // genera dist/main/main.js y dist/main/preload.js
    clean: true
  },
  node: { __dirname: false, __filename: false }
}
