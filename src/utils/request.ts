import { extend, RequestOptionsInit, ResponseError } from 'umi-request';
import styles from '@/global.less';
import { notification } from 'antd';

// const baseUrl = process.env.apiUrl;
// const ENV = process.env.UMI_ENV_VAR;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError): Response => {
  const { response } = error;

  if (response && response.status) {
    const errorText =
      (codeMessage as { [key: number]: string })[response.status] ||
      response.statusText;
    const { status, url } = response;
    //const msg:string = `请求错误 ${status}: ${url}`;
    const msg: string = `请求错误 ${status}`;
    notification.error({
      icon: null,
      message: msg,
      description: errorText,
      className: styles['request-err-notification'],
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
      className: styles['request-err-notification'],
    });
  }
  return response;
};

const request = extend({
  //prefix: ENV === 'TEST' ? baseUrl : '/lesscode',
  timeout: 300000,
  errorHandler, // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use(
  (url: string, options: RequestOptionsInit): any => {
    let TOKEN = localStorage.getItem('Authorization');
    if (TOKEN) {
      options.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        //Accept: 'application/json',
        Authorization: 'Bearer ' + TOKEN,
      };
    }
  },
);

// response拦截器, 处理response
// @ts-ignore
request.interceptors.response.use((response, options) => {
  // let token = response.headers.get('Authorization');
  // if (token) {
  //   localStorage.setItem('Authorization', token);
  // }
  // if(!response.ok){
  //   return null
  // }
  return response;
});

export default request;
