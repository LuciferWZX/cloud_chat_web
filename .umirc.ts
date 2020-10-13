import { defineConfig } from 'umi';
import proxy from './config/proxy';
import routes from './config/routes';
const name = require('./package.json').name;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    'process.env.UMI_ENV_VAR': 'DEV',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
  },
  hash:true,
  proxy: proxy['dev'],
  devServer:{
    port:8088
  },
  routes: routes,
  chainWebpack: (_: any, {}) => {
    _.output
      .library(`${name}-[name]`)
      .libraryTarget('umd')
      .jsonpFunction(`webpackJsonp_${name}`);
  },
});
