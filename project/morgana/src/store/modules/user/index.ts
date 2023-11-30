import { defineStore } from 'pinia';
import { ACCESS_TOKEN, IUserState, loginResult, TOKEN_TYPE, User_Info, USER_ID } from './type';
import { getUserInfo, login, logout } from '@/api/user';
import { createStorage } from '@hydra/utils/storege';
const Storage = createStorage({ storage: localStorage });
export const userToken = defineStore({
  id: 'user-token',
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    tokenType: Storage.get(TOKEN_TYPE, ''),
    user_info: {
      id: '',
      account: '',
      role: 1,
      dept: '',
      email: '',
      auto_auth: '',
      expert_auth: '',
      create_time: '',
    },
    user_id: '',
    isLogin: false,
  }),
  getters: {
    userInfo(): User_Info {
      return this.user_info;
    },
  },

  actions: {
    SetToken(token: string) {
      this.token = token;
    },
    SetTokenType(type: string) {
      this.tokenType = type;
    },
    SetUserInfo(user_info: User_Info) {
      this.user_info = user_info;
    },
    IsLogin(isLogin: boolean) {
      this.isLogin = isLogin;
    },
    SetUserId(user_id: string) {
      this.user_id = user_id;
    },
    // 登录
    async login(userInfo: API.LoginParams) {
      try {
        const response: loginResult = await login(userInfo);
        if (response) {
          const { token, token_type } = response.token,
            { id } = response.user;
          Storage.set(ACCESS_TOKEN, token);
          Storage.set(TOKEN_TYPE, token_type);
          Storage.set(USER_ID, id);
          //vuex存储token(持久)
          this.SetToken(token);
          //vuex存储token_type(持久)
          this.SetTokenType(token_type);
          //vuex存储user_id(持久)
          this.SetUserId(id);
          //vuex存储临时变量,标记是否登录
          this.IsLogin(true);
          //获取用户信息
          await this.getUserInfo(id);
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    // 获取用户信息
    async getUserInfo(id: string) {
      const userInfo: User_Info = await getUserInfo({ id });
      if (userInfo) {
        this.SetUserInfo(userInfo);
        this.IsLogin(true);
        return Promise.resolve(userInfo);
      }
      return Promise.resolve('');
    },
    // 登出
    async logout(route) {
      await logout();
      this.SetToken('');
      this.SetTokenType('');
      this.SetUserInfo({});
      this.IsLogin(false);
      Storage.remove(ACCESS_TOKEN);
      Storage.remove(TOKEN_TYPE);
      route.replace({
        name: 'login',
      });
      window.location.reload();
      return Promise.resolve('');
    },
  },
});
