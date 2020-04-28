/*
 * @Author: ye.chen
 * @Date: 2020-04-06 14:28:11
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-24 15:46:26
 */
import React, { ForwardRefExoticComponent, PropsWithRef, RefAttributes, forwardRef } from 'react';
import Select, { SelectProps } from 'antd/lib/select';
import useAPI, { UseAPIProps } from '../useHooks/useAPI';
import useValue, { UseValueProps } from '../useHooks/useValue';

const { Option } = Select;

export interface DynamicSelectItem {
  value: string | number;
  name: string;
}

export type DynamicSelectProps = {
  api?: UseAPIProps;
  dataFilter?: (res: any) => DynamicSelectItem[];
  dataSource?: DynamicSelectItem[];
} & UseValueProps &
  SelectProps<any>;

const DynamicSelect: ForwardRefExoticComponent<
  PropsWithRef<DynamicSelectProps> & RefAttributes<any>
> = forwardRef((props, ref) => {
  const { api = {}, dataFilter, dataSource = [], ...restProps } = props;
  const { value, onChange } = useValue(restProps);
  const { data, loading } = useAPI(api);

  const rest = {
    ...restProps,
    value,
    onChange,
  };

  let options = (dataFilter && dataFilter(data)) || [];
  options = [...dataSource, ...options];
  return (
    <Select ref={ref} loading={loading} {...(rest as any)}>
      {options.map((item, index) => {
        return (
          <Option key={`${index}-${item.value}`} value={item.value}>
            {item.name}
          </Option>
        );
      })}
    </Select>
  );
});

export default DynamicSelect;
