/*
 * @Author: ye.chen
 * @Date: 2020-04-07 09:13:01
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-17 17:44:54
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { merge, isFunction, pickBy, forEach } from 'lodash';
import { DialogOpenFunc, DialogOpenProps } from './types';
import Dialog from './Dialog';
import { withRef, withSetProps, withForm } from './helper';
import request from '@/utils/request';
import autodata, { AutodataParams } from '../autodata';

const withAutodata = autodata;

const open: DialogOpenFunc = (props) => {
  const { action, method = 'POST', onSubmitted, ...restProps } = props || {};
  const options: DialogOpenProps = merge(
    {
      title: '弹窗',
      delay: 0,
      setPropsMerged: true,
      autoClose: true,
      maskClosable: false,
      transition: false,
      formProps: {
        action,
        method,
        onSubmitted,
        onSubmit(this: any) {
          const that = this;
          const {
            form,
            autoClose,
            formProps: { action, method, valuesFilter, onSubmitted, onError },
            setProps,
          } = this.props;
          form.validateFields().then(async (body: AnyObject) => {
            if (action) {
              setProps({ confirmLoading: true });
              if (isFunction(valuesFilter)) {
                body = valuesFilter.bind(that)(body);
              }
              const args = { method };
              if (method === 'GET') {
                Object.assign(args, { query: body });
              } else {
                Object.assign(args, { data: body });
              }
              try {
                const res: any = await request(action, args);
                isFunction(onSubmitted) && onSubmitted.bind(that)(res);
                autoClose && that.destroy();
              } catch (e) {
                setProps({ confirmLoading: false });
                isFunction(onError) && onError.apply(that);
              }
            } else {
              isFunction(onSubmitted) && onSubmitted.bind(that)(body);
              autoClose && that.destroy();
            }
          });
        },
      },
      onOk(this: any, e: React.FormEvent<HTMLFormElement>) {
        e && e.preventDefault();
        if (this.props.formProps) {
          this.props.formProps.onSubmit.bind(this)(e);
          // this.props.form.submit();
        } else {
          this.destroy();
        }
      },
      onCancel(this: any) {
        this.destroy();
      },
    },
    restProps,
  );

  setTimeout(() => {
    const container = document.createElement('div');
    const { setPropsMerged, autodata } = options;
    const { render, ...methods } = pickBy(options, isFunction);
    const saveRef = (instance: any) => {
      if (instance) {
        merge(instance, {
          destroy() {
            const { onDestroy } = instance;
            isFunction(onDestroy) && onDestroy();
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
          },
        });
        forEach(methods, (method, key) => {
          instance[key] = method.bind(instance);
        });
        const { state } = options;
        state && instance.setProps({ state });
        instance.props.forceUpdateProps();
      }
    };

    let WrappedComponent: React.ComponentType<any> = Dialog;
    WrappedComponent = withRef(WrappedComponent);
    WrappedComponent = withSetProps(setPropsMerged)(WrappedComponent);
    WrappedComponent = withForm(WrappedComponent);

    if (autodata) {
      const autodataSet = Array.isArray(autodata) ? autodata : [autodata];
      autodataSet.forEach((set: AutodataParams) => {
        WrappedComponent = withAutodata(set)(WrappedComponent);
      });
    }

    document.body.appendChild(container);
    ReactDOM.render(<WrappedComponent {...options} getInstance={saveRef} />, container);
  }, options.delay);
};

export default open;
