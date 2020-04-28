/*
 * @Author: ye.chen
 * @Date: 2020-04-07 17:08:23
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-17 15:38:08
 */
import React from 'react';
import { Form, Input } from 'antd';
import { merge } from 'lodash';
import open from './open';
import { DialogPromptFunc, DialogOpenProps } from './types';

const prompt: DialogPromptFunc = (props) => {
  const {
    formItemProps = {},
    name,
    label,
    required = true,
    message = `${label || ''}不可为空！`,
    initialValue,
    title = `请输入${label}`,
    formProps = {},
    node = <Input />,
    render,
    ...restProps
  } = props;

  const options = merge(
    {
      title,
      formProps: {
        ...formProps,
        initialValues: { [name]: initialValue, ...(formProps.initialValues || {}) },
      },
      render(this) {
        return (
          <Form.Item
            name={name}
            label={label}
            {...formItemProps}
            rules={[{ required, message }, ...(formItemProps.rules || [])]}
          >
            {node}
          </Form.Item>
        );
      },
    },
    restProps,
  ) as DialogOpenProps;

  open(options);
};

export default prompt;
