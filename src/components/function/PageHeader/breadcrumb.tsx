/*
 * @Author: ye.chen
 * @Date: 2020-04-08 14:26:43
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-26 18:24:09
 */
import React, { useContext, ElementType, createElement } from 'react';
import { Breadcrumb } from 'antd';
import { basicContext } from '@/layouts/BasicLayout';
import { history } from '@/utils';
import { pathnameToList, getCurrentRoute } from '@/utils/authorized';
import styles from './index.less';

export interface BreadcrumbProps {
  linkElement?: ElementType;
}

const BreadcrumbView: React.FC<BreadcrumbProps> = (props) => {
  const { linkElement = 'a' } = props;
  const {
    location: { pathname },
  } = history;
  const list = pathnameToList(pathname);
  const { routesFlat } = useContext(basicContext);
  return (
    <Breadcrumb className={styles.breadcrumb}>
      {list.map((item, index) => {
        const { path, name, component } = getCurrentRoute(routesFlat, item) || {};
        return (
          <Breadcrumb.Item key={path || index}>
            {!!component && index !== list.length - 1 ? (
              createElement(
                linkElement,
                {
                  [linkElement === 'a' ? 'href' : 'to']: path,
                },
                name,
              )
            ) : (
              <span>{index === list.length - 1 ? <b>{name}</b> : name}</span>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbView;
