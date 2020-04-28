import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';

/*
 *  扁平化tree
 */
export const flattenTree = memoizeOne((tree: AnyObject, childrenKey?: string): any[] => {
  if (typeof childrenKey === 'undefined') childrenKey = 'children';
  let keys: string[] = [];
  tree.forEach((item: any) => {
    if (!item) {
      return;
    }
    keys.push(item);
    if (item[childrenKey as string]) {
      keys = keys.concat(flattenTree(item[childrenKey as string]));
    }
  });
  return keys;
}, isEqual);

// 对象数组 针对指定属性 进行排序
export const objectListSort = (list: object[], property: string) => {
  function compare(property: string) {
    return function (obj1: object, obj2: object) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 - value2; // 升序
    };
  }

  return list.sort(compare(property));
};

/**
 * 函数列表逐层运行，如中间件
 * @param  {...Function} funcs
 * @returns {Function}
 */
export function compose(...funcs: any[]) {
  if (funcs.length === 0) return (arg: any) => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
}

/**
 * 生成唯一标识符 UUID
 * @return [uuid]
 */
export const generateUUID = () => {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
