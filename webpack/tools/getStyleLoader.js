const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。

const getStyleLoader = ({
  isProd,
  sourceMap = true,
  modules = false,
  useLess = false,
  modifyVars = {},
}) => {
  return [
    isProd
      ? MiniCssExtractPlugin.loader
      : {
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
          },
        },
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          localIdentName: isProd ? '[hash:base64]' : '[path][name]__[local]',
        },
        sourceMap,
        importLoaders: useLess ? 2 : 1, // Number of loaders applied before CSS loader
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap,
      },
    },
    useLess && {
      loader: require.resolve('less-loader'), // compiles Less to CSS
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
        appendData: (loaderContext) => {
          // More information about available properties https://webpack.js.org/api/loaders/
          let rst = '';
          Object.keys(modifyVars).map((key) => {
            rst += `${key}:${modifyVars[key]};`;
          });
          return rst;
        },
        sourceMap,
      },
    },
  ].filter(Boolean);
};

module.exports = getStyleLoader;
