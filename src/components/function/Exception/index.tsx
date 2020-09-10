import React from 'react';
import { Button } from 'antd';
import history from '@/utils/history';
import { typeConfig } from './typeConfig';
import styles from './index.less';

export interface IProps {
  backText?: string;
  redirect?: string;
  type: number | string;
}

const Exception: React.FC<IProps> = ({
                                       backText = '返回首页',
                                       redirect = '/',
                                       type
                                     }) => {
  const pageType = type in typeConfig ? type : '404';
  const onBackClick = () => history.push(redirect);

  return (
    <div className={styles.layout}>
      <div className={styles.text}>
        <div>{typeConfig[pageType].desc}</div>
        <Button onClick={onBackClick} type="primary">
          {backText}
        </Button>
      </div>
    </div>
  );
};

export default Exception;
