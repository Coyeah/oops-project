import { observable, action } from 'mobx';
import { ResponseSchema, api } from '@/utils/request';
import { login, logout } from 'apis/auth';
import { history, storage } from '@/utils';

export interface AuthStoreProps {
  infomation: AnyObject;
  getInfomation: () => AnyObject;
  login: Function;
  logout: Function;
  loading: boolean;
  isLogin: boolean;
}

class AuthStore {
  @observable public infomation: AnyObject = {};
  @observable public loading: boolean = false;
  @observable public isLogin: boolean = false;

  public constructor() {}

  @action.bound
  public login(values?: AnyObject, cb?: Function) {
    if (this.isLogin) {
      cb && cb();
      return;
    }
    let payload = {};
    if (!values) {
      payload = {
        ticket: storage('ticket') || '',
      };
    } else if (typeof values === 'string') {
      payload = {
        ticket: values,
      };
    } else {
      const { username, password } = values || {};
      payload = {
        username,
        password,
      };
    }
    this.loading = true;
    api(login, {
      body: payload,
    }).then((response) => this.loginSuccess(response, cb));
  }

  @action.bound
  public loginSuccess(response: ResponseSchema, cb?: Function) {
    console.log(response);
    if (response && response.code === 0) {
      this.infomation = response.data;
      this.isLogin = true;
      storage('ticket', response.data.ticket);
      cb && cb(response);
    } else {
      history.push('/authorized/login');
    }
    this.loading = false;
  }

  @action.bound
  public logout(cb?: Function) {
    this.loading = true;
    api(logout).then((response) => this.logoutSuccess(response, cb));
  }

  @action.bound
  public logoutSuccess(response: ResponseSchema, cb?: Function) {
    if (response && response.code === 0) {
      this.infomation = {};
      this.isLogin = false;
      cb && cb(response);
    }
    this.loading = false;
  }

  @action.bound
  public getInfomation() {
    return { ...this.infomation };
  }
}

export default AuthStore;
