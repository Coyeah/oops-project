const getThreadLoader = (opts = {}) => {
  return {
    loader: 'thread-loader',
    options: {
      workers: 3,
      ...opts,
    },
  };
};

module.exports = getThreadLoader;
