import { CSSProperties, ReactNode } from 'react';
import { TooltipProps } from 'antd/lib/tooltip';

export type TooltipType = true | TooltipProps;

export interface EllipsisState {
  text: string;
  targetCount: number;
}

export interface EllipsisProps {
  lines?: any; // 在按照行数截取下最大的行数，超过则截取省略
  length?: number; // 在按照长度截取下的文本最大字符数，超过则截取省略
  tooltip?: TooltipType; // 移动到文本展示完整内容的提示
  fullWidthRecognition?: boolean; // 是否将全角字符的长度视为2来计算字符串长度

  className?: string;
  style?: CSSProperties;
}

export interface EllipsisTextProps extends Omit<EllipsisProps, 'length'> {
  length: number;
  text?: string;
}

export interface GetTooltipProps {
  tooltip?: TooltipType;
  title?: string | ReactNode | (() => ReactNode);
  overlayStyle?: AnyObject;
}
