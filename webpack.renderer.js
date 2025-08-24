const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === "production";
    require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/renderer/index.jsx",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist/renderer"),
    filename: "renderer.[contenthash].js",
    publicPath: isProd ? "./" : "/",
    clean: true,
  },
  devtool: isProd ? false : "inline-source-map",
  devServer: {
    port: 3000,
    hot: true,
    static: { directory: path.resolve(__dirname, "public") },
    historyApiFallback: true,
    client: { overlay: { errors: true, warnings: false } },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] },
      { test: /\.(png|jpg|jpeg|gif|svg|ico)$/, type: "asset/resource" },
    ],
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html" }),
    new MonacoWebpackPlugin({
      languages: ["json", "javascript"],
      filename: "static/[name].worker.js",
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(
        process.env.API_URL
      ),
    }),
  ],
};
