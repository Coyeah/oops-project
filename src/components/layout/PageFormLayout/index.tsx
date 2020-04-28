/*
 * @Author: ye.chen
 * @Date: 2020-04-10 17:25:21
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-16 18:03:41
 */
import React, { useContext } from 'react';
import styles from './index.less';
import { Form, Button } from 'antd';
import { FormInstance, FormProps } from 'antd/lib/form';
import Center from '../Center';
import { basicContext } from '@/layouts/BasicLayout';
import history from '@/utils/history';
import { useSetPageHeaderLayout } from '@/layouts/PageHeaderLayout';

export type PageFormLayoutProps = {
  form: FormInstance;
  footer?: React.ReactNode;
  onOk?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
} & FormProps;

const PageFormLayout: React.FC<PageFormLayoutProps> = (props) => {
  useSetPageHeaderLayout({ withCard: false });
  const { collapsed } = useContext(basicContext);
  let { onOk, onCancel, form, footer, ...restProps } = props;

  const width = `calc(100% - ${collapsed ? 80 : 240}px)`;

  if (!onOk) onOk = () => form.submit();
  if (!onCancel) onCancel = () => history.goBack();

  return (
    <>
      <Form form={form} {...restProps} className={styles.layout}>
        {props.children}
      </Form>
      <Center className={styles.footer} style={{ width }} justifyContent="flex-end">
        {footer}
        <Button onClick={onCancel}>取消</Button>
        <Button type="primary" onClick={onOk}>
          确认
        </Button>
      </Center>
    </>
  );
};

export default PageFormLayout;
