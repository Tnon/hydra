/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-07 14:59:56
 * @LastEditTime: 2022-02-07 14:59:57
 */
import request from "@/http";

enum Api {
  getProductLogoApi = "/api/config/basic/get",
  setProductLogoApi = "/api/config/basic/set",
  updatePasswordApi = "/api/config/update_pwd",
}

/**
 * @description: 获取产品名称和logo
 */
export function getProductLogo(params = {}) {
  return request({
    url: Api.getProductLogoApi,
    method: "POST",
    params,
  });
}

/**
 * @description: 保存产品名称和logo
 */
export function setProductLogo(params: API.systemCfg) {
  return request(
    {
      url: Api.setProductLogoApi,
      method: "POST",
      params,
    },
    {
      successMessageText: "保存成功",
    }
  );
}

/**
 * @description: 更新密码
 */
export function updatePassword(params: API.resetPwdState) {
  return request(
    {
      url: Api.updatePasswordApi,
      method: "POST",
      params,
    },
    {
      successMessageText: "保存成功",
    }
  );
}
