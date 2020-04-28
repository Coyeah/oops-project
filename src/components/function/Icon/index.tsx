import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.less';

export interface IIconProps {
  src: string;
  style?: CSSProperties;
  className?: string;
  size?: number | string; // 同时设置 width 与 height
}

const Icon: React.FC<IIconProps> = ({ src, style = {}, size = '', className }) => {
  const initStyle = {
    backgroundImage: `url(${src})`,
    width: size,
    height: size,
    ...style,
  };
  const cx = classNames(styles.icon, className);
  return <div className={cx} style={initStyle} />;
};

export default Icon;
