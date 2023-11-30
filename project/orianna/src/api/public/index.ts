

import request from "@/http";
enum Api {
  verifyCode = "/api/captcha", // 获取图片验证码
  messageCode = "/api/sms", // 获取短信验证码
  messageLogin = "/api/sms/verify", // 短信校验登录

  staticThreat = "/api/threat/stat",
  dynimicThreat = "/api/threat/dynamic/stat",
  ownThreat = "/api/index/get_threat_num",
  hotSearch = "/api/threat/hot/search",

  exceedLimit = "/api/report/list/export/count",
  requestExport = "/api/report/list/export",
  exportList = "/api/report/list",
  // reportInfoAna = "/api/work_order/report/get",
}

/**
 * @description: 获取图片验证码
 */
export function requestVerifyCode() {
  return request({
    url: Api.verifyCode,
    method: "POST",
  });
}

/**
 * @description: 获取短信验证码
 */
 export function requestMessageCode(params) {
  return request({
    url: Api.messageCode,
    method: "POST",
    params,
  });
}

/**
 * @description: 短信验证登录
 */
 export function messageLogin(params) {
  return request({
    url: Api.messageLogin,
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
export function requestDynimicThreat(params?) {
  return request({
    url:Api.dynimicThreat,
    method: "POST",
    params,
  });
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
 * 
 * @description: 威胁热搜接口
 */
export function requestHotThreat(params?) {
  return request({
    url: Api.hotSearch,
    method: "POST",
  });
}

// 样本导出新增接口
/**
 * @description: 查询是否超出三万条数据
 */
export function isExceedLimit(params) {
  return request({
    url: Api.exceedLimit,
    method: "POST",
    params,
  });
}

/**
 * @description: 导出样本接口
 */
 export function exportSampleRequest(params) {
  return request({
    url: Api.requestExport,
    method: 'POST',
    params,
  });
}

/**
 * @description: 查询样本导出状态列表
 */
export function exportSampleList(params) {
  return request({
    url: Api.exportList,
    method: 'POST',
    params,
  });
}

// /**
//  * @description: 报告详情 分析员
//  */
// export function getReportInfoAna(params: API.reportDetail) {
//   return request({
//     url: Api.reportInfoAna,
//     method: "POST",
//     params,
//   });
// }
