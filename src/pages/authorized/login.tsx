/*
 * @Author: ye.chen
 * @Date: 2020-04-28 11:05:08
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-28 14:39:06
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';
import { compose, history } from '@/utils';
import { inject, observer } from 'mobx-react';
import { AuthStoreProps } from '@/stores/AuthStore';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const Login: React.FC = (props) => {
  const onFinish = (values: AnyObject) => {
    const { authStore } = props as { authStore: AuthStoreProps };
    authStore.login(values, () => {
      history.push('/');
    });
  };
  return (
    <div className={styles.layout}>
      <div className={styles.title}>{INITIAL_SITE_INFO.title}</div>
      <div className={styles.form}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ username: 'admin', password: 'admin' }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password placeholder="admin" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles['submit-btn']}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default compose(inject('authStore'), observer)(Login);
