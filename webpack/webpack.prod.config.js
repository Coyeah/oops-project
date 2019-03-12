const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJSPlugin()
    ]
  }
});
