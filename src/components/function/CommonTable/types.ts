import { UseAPIProps } from '../useHooks/useAPI';
import { TableProps } from 'antd/lib/table';
import { FormProps } from 'antd/lib/form';
import { InputProps, SearchProps } from 'antd/lib/input';
import { Type2FormItemProps } from '../Type2Component/formitem';

export type FetchTableProps = {
  fetch?: UseAPIProps;
  onRef?: (ref: FetchTableOnRefTaget) => void;
  payload?: AnyObject; // 参数
  namespace?: StringObject;
  tableComponent?: React.ElementType;
} & TableProps<any>;

export type CommonTableProps<T = AnyObject> = {
  search?: CommonTableSearch;
  filter?: CommonTableFilterType;
  initial?: AnyObject;
  extraProps?: T;
  onReset?: (() => void) | boolean;
} & FetchTableProps;

export interface CommonTableState {
  payload: AnyObject;
  search: InputProps & SearchProps;
  searchValue?: string;
  searchField?: string;
  fetchTable: FetchTableProps;
  namespace?: StringObject;
  commonFilter?: CommonTableFilterType;
  onReset: (() => void) | boolean;
}

export type CommonTableSearch = {
  field: string;
} & InputProps &
  SearchProps;

export type CommonTableFilterType = CommonFilterProps & {
  valuesFilter?: (values: AnyObject) => AnyObject;
  submitText?: string;
};

export type CommonFilterProps = {
  columns?: FilterColumnType[];
  mode?: 'default' | 'submit';
} & FormProps;

export type FilterColumnType = Type2FormItemProps;

export interface FetchTableOnRefTaget {
  getData: (payload: AnyObject, pagination?: PageState) => void;
  setPagination: SetPaginationType;
}

export interface PageState {
  pageNum?: number;
  pageSize?: number;
}

export type SetPaginationType = (payload: PageState) => void;
