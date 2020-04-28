const { MOCK_ENV = 'local', PORT = '3000' } = process.env;

const domains = {
  local: {
    api: `http://localhost:${PORT}`,
    apiTarget: '/api',
  },
  dev: {
    api: `http://localhost:${PORT}`,
    apiTarget: '/api',
  },
  qa: {
    api: `http://localhost:${PORT}`,
    apiTarget: '/api',
  },
  pl: {
    api: `http://localhost:${PORT}`,
    apiTarget: '/api',
  },
  online: {
    api: `http://localhost:${PORT}`,
    apiTarget: '/api',
  },
};

const domain = domains[MOCK_ENV];

module.exports = {
  MOCK_ENV,
  PORT,
  proxy: {
    '/api/': {
      target: domain.api,
      changeOrigin: true,
      pathRewrite: {
        '^/api': domain.apiTarget,
      },
    },
  },
};

// proxy: [
//   {
//     context: ['/api'],
//     target: '127.0.0.1:9000',
//     changeOrigin: true, // 本地就会虚拟一个服务器接收你的请求并代你发送该请求
//     secure: false, // 默认情况下，即 true，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。
//   },
// ],
