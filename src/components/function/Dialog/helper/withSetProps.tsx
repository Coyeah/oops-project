/*
 * @Author: ye.chen
 * @Date: 2019-08-12 10:27:17
 */
/**
 * withSetProps 是一个把传入的 props 转换为该高阶组件的 state 的函数
 * 柯里化两个参数
 * #1 - 是否合并，boolean，即如果是数组或者对象会递归合并，其他对象和值会直接分配覆盖。
 * #2 - 注入的组件
 */
import React, { PureComponent } from 'react';
import { merge } from 'lodash';

export type TSetPropsFunc = (props: object) => void;

export default (setPropsMerged?: boolean) => (WrappedComponent: React.ElementType) =>
  class WithSetProps extends PureComponent<any, any> {
    public state = {};

    public setProps: TSetPropsFunc = (props) => {
      const { state } = this;
      this.setState(!!setPropsMerged ? merge({}, state, props) : { ...state, ...props });
    };

    public forceUpdateProps = () => {
      this.forceUpdate();
    };

    public render() {
      const { setProps, forceUpdateProps, props, state } = this;
      const methods = { setProps, forceUpdateProps };
      const mergeStateToProps = setPropsMerged
        ? merge({}, props, state, methods)
        : { ...props, ...state, ...methods };
      return <WrappedComponent {...mergeStateToProps} />;
    }
  };
