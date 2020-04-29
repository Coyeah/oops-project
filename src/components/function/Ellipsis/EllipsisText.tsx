/*
 * @Author: ye.chen
 * @Date: 2020-04-29 14:15:11
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-29 18:17:46
 */
import React from 'react';
import { EllipsisTextProps } from './types';
import { getStrFullLength, cutStrByFullLength, tooltipOverlayStyle } from './utils';
import GetTooltip from './GetTooltip';

const EllipsisText: React.FC<EllipsisTextProps> = (props) => {
  const { lines, length, tooltip, fullWidthRecognition, text = '', ...restProps } = props;

  const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
  if (textLength <= length || length < 0) return <span {...restProps}>{text}</span>;

  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  const spanAttrs = tooltip ? {} : restProps;
  return (
    <GetTooltip tooltip={tooltip} overlayStyle={tooltipOverlayStyle} title={text}>
      <span {...spanAttrs}>
        {displayText}
        {tail}
      </span>
    </GetTooltip>
  );
};

export default EllipsisText;
