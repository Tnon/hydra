/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-07 14:59:56
 * @LastEditTime: 2022-02-07 14:59:57
 */
import request from "@/http";

enum Api {
  currencApi = "/api/config/info",
  aclIps = "/api/config/ipfilter",
  setLoginAuth = "/api/config/setpwdnum",
  getLoginAuth = "/api/config/getpwdnum",
  setCloudInfo = "/api/config/setcloud",
  setGatewayInfo = "/api/config/setemailgateway",

  resetKeys = "/api/user/make_secret_key", // 重置密钥
}

/**
 * @description: 获取配置信息
 */
export function getCurrencData(params = {}) {
  return request({
    url: Api.currencApi,
    method: "POST",
    params,
  });
}

/**
 * @description 保存可访问ip地址
 */
export function updateIpControlApi(params: {
  enabled: boolean;
  items: { ip_begin: string; ip_end: string }[];
}) {
  return request(
    {
      url: Api.aclIps,
      method: "POST",
      params,
    },
    {
      successMessageText: "应用成功",
    }
  );
}
/**
 * @description: 获取ip接口
 */
export function getIpControlApi() {
  return request({
    url: Api.aclIps,
    method: "GET",
  });
}

/**
 * @description 获取登录鉴别次数
 */
export function getLoginAuthApi() {
  return request({
    url: Api.getLoginAuth,
    method: "POST",
  });
}

/**
 * @description 更新登录鉴别次数
 */
export function updateLoginAuthApi(params: { maxtry: number }) {
  return request(
    {
      url: Api.setLoginAuth,
      method: "POST",
      params,
    },
    {
      successMessageText: "保存成功",
    }
  );
}
/**
 * @description 设置云链接
 */
export function setCloudInfo(params: { addr: string }) {
  return request(
    {
      url: Api.setCloudInfo,
      method: "POST",
      params,
    },
    {
      successMessageText: "设置成功",
    }
  );
}

/**
 * @description 更新登录鉴别次数
 */
export function setGatewayInfo(params?: { addr: string }) {
  return request(
    {
      url: Api.setGatewayInfo,
      method: "POST",
      params,
    },
    {
      successMessageText: "设置成功",
    }
  );
}

/**
 * @description 重置密钥
 */
 export function requestResetKeys(params?: { addr: string }) {
  return request(
    {
      url: Api.resetKeys,
      method: "POST",
      params,
    },
    {
      successMessageText: "设置成功",
    }
  );
}
