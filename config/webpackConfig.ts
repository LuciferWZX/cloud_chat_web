import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
const webpackConfig = (_: any, {}) => {
  _.plugin('antdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin);
};
export default webpackConfig;
