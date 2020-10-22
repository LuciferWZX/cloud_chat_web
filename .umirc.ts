import { defineConfig } from 'umi';
import proxy from './config/proxy';
import routes from './config/routes';
import webpackConfig from './config/webpackConfig';
const name = require('./package.json').name;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    'process.env.UMI_ENV_VAR': 'DEV',
  },
  headScripts: [
    //ChatUI图标
    `//g.alicdn.com/chatui/icons/0.2.7/index.js`,
  ],
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
  },
  hash: true,
  proxy: proxy['dev'],
  devServer: {
    port: 8088,
  },
  routes: routes,
  chainWebpack: webpackConfig,
});
