import React from 'react';
import { CURRENT, CurrentAuthorityType } from './renderAuthorize';
import PromiseRender from './PromiesRender';

export type AuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((currentAuthority: CurrentAuthorityType) => AuthorityType);

const checkPermissions = <T, K>(
  authority: AuthorityType,
  currentAuthority: string | string[],
  target: T,
  Exception: K,
): T | K | React.ReactNode => {
  // 没有判定权限，默认查看所有
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }
  // string 处理
  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }
  // Promise 处理
  if (authority instanceof Promise) {
    return (
      <PromiseRender<T, K>
        ok={target}
        error={Exception}
        promise={authority}
      />
    );
  }
  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      // 函数执行后返回值是 Promise
      if (bool instanceof Promise) {
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('"Authorized Check" unsupported parameters');
};

export { checkPermissions };

function check<T, K>(
  authority: AuthorityType,
  target: T,
  Exception: K,
): T | K | React.ReactNode {
  return checkPermissions<T, K>(
    authority,
    CURRENT,
    target,
    Exception,
  );
}

export default check;
