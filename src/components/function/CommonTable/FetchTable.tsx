/*
 * @Author: ye.chen
 * @Date: 2020-04-08 16:47:50
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-24 15:45:34
 */
import React, { useEffect, useRef } from 'react';
import { Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import useAPI from '../useHooks/useAPI';
import { FetchTableProps, SetPaginationType, PageState } from './types';

export const defaultEnum = {
  list: 'list',
  total: 'totalCount',
  current: 'pageNum',
  pageSize: 'pageSize',
};
export const defaultPageState = {
  pageNum: 1,
  pageSize: 10,
};
const defaultDataFormat = (ENUM: StringObject) => (res: any) => {
  let list: any[] = [],
    pagination: PaginationProps = {};
  if (res && res.code === 0) {
    const { data } = res;
    if (Array.isArray(data)) list = data;
    else if (typeof data === 'object') {
      list = data[ENUM.list];
      pagination = {
        ...pagination,
        current: data[ENUM.current],
        total: data[ENUM.total],
        pageSize: data[ENUM.pageSize],
      };
    }
  }
  return {
    list,
    pagination,
  };
};

const FetchTable: React.FC<FetchTableProps> = (props) => {
  const {
    fetch = {},
    onRef = () => {},
    payload = {},
    namespace = {},
    tableComponent: TableComponent = Table,
    ...restProps
  } = props;
  const ENUM = {
    ...defaultEnum,
    ...namespace,
  };

  const pageState = useRef(defaultPageState);

  const setPagination: SetPaginationType = (payload) => {
    pageState.current = {
      ...pageState.current,
      ...payload,
    };
  };
  const handlePageChange = (pageNum: number, pageSize: number) => {
    getData(
      {},
      {
        pageNum,
        pageSize,
      },
    );
  };

  const { data, loading, run } = useAPI({
    dataFormat: defaultDataFormat(ENUM),
    ...fetch,
    manual: true,
  });

  const getData = (data: AnyObject, pagination?: PageState) => {
    pagination = pagination || {};
    setPagination(pagination);
    let params: AnyObject = {
      ...pageState.current,
      ...payload,
      ...pagination,
      ...data,
    };
    params.pageNumber = params.pageNum;
    return run(params);
  };

  useEffect(() => {
    onRef({
      getData: getData,
      setPagination: setPagination,
    });
    getData(payload);
  }, []);

  const tableProps = {
    dataSource: data.list || [],
    loading,
    pagination: {
      ...(data.pagination || {}),
      current: pageState.current.pageNum,
      pageSize: pageState.current.pageSize,
      onChange: handlePageChange,
      onShowSizeChange: handlePageChange,
    },
    ...restProps,
  };
  return <TableComponent {...tableProps} />;
};

export default FetchTable;
