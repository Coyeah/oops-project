import React, { useState, Suspense } from 'react';
import { Spin, Button } from 'antd';
import { createFetcher, Placeholder, fetchSomethingApi } from './utils';

const getData = createFetcher(fetchSomethingApi);

const Data = () => {
  return <h1>{getData()}!</h1>
}

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>加载</Button>
      <Button onClick={() => setShow(false)}>回退</Button>
      <Button onClick={() => location.reload()}>清除缓存</Button>
      <div>
        {show && (
          <Placeholder fallback={<Spin />}>
            <Data />
          </Placeholder>
        )}
      </div>
    </>
  )
};

export default App;