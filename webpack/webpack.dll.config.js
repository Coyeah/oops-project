const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    react: ['react'],
    reactDOM: ['react-dom'],
  },
  output: {
    path: paths.appDll,
    filename: '[name].dll.js',
    library: '_dll_[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]_library',
      // manifest.json 描述动态链接库包含了哪些内容
      path: path.resolve(paths.appDll, '[name].manifest.json')
    }),
    new AssetsPlugin({
      filename: 'dll.config.json',
      path: path.resolve(__dirname),
    }),
  ],
}
