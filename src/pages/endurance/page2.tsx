import React from 'react';
import useId from './model';
import { Button } from 'antd';

const Test: React.FC = () => {
  const {
    id, reset
  } = useId();
  return (
    <>
      <div>Hello World!</div>
      <div>This is a endurance page 2.</div>
      <div>id: {id}</div>
      <div><Button onClick={reset}>reset</Button></div>
    </>
  )
};

export default Test;