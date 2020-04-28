/* eslint-disable */
import React, { useCallback } from 'react';
import { Button } from 'antd';
import history from '@/utils/history';
import config from './typeConfig';
import styles from './index.module.less';

export interface IProps {
  backText?: string;
  redirect?: string;
  type: number | string;
}

const Exception: React.FC<IProps> = ({ backText = '返回首页', redirect = '/', type }) => {
  const pageType = type in config ? type : '404';
  const onBackClick = useCallback(() => {
    history.push(redirect);
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.text}>
        <div>{config[pageType].desc}</div>
        <Button type="primary" onClick={onBackClick}>
          {backText}
        </Button>
      </div>
    </div>
  );
};

export default Exception;
