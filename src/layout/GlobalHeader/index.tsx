import React, { useMemo, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { routeConfig, RouteItem } from '@/router';
import styles from './index.module.less';

export interface IProps {
  pathname: string;
}

const { Header } = Layout;
const parseUrl = (pathname: string, modules?: boolean) => {
  let list = pathname.split('/');
  list = list.map(value => {
    if (!!modules) {
      return value[0] === ':' ? ':string:' : value;
    } else {
      return value.length > 20 ? ':string:' : value;
    }
  });
  return list.join('/')
};
const createRouteMap: (routes: RouteItem[], prefix?: string[]) => object = (routes, prefix = []) => {
  let map = {};
  routes.forEach(({ name, path, routes }: RouteItem) => {
    path = parseUrl(path, true);
    if (name) {
      map[path] = [...prefix, {name, path}];
    }
    let newMap: object = {};
    if (routes && routes.length > 0) {
      newMap = createRouteMap(routes, map[path]);
    }
    map = {
      ...map,
      ...newMap,
    }
  });
  map['/'] = map['/home'];
  return map;
};

const GlobalHeader: React.FC<IProps> = ({ pathname }) => {
  const [routeMap, setRouteMap] = useState({});
  useEffect(() => {
    setRouteMap(createRouteMap(routeConfig));
  }, []);

  const breadCrumbsRender = useMemo(() => {
    const url = parseUrl(pathname);
    const list = routeMap[url];
    if (!list) return null;
    const render = [];
    for (let i = 0; i < list.length; i++) {
      const {path, name} = list[i];
      render.push(
        <div key={name} className={styles['bread-crumbs-text']}>
          {i !== list.length - 1 && (
            <>
              <Link to={path} key={path}>{name}</Link>
              <span className={styles['bread-crumbs-break']}>/</span>
            </>
          )}
          {i === list.length - 1 && (
            <b>{name}</b>
          )}
        </div>
      )
    }
    return render;
  }, [routeMap, pathname]);

  return (
    <Header className={styles.header}>
      <div className={styles['bread-crumbs']}>
        {breadCrumbsRender}
      </div>
    </Header>
  )
}

export default GlobalHeader;