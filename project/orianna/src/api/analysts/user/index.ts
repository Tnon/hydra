/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 10:50:53
 * @LastEditTime: 2022-04-20 15:04:04
 */
import request from "@/http";
enum Api {
  addUsers = "/api/user/create",
  userList = "/api/user/list",
  editUsers = "/api/user/edit",
  resetPassword = "/api/user/password/reset",
}
/**
 * @description: 创建用户
 */
export function addAnaUsers(params: API.userState) {
  return request(
    {
      url: Api.addUsers,
      method: "POST",
      params,
    },
    {
      successMessageText: "用户新建成功",
    }
  );
}

/**
 * @description: 获取用户列表
 */
export function getAnaUserList(params: tableParams<{}>) {
  return request({
    url: Api.userList,
    method: "POST",
    params,
  });
}

/**
 * @description: 编辑用户
 */
export function editAnaUsers(params: API.editUserState) {
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
 * @description: 重置密码
 */
export function resetAnaPWD(params: API.resetPwdState) {
  return request(
    {
      url: Api.resetPassword,
      method: "POST",
      params,
    },
    {
      successMessageText: "密码重置成功",
    }
  );
}
