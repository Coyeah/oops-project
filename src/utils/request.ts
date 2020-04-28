import 'whatwg-fetch';
import { message, notification } from 'antd';
import { merge } from 'lodash';

interface AnyObject {
  [name: string]: any;
}

type Body =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | AnyObject
  | null;

type InterceptorPair<T = any> = {
  onFulfilled: Identity<T>;
  onRejected?: Identity<T>;
} | null;

type Identity<T> = (arg: T) => T;

class InterceptorsManager<T = {}> {
  public interceptors: InterceptorPair<T>[];

  public constructor(interceptors: InterceptorPair<T>[] = []) {
    this.interceptors = interceptors;
  }

  public use(onFulfilled: Identity<T>, onRejected?: Identity<any>): number {
    const interceptorPair: InterceptorPair<T> = { onFulfilled };
    if (onRejected) {
      interceptorPair.onRejected = onRejected;
    }
    this.interceptors.push(interceptorPair);
    return this.interceptors.length;
  }

  public reject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }

  public compose(promise: Promise<T>, extraInterception: InterceptorPair<T>[] = []) {
    return extraInterception.concat(this.interceptors).reduce((acc, pair) => {
      if (!pair) {
        return acc;
      }
      const { onFulfilled, onRejected } = pair;
      if (onRejected) {
        return acc.then(onFulfilled, onRejected);
      }
      return acc.then(onFulfilled);
    }, promise);
  }
}

interface RequestInitOption {
  defaultOptions?: FetchCommonOptions;
  transformRequest?: InterceptorPair<RequestInterceptorOptions>[];
  transformResponse?: InterceptorPair<ResponseInterceptorOptions>[];
}

type RequestInterceptorOptions = InputOptions & {
  url: string;
};

interface InputOptions extends FetchOptions {
  params?: AnyObject;
  query?: AnyObject;
  transformRequest?: InterceptorPair<RequestInterceptorOptions>[];
  transformResponse?: InterceptorPair<ResponseInterceptorOptions>[];
}

interface FetchOptions extends FetchCommonOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
  body?: Body;
}

interface FetchCommonOptions {
  headers?: Headers | Record<string, string> | string[][];
  mode?: 'cors' | 'no-cors' | 'same-origin';
  credentials?: 'omit' | 'same-origin' | 'include';
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
  redirect?: 'follow' | 'error' | 'manual';
  referrer?: 'no-referrer' | 'client';
  referrerPolicy?: '' | 'no-referre' | 'no-referrer-when-downgrade' | 'unsafe-url' | 'origin-only';
  integrity?: string;
}

type ResponseInterceptorOptions = Response | Blob | FormData | ArrayBuffer | string | never | any;

class R {
  public interceptors: {
    request: InterceptorsManager<RequestInterceptorOptions>;
    response: InterceptorsManager<ResponseInterceptorOptions>;
  };

  public defaultOptions: FetchCommonOptions;

  constructor(initOptions: RequestInitOption = {}) {
    const { defaultOptions = {}, transformRequest = [], transformResponse = [] } = initOptions;
    this.interceptors = {
      request: new InterceptorsManager<RequestInterceptorOptions>(transformRequest),
      response: new InterceptorsManager<ResponseInterceptorOptions>(transformResponse),
    };
    this.defaultOptions = defaultOptions;
  }

  public fetch(url: string, options: InputOptions) {
    const fullInputOptions = merge({}, this.defaultOptions, options);
    const { transformRequest, transformResponse, ...restOptions } = fullInputOptions;

    let requestPromise = Promise.resolve({ url, ...restOptions });
    requestPromise = this.interceptors.request.compose(requestPromise, transformRequest);
    let responsePromise = requestPromise.then(({ url, params, query, ...options }) =>
      fetch(url, options as any),
    );
    responsePromise = this.interceptors.response.compose(responsePromise, transformResponse);
    return responsePromise as Promise<any>;
  }

  public get<R = ResponseSchema>(url: string, options: InputOptions = {}) {
    const result: Promise<R> = this.fetch(url, { ...options, method: 'GET' });
    return result;
  }

  public post<R = ResponseSchema>(url: string, options: InputOptions = {}) {
    const result: Promise<R> = this.fetch(url, { ...options, method: 'POST' });
    return result;
  }

  public put<R = ResponseSchema>(url: string, options: InputOptions = {}) {
    const result: Promise<R> = this.fetch(url, { ...options, method: 'PUT' });
    return result;
  }

  public patch<R = ResponseSchema>(url: string, options: InputOptions = {}) {
    const result: Promise<R> = this.fetch(url, { ...options, method: 'PATCH' });
    return result;
  }

  public head<R = ResponseSchema>(url: string, options: InputOptions = {}) {
    const result: Promise<R> = this.fetch(url, { ...options, method: 'HEAD' });
    return result;
  }

  public delete<R = ResponseSchema>(url: string, options: InputOptions = {}) {
    const result: Promise<R> = this.fetch(url, { ...options, method: 'DELETE' });
    return result;
  }
}

const request = new R();

// ========== checkResponseStatus ========= //
const errCodeMessages: {
  [name: number]: string;
} = {
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

function isResponseStatusOk(response: Response): boolean {
  const { status } = response;
  return (status >= 200 && status < 300) || status === 304;
}

interface ResponseError extends Error {
  status: number;
  response: Response;
}

function ownThrowError(response: Response): never {
  const errortext = errCodeMessages[response.status] || response.statusText;
  const error = new Error(errortext);
  const myError = error as ResponseError;
  myError.status = response.status;
  myError.response = response;
  console.warn(`"${response.url}"请求错误 ${response.status}：${errortext}`);
  notification['error']({
    message: `请求错误 ${response.status}`,
    description: `${errortext}`,
  });
  throw myError;
}

function checkResponseStatus(response: Response): Response | never {
  if (isResponseStatusOk(response)) {
    return response;
  }
  return ownThrowError(response);
}

request.interceptors.response.use(checkResponseStatus);
// ========== checkResponseStatus ========= //

export default request;

// ========== custom ========== //

export const api = (params: string | ({ url: string } & InputOptions), options?: InputOptions) => {
  let _url: string = '';
  if (typeof params === 'string') {
    _url = params as string;
  } else {
    const { url, ...opts } = params;
    _url = url;
    options = opts;
  }
  const opts: InputOptions = {
    method: 'POST',
    ...options,
  };
  return request
    .fetch(_url, opts)
    .then((response) => response.json())
    .then((response) => {
      if (response.code !== 0) {
        message.error(response.message);
      }
      return response;
    });
};

export type ResponseSchema<T = any> = {
  code: number | string;
  message: string;
  data: T;
} & AnyObject;

// ========== custom ========== //
