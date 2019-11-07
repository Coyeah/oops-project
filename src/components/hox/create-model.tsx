import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModelHook, UseModel } from './types';
import { Container } from './Container';
import { Executor } from './Executor';

export function createModel<T>(hook: ModelHook<T>) {
  const element = document.createElement('div');
  const container = new Container(hook);
  ReactDOM.render(
    <Executor
      hook={hook}
      onUpdate={val => {
        container.data = val;
        container.notify();
      }}
    />,
    element
  );
  const useModel: UseModel<T> = depsFn => {
    const [state, set] = useState<T | undefined>(() => 
      container ? (container.data as T) : undefined
    );
    const depsFnRef = useRef(depsFn);
    depsFnRef.current = depsFn;
    const depsRef = useRef<unknown[]>([]);
    useEffect(() => {
      if (!container) return;
      function subscriber(val: T) {
        if (!depsFnRef.current) {
          set(val);
        } else {
          const oldDeps = depsRef.current;
          const newDeps = depsFnRef.current(val);
          if (compare(oldDeps, newDeps)) {
            set(val);
          }
          depsRef.current = newDeps;
        }
      }
      container.subscribers.add(subscriber);
      return () => {
        container.subscribers.delete(subscriber);
      }
    }, [container]);
    return state!;
  }
  Object.defineProperty(useModel, 'data', {
    get: function () {
      return container.data;
    }
  });
  return useModel;
}

function compare (oldDeps: unknown[], newDeps: unknown[]) {
  if (oldDeps.length !== newDeps.length) {
    return true;
  }
  for (const index in newDeps) {
    if (oldDeps[index] !== newDeps[index]) {
      return true;
    }
  }
  return false;
}