/*
 * @Author: ye.chen
 * @Date: 2020-04-29 16:54:24
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-29 19:45:40
 */
import React from 'react';
import { PageHeader } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export type ColumnItemProps = {
  title?: string;
  subTitle?: string;
  width?: number;

  [name: string]: any;
};

const ColItem: React.FC<ColumnItemProps> = (props) => {
  let { title, subTitle, width, style = {}, className, children, ...rest } = props;
  if (width) {
    style = {
      minWidth: width,
      maxWidth: width,
      ...style,
    };
  }
  rest.style = style;
  return (
    <div className={classNames(className, styles.column)} {...rest}>
      {title && <PageHeader title={title} subTitle={subTitle} />}
      {children}
    </div>
  );
};

export interface ColumnsProps {
  columns?: ColumnItemProps[];

  [name: string]: any;
}

export default class Columns extends React.PureComponent<ColumnsProps> {
  static Item: typeof ColItem = ColItem;

  render() {
    const { columns = [], children, ...restProps } = this.props;
    return (
      <div className={styles.layout} {...restProps}>
        {React.Children.map(children, (child, index) => (
          <ColItem {...(columns[index] || {})}>
            {React.cloneElement(child as any, {
              column: columns[index],
            })}
          </ColItem>
        ))}
      </div>
    );
  }
}
