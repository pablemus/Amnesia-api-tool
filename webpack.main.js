const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/main/main.js',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'dist/main'),
    filename: 'main.js'
  },
  node: { __dirname: false, __filename: false }
}
