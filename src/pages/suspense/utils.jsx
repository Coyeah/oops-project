import React from 'react';

export const fetchSomethingApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('加载完毕，这是你要的一段数据');
    }, 3000);
  });
}

const cached = {};
export const createFetcher = (promiseTask) => {
  let ref = cached;
  return () => {
    const task = promiseTask();
    task.then(res => {
      ref = res;
    });
    if (ref === cached) {
      throw task;
    }
    return ref;
  }
}

export class Base extends React.Component {

  state = { error: false };

  componentDidMount() {
    this._mounted = true;
  }
  componentDidCatch(error) {
    if (this._mounted) {
      if (typeof error.then === 'function') {
        this.setState({ error: true });
        error.then(() => {
          if (this._mounted) {
            this.setState({ error: false });
          }
        })
      }
    }
  }
  componentWillUnmount() {
    console.log('unm');
    this._mounted = false;
  }
}

export class Placeholder extends Base {
  render () {
    const { children } = this.props;
    const { error } = this.state;
    return error ? '加载数据中，请稍后...' : children;
  }
}
