module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        // loose: true,
        modules: false,
        corejs: 3,
        // targets: {
        //   browsers: [
        //     'last 2 Chrome versions', 'not Chrome < 60',
        //     'last 2 Safari versions', 'not Safari < 10.1',
        //     'last 2 iOS versions', 'not iOS < 10.3',
        //     'last 2 Firefox versions', 'not Firefox < 59',
        //     'last 2 Edge versions', 'not Edge < 15',
        //   ]
        // }
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['babel-plugin-lodash'],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-object-assign',
  ],
  overrides: [
    // 把webpack配置文件转义
    {
      test: ['./webpack/**/*', './config/**/*'],
      presets: ['@babel/preset-env'],
    },
  ],
};
