import React, { useCallback } from 'react';
import { Slider } from 'antd';
import { SliderValue } from 'antd/lib/slider';
import styles from './index.module.less';

interface IProps {
  values: Values;
  onSliderChange: (type: string) => (value: SliderValue) => void;
}

export interface Values {
  letter: number;
  char: number;
  number: number;
}

const Setting: React.FC<IProps> = (props) => {
  const { values, onSliderChange } = props;
  const sliderRender = useCallback((type: string) => {
    let show = 0;
    let max = 0;
    let text = '';
    switch (type) {
      case 'letter':
        text = '字母';
        max = 20;
        show = values.letter;
        break;
      case 'number':
        text = '数字';
        max = 15;
        show = values.number;
        break;
      case 'char':
        text = '字符';
        max = 10;
        show = values.char;
        break;
      default: 
        throw Error();
    }
    return (
      <>
        <div className={styles.text}>{text}：<span className={styles.point}>{show}</span></div>
        <Slider max={max} value={show} onChange={onSliderChange(type)} />
      </>
    )
  }, [values, onSliderChange]);

  return (
    <>
      <div className={styles.title}>设置：</div>
      {sliderRender('letter')}
      {sliderRender('number')}
      {sliderRender('char')}
    </>
  )
};

export default Setting;