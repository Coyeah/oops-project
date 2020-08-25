const { MOCK_ENV = 'local', PORT = '3000' } = process.env;

const domains = {
  local: {
    api: `http://localhost:${PORT}`,
    apiTarget: '/_api/',
  },
  dev: {
    api: `http://localhost:${PORT}`,
    apiTarget: '',
  },
  qa: {
    api: `http://localhost:${PORT}`,
    apiTarget: '',
  },
  pl: {
    api: `http://localhost:${PORT}`,
    apiTarget: '',
  },
  online: {
    api: `http://localhost:${PORT}`,
    apiTarget: '',
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

