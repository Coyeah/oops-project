const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const website = require('./config/website');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入clean-webpack-plugin插件，作用是清除 dist 文件及下的内容，因为每次编译完成后都会有一个 dist 文件夹存放静态文件，所以需要清除上次的 dist 文件

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
    new CleanWebpackPlugin({
      root: paths.appRoot, // 绝对路径，就是要根据这个 root 去找要删除的文件夹，默认是这个 webpack 配置文件所在额
      verbose: true, // 控制台打印日志
      dry: false, // 为 false 是删除文件夹的
      watch: true, // 在编译的时候删除打包文件就是在 npm start 或者 npm run dev，等跑本地服务的时候，删除之前的打包文件
    }),
    new webpack.DllPlugin({
      context: paths.appRoot,
      name: '_dll_[name]_library',
      // manifest.json 描述动态链接库包含了哪些内容
      path: path.resolve(paths.appDll, `[name].${website.name}.manifest.json`),
    }),
  ],
};
