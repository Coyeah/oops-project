/*
 * @Author: ye.chen
 * @Date: 2020-04-10 18:08:07
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-24 15:44:44
 */
import React from 'react';
import styles from './index.less';
import { Row, Col, Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import Type2FormItem, { Type2FormItemProps } from '../Type2Component/formitem';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export type CommonFormItemType = {
  col?: 1 | 2 | 3;
} & Type2FormItemProps;

export type CommonFormCardType = {
  columns?: CommonFormItemType[];
} & CardProps;

export interface CommomFormProps {
  dataSource?: CommonFormCardType[];
}

const CommomForm: React.FC<CommomFormProps> = (props) => {
  const { dataSource = [] } = props;

  return (
    <>
      {dataSource.map((item: CommonFormCardType, index: number) => {
        const { columns = [], ...restProps } = item;
        return (
          <Card key={`${index}-${columns.length}`} {...restProps} className={styles.card}>
            <Row>
              {columns.map((colItem) => {
                const { col = 1, ...restProps } = colItem;
                return (
                  <Col
                    key={`${restProps.type}-${restProps.name}`}
                    span={col * 8}
                    className={styles.col}
                  >
                    <Type2FormItem
                      key={`${restProps.type}-${restProps.name}`}
                      {...restProps}
                      {...formItemLayout}
                    />
                  </Col>
                );
              })}
            </Row>
          </Card>
        );
      })}
    </>
  );
};

export default CommomForm;
