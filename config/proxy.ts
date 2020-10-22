import { URL_ADDRESS } from '@/utils/constans';
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
