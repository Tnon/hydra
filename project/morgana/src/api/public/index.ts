/**
 * @description 本文件用于盛放公用组件的公用接口630
 */

import request from "@/http";

enum Api {
  ownThreat = "/api/index/get_threat_num", // 自有情报接口
  staticThreat = "/api/threat/stat", // 静态类情报和第三方情报
  dynimicThreat = "/api/threat/dynamic/stat", // 动态类情报
}

/**
 * @description: 获取自有情报
 */
 export function requestOwnThreat(params?) {
  return request({
    url: Api.ownThreat,
    method: "POST",
    params,
  });
}

/**
 * @description: 获取静态类情报数和第三方情报
 */
export function requestStaticThreat(params?) {
  return request({
    url: Api.staticThreat,
    method: "POST",
    params,
  });
}

/**
 * @description: 获取动态类情报
 */
export function requestDynamicThreat(params?) {
  return request({
    url:Api.dynimicThreat,
    method: "POST",
    params,
  });
}