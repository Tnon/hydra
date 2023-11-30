/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-07 14:59:56
 * @LastEditTime: 2022-02-07 14:59:57
 */
import request from "@/http";

enum Api {
  getProductLogo = "/api/config/basic/get",
  setProductLogo = "/api/config/basic/set",
}

/**
 * @description: 获取产品名称和logo
 */
export function getProductLogo(params = {}) {
  return request({
    url: Api.getProductLogo,
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
      url: Api.setProductLogo,
      method: "POST",
      params,
    },
    {
      successMessageText: "保存成功",
    }
  );
}
