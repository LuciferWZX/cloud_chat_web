export default {
  dev: {
    '/user/': {
      target: 'http://localhost:3000/user',
      changeOrigin: true,
      pathRewrite: { '^/user/': '' },
    },
  },
};
