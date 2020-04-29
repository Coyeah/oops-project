import { UseAPIProps } from '../useHooks/useAPI';
import { TableProps, ColumnProps } from 'antd/lib/table';
import { FormProps } from 'antd/lib/form';
import { InputProps, SearchProps } from 'antd/lib/input';
import { Type2FormItemProps } from '../Type2Component/formitem';
import { TooltipProps } from 'antd/lib/tooltip';

export interface ColumnType extends Omit<ColumnProps<any>, 'ellipsis'> {
  ellipsis?: number;
  tooltip?: TooltipProps;
}

export type ColumnsType = ColumnType[];

export interface FetchTableProps extends Omit<TableProps<any>, 'columns'> {
  fetch?: UseAPIProps;
  onRef?: (ref: FetchTableOnRefTaget) => void;
  payload?: AnyObject; // 参数
  namespace?: StringObject;
  tableComponent?: React.ElementType;

  columns?: ColumnsType | ColumnProps<any>[];
}

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
