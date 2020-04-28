/*
 * @Author: ye.chen
 * @Date: 2020-04-10 09:22:34
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-24 11:06:44
 */
import React, { ForwardRefExoticComponent, PropsWithRef, RefAttributes, forwardRef } from 'react';
import { Input, Select, Checkbox } from 'antd';
import DynamicSelect from '../DynamicSelect';
import PicturesWall from '../PicturesWall';

const { Option } = Select;
const { Group } = Checkbox;

export interface ListItem {
  name: string | number;
  value: string | number;
}

export type Type2ComponentType = string | string[];

export type Type2ComponentProps = {
  type?: Type2ComponentType;
  list?: ListItem[];
} & AnyObject;

export const Type2Enum = {
  // ====== input ====== //

  select: 'select',
  textarea: 'textarea',
  checkbox: 'checkbox',
  picture: 'picture',
  input: 'input',

  // ====== mode ====== //

  multiple: 'multiple',
  dynamic: 'dynamic',
};

const Type2Component: ForwardRefExoticComponent<
  PropsWithRef<AnyObject> & RefAttributes<any>
> = forwardRef((props, ref) => {
  let { type, list = [], ...restProps } = props;
  const rest: AnyObject = { ref, ...restProps };

  type = Array.isArray(type) ? type : [type];
  let localType: string = type.join('-');

  switch (localType) {
    case Type2Enum.select:
    case Type2Enum.select + '-' + Type2Enum.multiple:
      if (type.length > 1) {
        rest.mode = type[1];
      }
      return (
        <Select {...rest}>
          {list.map((item: ListItem) => (
            <Option value={item.value} key={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
      );
    case Type2Enum.select + '-' + Type2Enum.dynamic:
      return <DynamicSelect {...rest} />;
    case Type2Enum.textarea:
      return <Input.TextArea {...rest} />;
    case Type2Enum.checkbox:
      delete rest.loading;
      return (
        <Group
          {...rest}
          options={list.map((item: ListItem) => ({
            label: item.name,
            ...item,
          }))}
        />
      );
    case Type2Enum.picture:
      return <PicturesWall {...rest} />;
    case Type2Enum.input:
    default:
      return <Input {...rest} />;
  }
});

export default Type2Component;
