import axios from 'axios';
// import { useMessage } from 'naive-ui';
import { createDiscreteApi } from 'naive-ui';
import useUserStore from '@/store/modules/user';
import type { RequestResponse } from '@/es/request';
import { localStg } from '@/utils/storage';
import type { CustomInternalConfig, CustomRequestConfig } from '@/es';

const { message } = createDiscreteApi(['message']);
const requestMap = new Map();
const requests = axios.create({
  baseURL: import.meta.env.VITE_SERVE,
  withCredentials: false,
  timeout: 10 * 1000
});
function cancelRequest(val: string, onlyClear = false): void {
  if (onlyClear) {
    requestMap.delete(val); // 只进行清理,不再执行,用于请求成功后清除
    return;
  }
  if (val === 'all') {
    // 清理全部
    for (const [key, value] of requestMap) {
      useFn(key, value);
    }
  } else {
    // 清理指定
    useFn(val, requestMap.get(val));
  }

  function useFn(path: string, fn?: () => boolean) {
    if (path && fn && fn()) {
      requestMap.delete(path);
    }
  }
}
requests.interceptors.request.use(async (config: CustomInternalConfig) => {
  const { url, unAuth } = config as CustomInternalConfig;

  /*  const { token, openToken } = useUserStore();
  if (!openToken && unAuth) await useUserStore().setRequestOpenToken();
  config.headers.Authorization = unAuth ? openToken : token; */
  config.headers.Authorization = localStg.get('token');
  const timestamp = Date.now();

  if (url!.includes('?')) {
    config.url += `&n=${timestamp}`;
  } else {
    config.url += `?n=${timestamp}`;
  }

  return config;
});

requests.interceptors.response.use(
  async response => {
    // 成功回调
    const { data = {}, config } = response;
    const { url, cancel, queryKey, unMessage, unAuth, responseType } = config as CustomInternalConfig;
    // 如果请求配置了cancel,则返回结果时调用清除函数
    if (cancel) cancelRequest(queryKey || url!, true);

    // 如果请求配置了unAuth,则返回结果时判断是否需要重新获取openToken
    if (data.code === 600 && unAuth) {
      // 重新获取openToken, 重新请求
      await useUserStore().setRequestOpenToken();
      return requests(config);
    } else if ([600, 601, 602].includes(data.code)) {
      if (!unMessage) message.error(data.msg);
      useUserStore().userLogout();
      throw data;
    } else if ([400].includes(data.code)) {
      if (!unMessage) message.error(data.msg || '请求失败');
      throw data;
    }

    // #ifdef H5
    // Blob类型的数据直接返回 - 小程序 无 Blob 类型
    if (responseType === 'blob') return data;
    // #endif
    if (data.code !== 200) {
      if (!unMessage) message.error(data.msg || '请求失败');
      throw data;
    }

    return data;
  },
  e => {
    // 异常处理
    return Promise.reject(e?.code === 'ERR_CANCELED' ? 'cancel' : e);
  }
);

export const send = <T, N = undefined, D = undefined>(
  url: string,
  method = 'get',
  data: D extends null ? Record<string, unknown> : D = {} as D extends null ? Record<string, unknown> : D,
  config = {} as CustomRequestConfig
): Promise<N extends null ? T : RequestResponse<T>> => {
  const key = /^get$/i.test(method) ? 'params' : 'data';

  const params = { url, method, [key]: data, ...config };

  if (config.cancel) {
    const pathKey = (config.queryKey || url) as string;
    params.cancelToken = new axios.CancelToken(fn => {
      cancelRequest?.(pathKey);
      requestMap.set(key, fn);
    });
  }

  return requests(params as any) as any;
};

export const get = <T, N = undefined, D = Record<string, unknown>>(
  url: string,
  data?: D extends null ? Record<string, unknown> : D,
  config?: CustomRequestConfig
) => {
  return send<T, N, D>(url, 'GET', data, config);
};

export const post = <T, N = undefined, D = Record<string, unknown>>(
  url: string,
  data?: D extends null ? Record<string, unknown> : D,
  config?: CustomRequestConfig
) => {
  return send<T, N, D>(url, 'POST', data, config);
};

export const put = <T, N = undefined, D = Record<string, unknown>>(
  url: string,
  data?: D extends null ? Record<string, unknown> : D,
  config?: CustomRequestConfig
) => {
  return send<T, N, D>(url, 'PUT', data, config);
};

export const deleteFn = <T, N = undefined, D = Record<string, unknown>>(
  url: string,
  data?: D extends null ? Record<string, unknown> : D,
  config?: CustomRequestConfig
) => {
  return send<T, N, D>(url, 'DELETE', data, config);
};
