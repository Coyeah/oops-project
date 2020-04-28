import _ from 'lodash';

/**
 * HTML5 会话存储方法
 * @param  key            [字段]
 * @param  value          [对应值]
 * @param  sessionStorage [会话存储对象：sessionStorage / localStorage]
 * @return                [description]
 */
export const storage = (key: any, value?: any, memory = localStorage) => {
  if (_.isPlainObject(key)) {
    // key 为对象的情况下，分开存储
    _.forEach(key, (value, key) => {
      storage(key, value);
    });
  } else if (_.isString(key) && _.isNull(value)) {
    // value 值为 null，默认为删除 key对应存储对象
    memory.removeItem(key);
  } else if (_.isString(key) && _.isUndefined(value)) {
    // value 值为 undefined，默认为获取 key 对应存储对象
    value = memory.getItem(key) || null;
    try {
      value = JSON.parse(value);
    } catch (e) {}
    return value;
  } else if (_.isString(key)) {
    // 存入
    try {
      value = JSON.stringify(value);
    } catch (e) {}
    memory.setItem(key, value);
  } else if (_.isNull(key)) {
    // key 值为空，清空会话存储
    memory.clear();
  }
};

export const session = (key: any, value?: any) => {
  return storage(key, value, sessionStorage);
};
