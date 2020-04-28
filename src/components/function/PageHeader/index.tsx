/*
 * @Author: ye.chen
 * @Date: 2020-04-08 11:24:39
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-24 15:47:43
 */
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb, { BreadcrumbProps } from './breadcrumb';
import Center from '@/components/layout/Center';
import styles from './index.less';

export type PageHeaderProps = {
  hiddenBreadcrumb?: boolean;
  content?: ReactNode;
  extraContent?: ReactNode;
} & BreadcrumbProps;

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  let { linkElement = Link, hiddenBreadcrumb = false, content, extraContent } = props;

  if (typeof content === 'string') {
    content = [content];
  }

  return (
    <div className={styles.layout}>
      {!hiddenBreadcrumb && <Breadcrumb linkElement={linkElement} />}
      <div className={styles.detail}>
        <Center className={styles.row}>
          {content && <div className={styles.content}>{content}</div>}
          {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
        </Center>
      </div>
    </div>
  );
};

export default PageHeader;
