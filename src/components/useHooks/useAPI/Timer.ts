export default class Timer<T> {
  private remaining: number = 0; // 下一次轮询触发剩余时间

  private delay: number = 0;

  private cb: null | ((...args: any[]) => Promise<T | undefined>) = null;

  private start: number = 0;

  private timerId: any = 0;

  constructor(cb: () => Promise<T | undefined>, delay: number) {
    this.remaining = delay;
    this.delay = delay;
    // this.start = delay;
    // this.timerId = delay;
    this.cb = cb;
  }

  stop = () => {
    clearTimeout(this.timerId);
    this.timerId = 0;
    this.remaining = this.delay;
  }

  pause = () => {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  }

  resume = (...args: any[]): Promise<T> | undefined => {
    this.start = Date.now();
    clearTimeout(this.timerId);
    if (this.cb) {
      return new Promise<T>(resolve => {
        this.timerId = setTimeout(async () => {
          if (this.cb) {
            this.cb(...(args || []));
            // resume 只触发定时器开始计时，没有返回结果
            resolve(
              'No resolve value when pollingInterval is set, please use onSuccess & onError instead' as any,
            );
          }
        }, this.remaining);
      });
    }
    return undefined;
  }
}