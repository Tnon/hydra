import request from "@/http";
enum Api {
  sampleList = "/api/sample/list",
  reportInfo = "/api/sample/report/get",
  zipInfo = "/api/sample/compress/info",
  zipList = "/api/sample/compress/list",
}
/**
 * @description: 获取管理员样本列表
 */
export function getSampleList(params: tableParams<API.Filter>) {
  return request({
    url: Api.sampleList,
    method: "POST",
    params,
  });
}
/**
 * @description: 报告详情
 */
export function getReportInfo(params: API.reportDetail) {
  return request({
    url: Api.reportInfo,
    method: "POST",
    params,
  });
}

/**
 * @description: 报告详情 压缩包列表
 */
export function getZipInfo(params: { id: any }) {
  return request({
    url: Api.zipInfo,
    method: "POST",
    params,
  });
}
/**
 * @description: 报告详情 压缩包列表
 */
export function getZipList(params: tableParams<API.Filter>) {
  return request({
    url: Api.zipList,
    method: "POST",
    params,
  });
}
