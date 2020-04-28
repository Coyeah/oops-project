import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import * as iconV4 from '@ant-design/icons';
import { RouteItem } from 'config/router.config';
import { AuthorizedType } from '@/components/function/Authorized/Authorized';

const { SubMenu } = Menu;

export type BaseMenuProps = {
  authorized?: AuthorizedType;
  routes?: RouteItem[];
  location?: { pathname?: string };
} & MenuProps;

export default class BaseMenu extends React.PureComponent<BaseMenuProps> {
  componentWillUnmount() {}

  checkPermissionItem = (authority?: string[], ItemDom?: ReactNode) => {
    const { authorized } = this.props;
    if (authority && authority.length !== 0 && authorized && authorized.check) {
      return authorized.check(authority, ItemDom, null);
    }
    return ItemDom;
  };

  getIcon = (icon?: string) => {
    if (!icon) return null;
    const IconV4 = iconV4[icon];
    if (!IconV4) return null;
    return <IconV4 />;
  };

  getNavMenuItems = (routes?: any[]) => {
    if (!routes) return [];
    return routes
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getSubOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => item);
  };

  getSubOrItem = (item: any) => {
    if (
      item.children &&
      !item.hideChildrenInMenu &&
      item.children.some((child: any) => child.name)
    ) {
      return (
        <SubMenu
          key={item.path}
          title={
            <span>
              {this.getIcon(item.icon)}
              <span>{item.name}</span>
            </span>
          }
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  getMenuItemPath = (item: any) => {
    const { name = '', query = {} } = item;
    return (
      <Link to={`${item.path}?${qs.stringify(query)}`}>
        {this.getIcon(item.icon)}
        <span>{name}</span>
      </Link>
    );
  };

  render() {
    const { authorized, mode = 'inline', routes = [], location = {}, ...menuProps } = this.props;
    return (
      <Menu mode={mode} {...menuProps}>
        {this.getNavMenuItems(routes)}
      </Menu>
    );
  }
}
