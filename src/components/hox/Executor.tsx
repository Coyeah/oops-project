import { ModelHook } from './types';

export function Executor<T>(props: {
  hook: ModelHook<T>,
  onUpdate: (data: T) => void
}) {
  const data = props.hook();
  props.onUpdate(data);
  return null;
}