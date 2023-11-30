import request from "@/http";
enum Api {
  tenantSampleList = "/api/tenant/sample/list",
  tenantZipInfo = "/api/tenant/sample/compress/info",
  tentantZipList = "/api/tenant/sample/compress/list",
  tenantReportInfo = "/api/tenant/sample/report/get",
  tenantExperAn = "/api/tenant/expert/create",
}
/**
 * @description: 获取租户样本列表
 */
export function getTenantSampleList(params: tableParams<API.Filter>) {
  return request({
    url: Api.tenantSampleList,
    method: "POST",
    params,
  });
}
/**
 * @description: 报告详情 压缩包列表
 */
export function getTenantZipInfo(params: { id: any }) {
  return request({
    url: Api.tenantZipInfo,
    method: "POST",
    params,
  });
}
/**
 * @description: 报告详情 压缩包列表
 */
export function getTenantZipList(params: tableParams<API.Filter>) {
  return request({
    url: Api.tentantZipList,
    method: "POST",
    params,
  });
}
/**
 * @description: 报告详情
 */
export function getTenantReportInfo(params: API.reportDetail) {
  return request({
    url: Api.tenantReportInfo,
    method: "POST",
    params,
  });
}
/**
 * @description: 租户转专家分析
 */
export function tenantExpertAna(params: API.ExpertCreat) {
  return request({
    url: Api.tenantExperAn,
    method: "POST",
    params,
  });
}

// 样本导出新增接口
/**
 * @description: 导出样本接口
 */
export function exportSampleRequest(params) {
  return request({
    url: '',
    method: 'POST',
    params,
  });
}

/**
 * @description: 查询样本导出状态
 */
export function exportSampleList() {
  return request({
    url: '',
    method: 'POST',
    params,
  });
}

/**
 * @description: 样本导出完成后的下载接口
 */
export function sampleDownload(params) {
  return request({
    url: '',
    method: 'POST',
    params,
  });
}