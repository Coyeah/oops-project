/*
 * @Author: ye.chen
 * @Date: 2020-04-29 14:30:53
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-29 14:42:18
 */
import React, { ReactElement } from 'react';
import { GetTooltipProps } from './types';
import { Tooltip } from 'antd';

const GetTooltip: React.FC<GetTooltipProps> = (props) => {
  const { tooltip, overlayStyle, title, children } = props;

  if (tooltip) {
    const restProps =
      tooltip === true ? { overlayStyle, title } : { ...tooltip, overlayStyle, title };
    return <Tooltip {...restProps}>{children as ReactElement}</Tooltip>;
  }

  return <>{children}</>;
};

export default GetTooltip;
