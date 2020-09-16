const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // webpack 编译时显示加载条
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // lodash 按需加载插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html-webpack-plugin 插件,作用是添加模板到编译完成后的 dist 的文件里面，用于生成 html。
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'); // 用于添加js或css文件路径（例如那些被copy-webpack-plugin插件编译的文件）
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 用于直接复制公共的文件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const website = require('../config/website.config');
const modifyVars = require('../config/theme.config');
const paths = require('./config/paths');
const regexp = require('./config/regexp');
const getStyleLoader = require('./tools/getStyleLoader');

const OPEN_SOURCE_MAP = true;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  context: paths.appRoot,
  entry: {
    'main.modern': paths.appIndex,
    // 'main.legacy': paths.appIndex,
  },
  output: {
    publicPath: paths.PUBLIC_PATH,
    path: paths.appDist,
    filename: `[name].[hash:8].${website.name}.js`,
    chunkFilename: `[name].[hash:8].${website.name}.js`,
  },
  resolve: {
    alias: {
      '@': path.resolve(paths.appSrc),
      apis: path.resolve(paths.appSrc, 'common/apis'),
      config: path.resolve(paths.appRoot, 'config'),
      assets: path.resolve(paths.appRoot, 'assets'),
      components: path.resolve(paths.appRoot, 'components'),
    },
    // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
    // 其他文件可以在编码时指定后缀，如 import('./index.scss')
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: regexp.REGEXP_SCRIPT,
        enforce: 'pre',
        include: paths.appSrc,
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true,
            quiet: true,
          },
        },
      },
      {
        oneOf: [
          {
            test: regexp.REGEXP_IMAGE,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: `images/[name]-[hash:5].${website.name}.[ext]`,
                },
              },
            ],
          },
          {
            test: regexp.REGEXP_SCRIPT,
            exclude: paths.appNodeModules,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  workers: 2,
                  poolTimeout: 2000,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            test: regexp.REGEXP_TYPESCRIPT,
            exclude: paths.appNodeModules,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  workers: 2,
                  poolTimeout: 2000,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            test: regexp.REGEXP_CSS,
            exclude: regexp.REGEXP_CSS_MODULE,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
              modifyVars,
            }),
            sideEffects: true,
          },
          {
            test: regexp.REGEXP_CSS_MODULE,
            exclude: paths.appNodeModules,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
              modifyVars,
            }),
            sideEffects: true,
          },
          {
            // 解决 antd less 模块化的兼容问题
            test: regexp.REGEXP_LESS,
            exclude: paths.appNodeModules,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
              useLess: true,
              modifyVars,
            }),
            sideEffects: true,
          },
          {
            test: regexp.REGEXP_LESS,
            // exclude: regexp.REGEXP_LESS_MODULE,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
              useLess: true,
              modifyVars,
            }),
            sideEffects: true,
          },
          // {
          //   test: regexp.REGEXP_LESS_MODULE,
          //   exclude: paths.appNodeModules,
          //   use: getStyleLoader({
          //     isProd,
          //     sourceMap: OPEN_SOURCE_MAP,
          //     modules: true,
          //     useLess: true,
          //     modifyVars,
          //   }),
          //   sideEffects: true,
          // },
          {
            exclude: [
              /\.(js|jsx)$/,
              /\.(html|ejs)$/,
              /\.(css|less)$/,
              /\.json$/,
            ],
            include: paths.appSrc,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: `other/[name].[hash:8].${website.name}.[ext]`,
                },
              },
            ], // 其他文件
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `${website.title}`, // 配置生成的 html 的 title，不会主动替换，需要通过模板引擎语法获取来配置
      filename: 'index.html',
      inject: true,
      template: paths.appEjs, // 本地模板文件的位置，支持加载器（如 handlebars、ejs、undersore、html 等）
      scriptLoading: 'defer', // 现代浏览器支持非阻塞javascript加载（'defer'），以提高页面启动性能。
      minify: {
        // 用于压缩 html 的配置
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
        minifyCss: true, // 压缩 html 中出现的 css 代码
        minifyJs: true, // 压缩 html 中出现的 js 代码
      },
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   module: [/main\.modern/],
    //   custom: [
    //     {
    //       test: /main\.legacy/,
    //       attribute: 'nomodule',
    //     },
    //   ],
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // IgnorePlugin 防止在 import 或 require 调用时，生成以下正则表达式匹配的模块
    new ProgressBarPlugin(),
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
    new CopyWebpackPlugin({
      patterns: [paths.appPublic],
    }),
    new FriendlyErrorsWebpackPlugin(),
  ].filter(Boolean),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  stats: {
    children: true,
    modules: true,
    performance: true,
  },
  // webpack v4 相关新特性，中文学习链接：https://beanlee.github.io/posts/blog-translate-webpack-4-mode-and-optimization/
};
