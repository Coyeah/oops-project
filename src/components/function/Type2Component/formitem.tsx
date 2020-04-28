/*
 * @Author: ye.chen
 * @Date: 2020-04-10 17:37:32
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-24 15:48:35
 */
import React from 'react';
import Component, { Type2ComponentProps, Type2ComponentType } from './component';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

export interface Type2FormItemProps extends Omit<FormItemProps, 'children'> {
  type: Type2ComponentType;
  name: string;
  props?: Type2ComponentProps;
  required?: boolean;
}

const Type2FormItem: React.FC<Type2FormItemProps> = (props) => {
  const { type, props: rest, required = false, ...restProps } = props;

  if (required) {
    restProps.rules = [
      ...(restProps.rules || []),
      { required, message: `${restProps.label}不可为空！` },
    ];
  }

  return (
    <Form.Item {...restProps}>
      <Component {...rest} type={type} />
    </Form.Item>
  );
};

export default Type2FormItem;
