/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:32
 * @LastEditTime: 2022-06-16 11:10:07
 */
import request from '@/http';

enum Api {
  login = '/api/login',
  logout = '/api/logout',
  addUsers = '/api/user/create',
  editUsers = '/api/user/edit',
  userInfo = '/api/user/info',
  userList = '/api/user/list',
  resetPassword = '/api/user/password/reset',
  deleteUser = '/api/user/del',

  resetTenantPwd = '/api/tenant/password/reset', // 重置密码，只有admin有此功能
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo(params: API.userId) {
  return request({
    url: Api.userInfo,
    method: 'POST',
    params,
  });
}

/**
 * @description: 用户登录
 */
export function login(params: API.LoginParams) {
  return request(
    {
      url: Api.login,
      method: 'POST',
      params,
    },
    // {
    //   successMessageText: '登录成功',
    // },
  );
}

/**
 * @description: 用户登出
 */
export function logout() {
  return request({
    url: Api.logout,
    method: 'POST',
  });
}
/**
 * @description: 创建用户
 */
export function addUsers(params: API.userState) {
  return request(
    {
      url: Api.addUsers,
      method: 'POST',
      params,
    },
    {
      successMessageText: '用户新建成功',
    },
  );
}

/**
 * @description: 获取用户列表
 */
export function getUserList(params: tableParams<{}>) {
  return request({
    url: Api.userList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 编辑用户
 */
export function editUsers(params: API.editUserState) {
  return request(
    {
      url: Api.editUsers,
      method: 'POST',
      params,
    },
    {
      successMessageText: '修改成功',
    },
  );
}

/**
 * @description: 重置密码
 */
export function resetPWD(params: API.resetPwdState) {
  return request(
    {
      url: Api.resetPassword,
      method: 'POST',
      params,
    },
    {
      successMessageText: '密码重置成功',
    },
  );
}

/**
 * @description: 删除用户
 */
export function deleteUsers(params: API.deleteUserState) {
  return request(
    {
      url: Api.deleteUser,
      method: 'POST',
      params,
    },
    {
      successMessageText: '删除成功',
    },
  );
}

/**
 * @description: 重置租户密码，只有admin有此功能
 */
export function requestResetPwd(params: Omit<API.resetPwdState, old_password>) {
// export function requestResetPwd(params) {
  return request(
    {
      url: Api.resetTenantPwd,
      method: 'POST',
      params,
    },
    {
      successMessageText: '密码重置成功',
    },
  );
}
