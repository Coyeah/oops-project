import React from 'react';
import { Layout, Icon } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { routeConfig, RouteItem } from '@/router';
import { Icon as Logo } from '@/components';

import logo from '@/assets/carbon.png';
import styles from './index.module.less';

const { Sider } = Layout;

const GlobalSider: React.FC<{ pathname: string }> = ({
  pathname
}) => {
  return (
    <Sider width={150} className={styles.sider}>
      <Logo src={logo} className={styles.logo} size={80} />
      <div>
        {routeConfig.map(({ name, icon, path }: RouteItem) => {
          const cx = classNames(styles.item, {
            [styles['item-focus']]: pathname === path
          });
          if (!name) return null;
          if (!icon) icon = 'border';
          return (
            <Link to={path} key={path}>
              <div className={cx}>
                <Icon type={icon} />
                <span className={styles['item-text']}>{name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </Sider>
  )
};

export default GlobalSider;