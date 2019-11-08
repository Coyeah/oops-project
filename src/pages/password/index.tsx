import React, { useState, useCallback } from 'react';
import { Slider } from 'antd';
import { SliderValue } from 'antd/lib/slider';
import styles from './index.module.less';

const Password: React.FC = () => {
  const [state, setState] = useState({
    letter: 10,
    char: 2,
    number: 8
  });

  const onSliderChange = useCallback((type: string) => (value: SliderValue) => {
    setState(s => ({
      ...s,
      [type]: value
    }));
  }, []);

  const { letter, char, number } = state;
  return (
    <div>
      <div className={styles.title}>配置：</div>
      <div className={styles.setting}>
        <div className={styles.text}>字母：<span className={styles.point}>{letter}</span></div>
        <Slider defaultValue={30} max={20} value={letter} onChange={onSliderChange('letter')} />
        <div className={styles.text}>数字：<span className={styles.point}>{number}</span></div>
        <Slider defaultValue={30} max={15} value={number} onChange={onSliderChange('number')} />
        <div className={styles.text}>字符：<span className={styles.point}>{char}</span></div>
        <Slider defaultValue={30} max={10} value={char} onChange={onSliderChange('char')} />
      </div>
    </div>
  )
};

export default Password;