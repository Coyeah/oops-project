/*
 * @Author: ye.chen
 * @Date: 2019-08-12 10:15:32
 */
/**
 * withRef 传入一个组件 WrappedComponent
 * 通过 WithRef 属性 getInstance 函数
 * 作为 WrappedComponent 的 ref 属性
 */
import React, { PureComponent } from 'react';
import _ from 'lodash';

export default (WrappedComponent: React.ElementType) =>
  class WithRef extends PureComponent<any> {
    public render() {
      const props = { ...this.props };
      const { getInstance } = props;
      if (_.isFunction(getInstance)) {
        props.ref = getInstance;
      }
      return <WrappedComponent {...props} />;
    }
  };
