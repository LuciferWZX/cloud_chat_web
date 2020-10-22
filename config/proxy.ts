//const URL_ADDRESS = 'http://192.168.99.173:3000';
const URL_ADDRESS = 'http://localhost:3000';
export default {
  dev: {
    '/user/': {
      target: `${URL_ADDRESS}/user`,
      changeOrigin: true,
      pathRewrite: { '^/user/': '' },
    },
    '/message/': {
      target: `${URL_ADDRESS}/message`,
      changeOrigin: true,
      pathRewrite: { '^/message/': '' },
    },
  },
};
