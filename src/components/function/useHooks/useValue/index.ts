/*
 * @Author: ye.chen
 * @Date: 2020-04-06 14:31:49
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-06 14:48:59
 */

import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseValueProps {
  value?: any;
  onChange?: (value?: any) => void;
  defaultValue?: any;
}

export interface UserValueReturn {
  value: any;
  onChange: (value?: any) => void;
}

const useValue = (props: UseValueProps): UserValueReturn => {
  const { value: outerValue, onChange = () => {}, defaultValue } = props;
  const [innerValue, setInnerValue] = useState<any | undefined>(() =>
    typeof outerValue === 'undefined' ? defaultValue : outerValue,
  );
  const prevValueRef = useRef(outerValue);
  useEffect(() => {
    prevValueRef.current = outerValue;
  });
  if (outerValue !== prevValueRef.current && innerValue !== outerValue) {
    setInnerValue(outerValue);
  }
  const handleChange = useCallback((value?: any) => {
    setInnerValue(value);
    onChange(value);
  }, []);

  return {
    value: innerValue,
    onChange: handleChange,
  };
};

export default useValue;
