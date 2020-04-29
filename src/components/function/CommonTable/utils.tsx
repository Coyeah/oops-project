import React from 'react';
import { ColumnsType } from './types';
import Ellipsis from '../Ellipsis';
import { ColumnProps } from 'antd/lib/table';

export const handleTableColumns = (columns: ColumnsType): ColumnProps<any>[] => {
  return columns.map((item) => {
    if (!!item.ellipsis) {
      const length: number = item.ellipsis;
      item.render = (text: string) => (
        <Ellipsis length={length} tooltip={item.tooltip || true}>
          {text}
        </Ellipsis>
      );
      delete item.tooltip;
      delete item.ellipsis;
    }

    return item as ColumnProps<any>;
  });
};
