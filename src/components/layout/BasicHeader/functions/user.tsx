import React, { useCallback } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import { AuthStoreProps } from '@/stores/AuthStore';
import { compose, history } from '@/utils';

export default compose(
  inject('authStore'),
  observer,
)((props: any) => {
  const { authStore } = props as { authStore: AuthStoreProps };
  const logout = useCallback(() => {
    authStore.logout(() => {
      history.push('/authorized/login');
    });
  }, []);
  const { username } = authStore.getInfomation();
  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <div style={{ marginRight: 30 }}>
      <Spin spinning={authStore.loading}>
        <Dropdown overlay={menu}>
          <div style={{ cursor: 'pointer' }}>
            <UserOutlined />
            <span style={{ marginLeft: 5 }}>{username}</span>
          </div>
        </Dropdown>
      </Spin>
    </div>
  );
});
