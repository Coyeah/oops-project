/*
 * @Author: ye.chen
 * @Date: 2020-04-10 09:31:22
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-24 15:45:44
 */
import React from 'react';
import styles from './index.less';
import classNames from 'classnames';
import Form, { FormInstance } from 'antd/lib/form';
import { CommonFilterProps } from './types';
import Type2Component from '../Type2Component';

const defaultCol = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default class CommonFilter extends React.PureComponent<CommonFilterProps, {}> {
  formRef = React.createRef<FormInstance>();

  render() {
    const { columns = [], mode = 'default', children, ...restProps } = this.props;
    const isSubmit = mode === 'submit';
    const cx = classNames(styles.commonFilterLayout, {
      [styles['commonFilterLayout-submit']]: isSubmit,
    });
    const defaultStyle = {
      width: isSubmit ? '100%' : 100,
    };
    return (
      <div className={cx}>
        <Form ref={this.formRef} {...restProps}>
          {columns.map((item) => {
            const { type, props: t2cProps = {}, ...rest } = item;
            return (
              <Form.Item key={rest.name} {...defaultCol} {...rest}>
                <Type2Component
                  type={type}
                  {...t2cProps}
                  style={{ ...defaultStyle, ...((t2cProps as AnyObject).style || {}) }}
                />
              </Form.Item>
            );
          })}
          {children}
        </Form>
      </div>
    );
  }
}
