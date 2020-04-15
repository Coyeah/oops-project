const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const website = require('./config/website');

module.exports = {
  entry: {
    react: ['react'],
    reactDOM: ['react-dom'],
  },
  output: {
    path: paths.appDll,
    filename: `[name].${website.name}.dll.js`,
    library: '_dll_[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      context: paths.appRoot,
      name: '_dll_[name]_library',
      // manifest.json 描述动态链接库包含了哪些内容
      path: path.resolve(paths.appDll, `[name].${website.name}.manifest.json`)
    }),
  ],
}
