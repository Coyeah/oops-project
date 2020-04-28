/*
 * @Author: ye.chen
 * @Date: 2020-04-17 16:40:06
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-17 17:44:30
 */
import React, { ComponentType, PureComponent } from 'react';
import { isFunction, isString, merge } from 'lodash';
import { api } from '@/utils/request';

export type AutodataParams = {
  namespace?: string;
  request?: Function;
  url?: string;
  method?: string;
  payload?: AnyObject;
  data?: AnyObject;
  payloadFromProps?: (props: AnyObject) => object;
  dataFilter?: (res?: AnyObject) => object;
} & AnyObject;

export type AutodataProps = AutodataParams | string | Function;

interface AutoDataState {
  data?: AnyObject;
  loading?: boolean;
}

function autodata<T = any>(params: AutodataProps) {
  if (isString(params)) params = { url: params as string };
  if (isFunction(params)) params = { request: params as Function };
  const options: AutodataParams = merge(
    {
      namespace: '$data',
    },
    params,
  );

  return (Wrapped: ComponentType<T & AnyObject>) =>
    class extends PureComponent<T, AutoDataState> {
      state = {
        data: void 0,
        loading: void 0,
      };

      public componentDidMount() {
        this.run();
      }

      public run = async (params?: AnyObject) => {
        const {
          request: ownRequest,
          url = '',
          method = 'POST',
          data: initData = {},
          payload: initPayload = {},
          payloadFromProps,
          dataFilter,
          ...restProps
        } = options;
        this.setState({ loading: true });
        let res = void 0;
        const payload = {
          ...initPayload,
          ...initData,
          ...((isFunction(payloadFromProps) && payloadFromProps(this.props)) || {}),
          ...(params || {}),
        };
        try {
          if (ownRequest) {
            res = await ownRequest(payload);
          } else {
            res = await api({
              url,
              method: method as any,
              data: payload,
              ...restProps,
            });
          }
          this.setState({
            data: isFunction(dataFilter) ? dataFilter(res) : res,
            loading: false,
          });
        } catch (ex) {
          this.setState({
            loading: false,
          });
        }
      };

      render() {
        const { namespace = '$data' } = options;
        const props = {
          ...this.props,
          [namespace]: {
            ...this.state,
            run: this.run,
          },
        };

        return <Wrapped {...props} />;
      }
    };
}

export default autodata;
