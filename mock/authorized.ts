import { login, logout } from '../src/common/apis/auth';

export default {
  [`POST ${login}`]: (url, config) => {
    const {
      body: { ticket, username = ticket },
    } = config;
    if (!username) {
      return {
        code: 4507100110003,
        message: '登陆失败',
        data: null,
      };
    }
    return {
      code: 0,
      message: 'success',
      data: {
        username: username,
        avatar: '/public/carbon.png',
        authority: ['101', '101001', '101002', '102', '102001', '102002'],
        ticket: username,
      },
    };
  },
  [`POST ${logout}`]: (url, config) => {
    return {
      code: 0,
      message: 'success',
      data: null,
    };
  },
};
