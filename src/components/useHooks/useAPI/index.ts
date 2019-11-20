import { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import Timer from './Timer';

// 设置本地化的请求函数
type fetch = (url: string, options?: RequestInit & { data?: object }) => Promise<any>;
let globalMethod: fetch;
const configRequest = (method: () => any) => {
  globalMethod = method;
};

// 空 promise
type promiseReturn<T> = (...args: any[]) => Promise<T | undefined>;
const promiseReturn: promiseReturn<any> = async () => null as any;
// 空函数
type noop = (...args: any[]) => void;
const noop: noop = () => { };

interface IOperateProps<T> {
  suspense?: boolean; // 支持 React.Suspense
  manual?: boolean;
  pollingInterval?: number;
  onSuccess?: (d: T) => void;
  onError?: (d: T) => void;
}

interface IRequestProps {
  url?: string;
  request?: (...args: any[]) => Promise<any>;
  data?: object;
  payload?: object;
}

export type UseAPIProps<T = any> = IRequestProps & RequestInit & IOperateProps<T>;

export interface ReturnValue<T> {
  loading: boolean;
  error?: Error;
  data?: T;
  cancel: noop;
  run: promiseReturn<T | undefined>;
  timer: {
    stop: noop;
    resume: noop;
    pause: noop;
  };
}

const Uninitialized = -1,
  Pending = 0,
  Resolved = 1,
  Rejected = 2;

globalMethod = fetch;

const useAPI = <Result = any>(opt: IRequestProps & RequestInit & IOperateProps<Result>) => {
  // 组件内部请求方法
  // const _method = opt.request || globalMethod || fetch;
  // 内置 options 对象
  const _options = useMemo<IOperateProps<Result>>(() => {
    const { manual, pollingInterval, onSuccess, onError, suspense } = opt;
    return {
      manual,
      pollingInterval,
      onSuccess,
      onError, 
      suspense
    };
  }, [opt]);
  // 请求传参初始值
  const initPayload = useMemo<RequestInit | null>(() => {
    if (opt.request) return null;
    const { url, data, payload, request, manual, pollingInterval, onSuccess, onError, suspense, ...rest } = opt;
    return rest;
  }, [opt]);

  const fn = useCallback(async (attach?: object) => {
    let res: any;
    attach = attach || {};
    const { request, payload = {}, url, data } = opt;
    if (request) {
      res = await request({ ...payload, ...attach });
    } else if (url) {
      if (globalMethod) {
        res = await globalMethod(url, {
          ...initPayload,
          data: {
            ...data,
            ...attach
          }
        })
      } else {
        throw Error('"useAPI": Request function must be set.');
      }
    } else {
      throw Error('"useAPI": One of the [url] or [request] must exist.');
    }

    return res && res.json && typeof res.json === 'function' ? res.json() : res;
  }, [opt]);

  const [state, setState] = useState<ReturnValue<Result>>({
    loading: false,
    cancel: noop,
    run: promiseReturn,
    timer: {
      stop: noop,
      resume: noop,
      pause: noop,
    },
  });
  const timer = useRef<Timer<Result> | undefined>(undefined);
  const count = useRef(0);
  const init = useRef(true);
  const status = useRef(Uninitialized);
  const [runner, setRunner] = useState<any>(null);

  useEffect(() => {
    count.current += 1;
    init.current = true;
    return () => {
      count.current += 1;
    };
  }, []);

  const run = useCallback((...args: any[]): Promise<Result | undefined> => {
    // 确保不会返回被取消的结果
    const runCount = count.current;
    status.current = Pending;
    setState((s: ReturnValue<Result>) => ({ ...s, loading: true }));
    // return fn(...args)
    //   .then(data => {
    //     if (runCount === count.current) {
    //       if (_options.onSuccess) {
    //         _options.onSuccess(data);
    //       }
    //       if (runCount === count.current) {
    //         status.current = Resolved;
    //         setState((s: ReturnValue<Result>) => ({ ...s, data, loading: false }));
    //       }
    //     }
    //     return data;
    //   })
    //   .catch(error => {
    //     if (runCount === count.current) {
    //       if (_options.onError) {
    //         _options.onError(error);
    //       }
    //       if (runCount === count.current) {
    //         setState((s: ReturnValue<Result>) => ({ ...s, error, loading: false }));
    //       }
    //     }
    //     return error;
    //   });
    const task = fn(...args)
      .then(data => {
        if (runCount === count.current) {
          if (_options.onSuccess) {
            _options.onSuccess(data);
          }
          if (runCount === count.current) {
            status.current = Resolved;
            setState((s: ReturnValue<Result>) => ({ ...s, data, loading: false }));
          }
        }
        return data;
      })
      .catch(error => {
        if (runCount === count.current) {
          if (_options.onError) {
            _options.onError(error);
          }
          if (runCount === count.current) {
            status.current = Rejected;
            setState((s: ReturnValue<Result>) => ({ ...s, error, loading: false }));
          }
        }
        return error;
      });
    setRunner(task);
    return task;
  }, []);

  if (_options.suspense && status.current !== Uninitialized && status.current !== Resolved) {
    throw runner;
  }

  const stop = useCallback(() => {
    count.current += 1;
    if (timer.current) {
      timer.current.stop();
    }
    setState((s: ReturnValue<Result>) => ({ ...s, error: new Error('stopped'), loading: false }));
  }, []);

  const pause = useCallback(() => {
    count.current += 1;
    if (timer.current) {
      timer.current.pause();
    }
    setState((s: ReturnValue<Result>) => ({ ...s, error: new Error('paused'), loading: false }));
  }, []);

  const resume = useCallback(async (...args: any[]): Promise<Result | undefined> => {
    if (timer.current) {
      return timer.current.resume(...(args || []));
    }
    return undefined;
  }, []);
  // 用于 手动控制请求 且 轮询 的情况
  const start = useCallback(
    async (...args: any[]): Promise<Result | undefined> => {
      await run(...(args || []));
      return resume(...(args || []));
    },
    [run],
  );

  const intervalAsync = useCallback(
    async (...args: any[]) => {
      const runCount = count.current;
      let ret: Result | undefined;
      if (!_options.manual || !init.current) {
        ret = await run(...(args || []));
      }
      if (count.current === runCount) {
        // 设置定时器，不开始计时
        timer.current = new Timer<Result>(
          () => intervalAsync(...args),
          _options.pollingInterval as number,
        );
        // 如果设置了 manual，不主动开始计时
        if (init.current && _options.manual) {
          init.current = false;
        } else {
          ret = await timer.current.resume(...(args || []));
        }
      }
      return ret;
    },
    [_options.pollingInterval, _options.manual, run],
  );

  const reload = useCallback(
    (...args: any[]): Promise<Result | undefined> => {
      // 防止上次数据返回
      count.current += 1;
      if (_options.pollingInterval) {
        if (!_options.manual) {
          stop();
        }
        return intervalAsync(...args);
      }
      return run(...(args || []));
    },
    [run, _options.pollingInterval, _options.manual],
  );

  const cancel = useCallback(() => {
    count.current += 1;
    setState((s: ReturnValue<Result>) => ({ ...s, error: new Error('canceled'), loading: false }));
  }, []);

  useEffect(() => {
    if (_options.pollingInterval) {
      intervalAsync();
    } else if (!_options.manual) {
      run();
    }
    return () => {
      count.current += 1;
      stop();
    };
  }, [_options.manual, _options.pollingInterval, run, intervalAsync]);

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    cancel,
    run: _options.manual && _options.pollingInterval ? start : reload,
    timer: {
      stop,
      resume,
      pause,
    },
  };
};

export default useAPI;
export { Timer, configRequest };