/*
 * @Author: ye.chen
 * @Date: 2020-04-07 11:26:14
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-07 11:27:39
 */
import React from 'react';
import { Form } from 'antd';

const withForm = (WrappedComponent: React.ElementType): React.FC<any> => (props) => {
  const [form] = Form.useForm();
  return <WrappedComponent {...props} form={form} />;
};

export default withForm;
