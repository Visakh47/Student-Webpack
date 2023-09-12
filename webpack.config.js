const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({template: './index.html', }),new webpack.HotModuleReplacementPlugin(),],
  devServer:{
    port:8080,
    host: 'localhost',
    open: true
  },
  module: { rules: [ {test: /\.css$/, use: ['style-loader', 'css-loader'], }, ],  },
};