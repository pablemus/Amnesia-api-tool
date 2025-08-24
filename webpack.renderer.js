// webpack.renderer.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'src/renderer/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'renderer.[contenthash].js',
    // CLAVE para file:// (nada de '/')
    publicPath: './',
    clean: true,
    // para que los assets queden relativos también
    assetModuleFilename: 'assets/[name][ext]'
  },
  devtool: isProd ? false : 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    static: { directory: path.resolve(__dirname, 'public') },
    historyApiFallback: true,
    client: { overlay: { errors: true, warnings: false } }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.(png|jpe?g|gif|svg|ico)$/, type: 'asset/resource' }
    ]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      scriptLoading: 'defer',
      minify: isProd
    }),
    new MonacoWebpackPlugin({
      languages: ['json', 'javascript'],
      // importante: que apunte relativo en file://
      publicPath: './',
      filename: 'static/[name].worker.js'
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000')
    })
  ]
};
