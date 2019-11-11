import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { SliderValue } from 'antd/lib/slider';
import Setting, { Values } from './Setting';
import styles from './index.module.less';
import { pswMaker } from './utils';

const Password: React.FC = () => {
  const [res, setRes] = useState<string>('');
  const [state, setState] = useState<Values>({
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

  const pswGenerate = useCallback((value: Values) => {
    setRes(pswMaker(value));
  }, []);

  const btnRender = useCallback(() => {
    return (
      <Button
        type="primary"
        size="small"
        onClick={() => pswGenerate(state)}
      >生成</Button>
    )
  }, [state]);

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <Setting values={state} onSliderChange={onSliderChange} />
        {btnRender()}
      </div>
      <div className={styles.right}>
        <div className={styles.result}>{res}</div>
      </div>
    </div>
  )
};

export default Password;