/*
 * @Author: ye.chen
 * @Date: 2020-04-08 16:17:31
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-29 17:50:49
 */
import React from 'react';
import { Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import styles from './index.less';
import {
  CommonTableProps,
  CommonTableState,
  FetchTableOnRefTaget,
  PageState,
  CommonFilterProps,
  ColumnsType,
} from './types';
import FetchTable, { defaultPageState } from './FetchTable';
import CommonFilter from './CommonFilter';
import Center from '@/components/layout/Center';
import { Type2Enum } from '@/components/function/Type2Component';
import { handleTableColumns } from './utils';

export { Type2Enum };

export default class CommonTable extends React.PureComponent<CommonTableProps, CommonTableState> {
  constructor(props: CommonTableProps) {
    super(props);
    const {
      search: { field = void 0, ...searchProps } = {},
      filter,
      initial = {},
      extraProps = {},
      onReset = false,
      ...fetchTableProps
    } = props;

    this.state = {
      payload: { ...initial },
      search: searchProps,
      searchValue: void 0,
      searchField: field,
      namespace: props.namespace,
      fetchTable: {
        ...extraProps,
        ...fetchTableProps,
      },
      commonFilter: filter,
      onReset,
    };
  }

  static getDerivedStateFromProps(props: CommonTableProps, state: CommonTableState) {
    const {
      search: { field = void 0, ...searchProps } = {},
      filter,
      initial = {},
      extraProps = {},
      ...fetchTableProps
    } = props;
    return {
      payload: {
        ...initial,
        ...state.payload,
      },
      search: searchProps,
      searchField: field,
      namespace: props.namespace,
      fetchTable: {
        ...extraProps,
        ...fetchTableProps,
      },
      commonFilter: filter,
    };
  }

  fetchTable: FetchTableOnRefTaget | null = null;

  commonFilter: CommonFilter | null = null;

  getData = (payload?: AnyObject, pageState?: PageState): void => {
    this.setState(
      {
        payload: {
          ...this.state.payload,
          ...payload,
        },
      },
      () => {
        this.fetchTable?.getData(
          {
            ...this.state.payload,
            ...(pageState || {}),
          },
          pageState,
        );
      },
    );
  };

  getForm = (): FormInstance | null | undefined => {
    return this.commonFilter?.formRef.current;
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleInputSearch = (value: string) => {
    const {
      search: { onSearch = () => {} },
      searchField,
    } = this.state;
    if (!searchField) return;
    this.getData({
      [searchField]: value,
    });
    onSearch(value);
  };

  handleReset = () => {
    const { initial, onReset } = this.props;
    this.setState(
      {
        payload: { ...initial },
        searchValue: void 0,
      },
      () => {
        this.commonFilter && (this.commonFilter?.formRef.current as FormInstance).resetFields();
        this.fetchTable?.getData(this.state.payload, defaultPageState);
        typeof onReset === 'function' && onReset();
      },
    );
  };

  renderTable = () => {
    let { fetchTable, payload } = this.state;
    // const { rowSelection: { selectedRowKeys } } = fetchTable;
    let selectedRowKeys: any[] | null = null;
    let onChange: any = () => {};
    if (fetchTable.rowSelection) {
      selectedRowKeys = fetchTable.rowSelection.selectedRowKeys || [];
      onChange = fetchTable.rowSelection.onChange;
    }
    if (fetchTable.columns) {
      fetchTable.columns = handleTableColumns(fetchTable.columns as ColumnsType);
    }
    return (
      <>
        {!!selectedRowKeys && (
          <Center className={styles.selected}>
            <div>
              <span>已选中</span>
              <span className={styles.count}>{selectedRowKeys.length}</span>
              <span>条；</span>
            </div>
            <a onClick={() => onChange([], [])}>清空</a>
          </Center>
        )}
        <FetchTable
          rowKey="id"
          onRef={(payload) => (this.fetchTable = payload)}
          payload={payload}
          {...fetchTable}
        />
      </>
    );
  };

  renderCustom = () => {
    const { children } = this.props;
    const { search, searchValue, searchField, onReset, commonFilter } = this.state;
    const submit = commonFilter && commonFilter.mode === 'submit';
    return (
      <>
        {submit && <div className={styles.submitFilter}>{this.renderFilter()}</div>}
        <Center className={styles.commonTableHeader}>
          <div className={styles.custom}>
            {!submit && this.renderFilter()}
            {children}
          </div>
          {(searchField || onReset || submit) && (
            <div className={styles.search}>
              {searchField && (
                <Input.Search
                  // enterButton
                  value={searchValue}
                  onChange={this.handleInputChange}
                  className={styles['search-input']}
                  {...search}
                  onSearch={this.handleInputSearch}
                />
              )}
              {submit && (
                <Button
                  type="primary"
                  className={styles.resetBtn}
                  onClick={() =>
                    this.commonFilter &&
                    this.commonFilter.formRef &&
                    this.commonFilter.formRef.current &&
                    this.commonFilter.formRef.current.submit()
                  }
                >
                  {(commonFilter && commonFilter.submitText) || '筛选'}
                </Button>
              )}
              {(onReset || submit || searchField) && (
                <Button className={styles.resetBtn} onClick={this.handleReset}>
                  重置
                </Button>
              )}
            </div>
          )}
        </Center>
      </>
    );
  };

  onFilterValuesChange = (changeValues: AnyObject, allValues: AnyObject) => {
    const { commonFilter: { valuesFilter } = {} } = this.state;
    const values = valuesFilter ? valuesFilter(allValues) : allValues;
    this.getData(values, {
      pageNum: 1,
    });
  };

  renderFilter = () => {
    const { commonFilter } = this.state;
    if (!commonFilter) return null;
    const { valuesFilter, mode, ...restProps } = commonFilter;
    let rest: CommonFilterProps = {
      ...restProps,
    };
    if (mode === 'submit') {
      rest.onFinish = (values: AnyObject) => this.onFilterValuesChange({}, values);
    } else {
      rest.onValuesChange = this.onFilterValuesChange;
    }

    return <CommonFilter ref={(el) => (this.commonFilter = el)} {...rest} mode={mode} />;
  };

  render() {
    return (
      <div className={styles.commonTableLayout}>
        {/* {this.renderFilter()} */}
        {this.renderCustom()}
        {this.renderTable()}
      </div>
    );
  }
}
