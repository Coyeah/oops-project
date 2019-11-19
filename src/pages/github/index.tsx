import React, { Suspense } from 'react';
import { useAPI } from '@/components/useHooks';
import { Button } from 'antd';

const Demo = () => {
  const { run, data } = useAPI({
    url: 'https://api.github.com/users/Coyeah',
    method: 'GET',
    manual: true,
  });

  return (
    <div>
      <Button onClick={() => run()}>Fetch</Button>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

const Github = () => {
  return (
    <Suspense fallback={<div>This is a loading in single page.</div>}>
      <h1>Hello World!</h1>
      <Demo />
    </Suspense>
  )
};

export default Github;