export default {
  dev: {
    '/user/': {
      target: 'http://localhost:3000/user',
      changeOrigin: true,
      pathRewrite: { '^/user/': '' },
    },
    '/message/': {
      target: 'http://localhost:3000/message',
      changeOrigin: true,
      pathRewrite: { '^/message/': '' },
    },
  },
};
