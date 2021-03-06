// 样式
declare module '*.css';
declare module '*.less';

// 图片
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

// 通用
declare interface AnyObject {
  [name: string]: any;
}
declare interface StringObject {
  [name: string]: string;
}
