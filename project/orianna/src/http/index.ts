import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as $message } from 'ant-design-vue';
import { isString } from 'lodash';
import { useUserToken } from '@/store/modules';
import { storage } from '@hydra/utils/storege';
import { Logout } from '@/tools';
import { AxiosCanceler } from '@hydra/utils/axiosCancel';
/**
 * @description: 请求方法
 */
interface RequestOptions {
  // 成功的文本信息
  successMessageText?: string;
}
//创建实例
const service = axios.create();
//取消请求Map
const axiosCanceler = new AxiosCanceler();
//请求之前正确 和 错误 拦截器
service.interceptors.request.use((config) => {
  //请求队列
  axiosCanceler.addPending(config);
  const userTokenStore = useUserToken();
  // 请求之前处理config
  const { token, tokenType } = userTokenStore;
  if (token) {
    config.headers!['Authorization'] = `${tokenType} ${token}`;
  }
  config.headers!['Local-Lan'] = 'zh-CN';
  return config;
}, undefined);
//响应之后 正确 和 错误 拦截器
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    //队列一一清空
    response && axiosCanceler.removePending(response.config);
    const userTokenStore = useUserToken();
    //token将过期时候，分配新的token并替换
    const token: string = response.headers['new-token'];
    if (token) {
      storage.set('Access-Token', token);
      userTokenStore.SetToken(token);
    }
    return response;
  },
  (error) => {
    const isCancel = axios.isCancel(error);

    //状态为非200处理
    const { response, message } = error;
    //移除队列
    response && axiosCanceler.removePending(response.config);
    //授权过期 or token失效
    if (response && response.status == 401) {
      //登录失效
      $message.error('登录身份失效，请重新登录');
      Logout();
    } else {
      !isCancel && $message.error(message);
    }
    return Promise.reject(error);
  },
);
const request = async <T = any>(
  config: AxiosRequestConfig,
  options: RequestOptions = {},
): Promise<T> => {
  try {
    const { successMessageText } = options;
    const res = await service.request(beforeRequestHook(config));
    //状态为200的处理
    if (res.data.code) {
      $message.error(res.data.msg || '服务器异常');
    } else {
      successMessageText && $message.success(successMessageText);
    }
    return Promise.resolve(res.data);
  } catch {
    //捕捉error
    return Promise.reject();
  }
};
//请求之前处理url，header
const beforeRequestHook = (config: AxiosRequestConfig): AxiosRequestConfig => {
  //请求头处理
  config.headers = { 'Content-Type': 'application/json;charset=UTF-8' };
  // 请求地址和请求参数处理
  if (config.method === 'GET') {
    if (!isString(config.params)) {
      if (!config.params) return config;
    } else {
      config.url = config.url + '/' + config.params;
      config.params = {};
    }
  } else {
    if (!isString(config.params)) {
      if (!config.params) return config;
      config.data = config.params;
    } else {
      config.url = config.url + config.params;
    }
    config.params = {};
  }
  return config;
};
export default request;
