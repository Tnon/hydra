/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-07 14:59:56
 * @LastEditTime: 2022-04-22 16:35:52
 */
import request from '@/http';

enum Api {
  sampleList = '/api/sample/list', // 样本列表
  expertApi = '/api/expert/create', // 转专家分析
  zipList = '/api/sample/compress/list', // 压缩包列表
  zipInfo = '/api/sample/compress/info', // 压缩包信息
  reportInfo = '/api/sample/report/get', // 报告信息

  // 样本导出
  exceedLimit = "/api/report/list/export/count", // 查询当前条件下样本条数
  requestExport = "/api/report/list/export", // 导出接口
  exportList = "/api/report/list", // 查询导出记录
}
/**
 * @description: 样本列表
 */
export function getSampleList(params: tableParams<API.TableFilter>) {
  return request({
    url: Api.sampleList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 转专家分析
 */
export function expertAna(params: API.ExpertCreat) {
  return request({
    url: Api.expertApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 报告详情 压缩包列表
 */
export function getZipInfo(params: { id: any }) {
  return request({
    url: Api.zipInfo,
    method: 'POST',
    params,
  });
}
/**
 * @description: 报告详情 压缩包列表
 */
export function getZipList(params: tableParams<API.Filter>) {
  return request({
    url: Api.zipList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 报告详情
 */
export function getReportInfo(params: { id: any }) {
  return request({
    url: Api.reportInfo,
    method: 'POST',
    params,
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