const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: 'admin_index.html',
    publicPath: '/',
    overlay: true,
    port: 8082,
    stats: 'errors-only',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
