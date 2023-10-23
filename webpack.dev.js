const path = require('path');
const config = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    assetModuleFilename: 'img/[name][ext]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  watch: true,
});