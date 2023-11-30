import { defineStore } from 'pinia';
import { ACCESS_TOKEN, IUserState, loginResult, TOKEN_TYPE, User_Info, USER_ID } from './type';
import { createStorage } from '@hydra/utils/storege';
import { getUserInfo, login, logout } from '@/api/platform/user';
import { dymicRouter } from '@/router';
import { analysts, platform, tenant, subtenant } from '@/router/modules';
const Storage = createStorage({ storage: localStorage });
import { useModal } from '@/hooks/use-modal';
import { RoleEnum } from '@/enums/roleEnum';
import { createVNode } from 'vue';
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
      is_default: 1,
      is_up_passwd: 1,
    },
    user_id: '',
    isLogin: false,
  }),
  getters: {
    userInfo(): User_Info {
      return this.user_info;
    },
    roleType(): RoleEnum {
      return this.user_info.is_default === 1 && this.user_info.role == RoleEnum.PLATFORM
        ? RoleEnum.SUPERADMIN
        : this.user_info.role;
    },
    isTenantFirstLogin(): boolean {
      return this.user_info.role == RoleEnum.TENANT && this.user_info.is_up_passwd === 1;
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
    // 713修改
    async loginNew(response: loginResult) {
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
    },

    // 713前原登录调用的函数
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
        //根据管理员类型决定路由菜单
        const { role, is_up_passwd } = userInfo;
        // const role = 2;  // 分析员
        // const role = 3  // 云租户
        if (role === RoleEnum.PLATFORM) {
          //管理员
          dymicRouter(platform);
        } else if (role === RoleEnum.ANALYSTS) {
          //分析员
          dymicRouter(analysts);
        } else if (role === RoleEnum.TENANT) {
          //云租户
          dymicRouter(tenant);
        } else {
          //云租户子租户
          dymicRouter(subtenant);
        }

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
