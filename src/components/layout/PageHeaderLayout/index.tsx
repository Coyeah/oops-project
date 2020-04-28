/*
 * @Author: ye.chen
 * @Date: 2020-04-08 10:11:50
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-16 18:53:52
 */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Spin, Card } from 'antd';
import { isObject, isBoolean } from 'lodash';
import classNames from 'classnames';
import PageHeader from '@/components/function/PageHeader';
import { PageHeaderProps } from '@/components/function/PageHeader';
import Context from './context';
import styles from './index.less';
import Center from '../Center';

export const pageHeaderContext = Context;

export type PageHeaderLayoutProps = {
  loading?: boolean;
  withCard?: boolean;
  isBlank?: boolean;
  className?: string;
} & PageHeaderProps;

const PageHeaderLayout: React.FC<PageHeaderLayoutProps> = (props) => {
  const { loading, withCard = true, isBlank = false, className, children, ...restProps } = props;
  if (isBlank) return <Spin spinning={!!loading}>{children}</Spin>;
  return (
    <Center className={styles.layout}>
      <PageHeader {...restProps} />
      {children ? (
        <div className={classNames(className, styles.children)}>
          {withCard ? (
            <Card>
              <Spin spinning={!!loading}>{children}</Spin>
            </Card>
          ) : (
            <Spin spinning={!!loading}>{children}</Spin>
          )}
        </div>
      ) : null}
    </Center>
  );
};

export const PageHeaderLayoutWithContext: React.FC = (props) => {
  // const { history } = props as RouterTypes;
  const [state, set] = useState<PageHeaderLayoutProps>({});
  const setPageHeaderProps = useCallback((data: AnyObject | boolean = {}) => {
    if (isObject(data)) {
      set((s) => ({
        ...s,
        ...data,
      }));
    }
    if (isBoolean(data)) set({});
  }, []);

  return (
    <Context.Provider value={{ setPageHeaderProps }}>
      <PageHeaderLayout {...state}>{props.children}</PageHeaderLayout>
    </Context.Provider>
  );
};

export const useSetPageHeaderLayout = (payload: PageHeaderLayoutProps) => {
  const { setPageHeaderProps } = useContext(Context);
  useEffect(() => {
    setPageHeaderProps && setPageHeaderProps(payload);
    return () => setPageHeaderProps && setPageHeaderProps(false);
  }, []);
};

export default PageHeaderLayout;
