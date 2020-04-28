/*
 * @Author: ye.chen
 * @Date: 2020-04-20 11:15:51
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-28 15:23:32
 */
import Mock from 'fetch-mock';
import authorized from './authorized';

const target = {
  ...authorized,
};

Object.keys(target).forEach((key: string) => {
  const [method, url] = key.split(' ');
  Mock[method.toLocaleLowerCase()](url, target[key]);
});
