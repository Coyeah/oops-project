import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export interface IconProps {
  src: string;
  style?: CSSProperties;
  className?: string;
  size?: number | string; // 同时设置 width 与 height
}

const Icon: React.FC<IconProps> = ({
  src,
  style = {},
  className,
  size = ''
}) => {
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
