import React, { useEffect } from 'react';
import { useAPI } from '@/components/useHooks';

const Github = () => {

  const { run, data } = useAPI({
    url: 'https://api.github.com/users/Coyeah',
    method: 'GET',
  }); 
  console.log('data: ', data);

  return (
    <div>
      Hello World!
    </div>
  )
};

export default Github;