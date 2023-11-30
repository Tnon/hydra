/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-14 14:01:55
 * @LastEditTime: 2022-04-14 14:50:25
 */
import request from "@/http";

enum Api {
  userList = "/api/user/list", // 获取租户账户列表
  addUsers = "/api/user/create", // 创建租户账户
  editUsers = "/api/user/edit",  // 编辑租户账户信息
  deleteUser = "/api/user/del", // 删除子租户账户
  resetPassword = "/api/user/password/reset" //重置租户账户密码

  // mock数据接口
  // userList = "http://yapi.in.anxinsec.com/mock/39/api/user/list", // 获取租户账户列表
  // addUsers = "http://yapi.in.anxinsec.com/mock/39/api/user/create", // 创建租户账户
  // editUsers = "http://yapi.in.anxinsec.com/mock/39/api/user/edit",  // 编辑租户账户信息
  // deleteUser = "http://yapi.in.anxinsec.com/mock/39/api/user/del", // 删除子租户账户
  // resetPassword = "http://yapi.in.anxinsec.com/mock/39/api/user/password/reset" //重置租户账户密码
}

/**
 * @description: 获取租户账户列表
 */
export function getUserList(params: tableParams<{}>) {
  return request({
    url: Api.userList,
    method: "POST",
    params,
  });
}

/**
 * @description: 创建租户账户
 */
export function getAddUsers(params: API.userState) {
  return request(
    {
      url: Api.addUsers,
      method: "POST",
      params,
    },
    {
      successMessageText: "新建成功",
    }
  );
}

/**
 * @description: 编辑租户账户信息
 */
export function getEditUsers(params: API.editUserState) {
  return request(
    {
      url: Api.editUsers,
      method: "POST",
      params,
    },
    {
      successMessageText: "修改成功",
    }
  );
}

/**
 * @description: 删除子租户账户
 */
export function getDeleteUsers(params: API.deleteUserState) {
  return request(
    {
      url: Api.deleteUser,
      method: "POST",
      params,
    },
    {
      successMessageText: "删除成功",
    }
  );
}

/**
 * @description: 重置租户账户密码
 */
export function getResetPassword(params: API.deleteUserState) {
  return request(
    {
      url: Api.resetPassword,
      method: "POST",
      params,
    },
    {
      successMessageText: "重置密码成功",
    }
  );
}