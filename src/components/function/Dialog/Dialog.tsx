/*
 * @Author: ye.chen
 * @Date: 2020-04-07 09:03:13
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-17 11:33:50
 */
import React from 'react';
import Form from 'antd/lib/form';
import Modal, { ModalProps } from 'antd/lib/modal';
import { isBoolean, isFunction, omit } from 'lodash';
import { DialogProps, DialogOpenFunc, DialogPromptFunc } from './types';
require('antd/lib/modal/style');

export default class Dialog extends React.PureComponent<DialogProps & ModalProps> {
  static open: DialogOpenFunc;
  static prompt: DialogPromptFunc;

  render() {
    const {
      onOk,
      onCancel,
      transition,
      render,
      content,
      title,
      titleRender,
      footerRender,
      confirmLoading,
      dominate = () => ({}),
      props,
      formProps,
      form,
      ...restProps
    } = this.props;
    let modalProps: ModalProps = {
      visible: true,
      onOk: onOk && onOk.bind(this),
      onCancel: onCancel && onCancel.bind(this),
      title,
      okText: '确认',
      cancelText: '取消',
      ...props,
      ...restProps,
      ...dominate(this),
    };
    if (isBoolean(transition) && !transition) {
      modalProps = { ...modalProps, transitionName: '', maskTransitionName: '' };
    }
    if (isFunction(titleRender)) {
      modalProps = { ...modalProps, title: (titleRender as Function).apply(this) || title };
    }
    if (isFunction(footerRender)) {
      modalProps = { ...modalProps, footer: (footerRender as Function).apply(this) || null };
    }
    let body: React.ReactElement | React.ReactNode | undefined = content;
    if (!body && render) {
      body = render.bind(this)(this);
    }
    if (form && formProps) {
      let formRestProps = omit(formProps, [
        'action',
        'method',
        'valuesFilter',
        'onSubmitted',
        'onError',
      ]);
      body = (
        <Form form={form} {...formRestProps}>
          {body}
        </Form>
      );
    }
    return <Modal {...modalProps}>{body}</Modal>;
  }
}
