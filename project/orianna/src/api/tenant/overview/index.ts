/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-07 14:59:56
 * @LastEditTime: 2022-06-02 14:44:43
 */
import request from "@/http";

enum Api {
  searchTree = "/api/index/tenant/search_tenant",  // 左侧树数据

  tenantSample = "/api/index/tenant/sample_num", // 样本类型
  tenantLineCharts = "/api/index/tenant/query_line_chart", // 样本威胁趋势
  tenantPieCharts = "/api/index/tenant/type_statistics",  // 样本聚类
  tenantStatic = "/api/index/tenant/contribute_statistics",  // 样本贡献值
  tenentUopload = "/api/index/tenant/top5",  // 样本最近上传top5
  tenantTotalView = "/api/index/tenant/num_auth",  // 样本检测统计
  tenantSampleSceneClassify = "/api/index/tenant/sample_scene_num",  // 样本场景分类
  tenantThreatInfoConnect = '/api/index/tenant/threat_info',  // 威胁情报恶意样本数和一所连接状态
  tenantRealTime = '/api/index/tenant/real_time_threat',  // 实时威胁告警
  tenantDetection = '/api/index/tenant/detection_engine_chart',  // 威胁情报引擎识别样本数
  tenantOutreachRiskType = '/api/index/tenant/outline_category_statistics',   // 外联风险饼图
  tenantOutreachCountry = '/api/index/tenant/outline_country_statistics', // 外联国家饼图
  tenantOutreachList = '/api/index/tenant/real_time_outline', // 外联top列表
  tenantWorldMap = '/api/index/tenant/outline_world_map',  // 外联世界地图
  tenantKeywordsList = "api/index/tenant/keyword_statistics", // 样本聚类——关键字提取聚类
}

// 租户接口函数
/**
 * @description: 租户左侧树脱敏接口
 */
export function getTenantSearchTree() {
  return request({
    url: Api.searchTree,
    method: "POST",
    params: {},
  });
}

/**
 * @description 1. 租户首页样本统计
 */
export function getTenantSampleData(params: API.HomeFilter) {
  return request({
    url: Api.tenantSample,
    method: "POST",
    params,
  });
}

/**
 * @description 2. 租户首页样本趋势
 */
export function getTenantLineChartsData(
  params: API.HomeFilter & { sample_type: number }
) {
  return request({
    url: Api.tenantLineCharts,
    method: "POST",
    params,
  });
}

/**
 * @description 3. 租户首页样本聚类
 */
export function getTenantPieChartsData(params: API.HomeFilter) {
  return request({
    url: Api.tenantPieCharts,
    method: "POST",
    params,
  });
}

/**
 * @description 4. 租户首页模块贡献值
 */
export function getTenantStaticData(params: API.HomeFilter) {
  return request({
    url: Api.tenantStatic,
    method: "POST",
    params,
  });
}

/**
 * @description 5. 租户首页上传样本TOP5
 */
export function getUploadData() {
  return request({
    url: Api.tenentUopload,
    method: "POST",
    params: {},
  });
}

/**
 * @description 6. 租户首页检测和授权统计
 */
export function getTenantTotalViewData() {
  return request({
    url: Api.tenantTotalView,
    method: "POST",
    params: {},
  });
}

/**
 * @description 7. 租户首页样本场景分类
 */
export function getTenantSampleSceneClassify(params: API.HomeFilter) {
  return request({
    url: Api.tenantSampleSceneClassify,
    method: "POST",
    params,
  });
}

/**
 * @description 8. 威胁情报恶意样本数和一所连接状态
 */
export function getTenantThreatInfoConnect(params: API.HomeFilter) {
  return request({
    url: Api.tenantThreatInfoConnect,
    method: "POST",
    params,
  });
}

/**
 * @description 9. 实时威胁告警
 */
export function getTenantRealTime(params) {
  return request({
    url: Api.tenantRealTime,
    method: "POST",
    params,
  });
}

/**
 * @description 10. 威胁情报引擎识别样本数
 */
export function getTenantDetection(params: API.HomeFilter) {
  return request({
    url: Api.tenantDetection,
    method: "POST",
    params,
  });
}

/**
 * @description 11. 外联风险饼图
 */
export function getTenantOutreachRiskType(params: API.HomeFilter) {
  return request({
    url: Api.tenantOutreachRiskType,
    method: "POST",
    params,
  });
}

/**
 * @description 12. 外联国家饼图
 */
export function getTenantOutreachCountry(params: API.HomeFilter) {
  return request({
    url: Api.tenantOutreachCountry,
    method: "POST",
    params,
  });
}

/**
 * @description 13. 外联top列表
 */
export function getTenantOutreachList(params: API.HomeFilter & { top_num: number }) {
  return request({
    url: Api.tenantOutreachList,
    method: "POST",
    params,
  });
}

/**
 * @description 14. 外联世界地图
 */
export function getTenantWorldMap(params: API.HomeFilter) {
  return request({
    url: Api.tenantWorldMap,
    method: "POST",
    params,
  });
}

/**
 * @description 15. 租户——关键字提取聚类列表
 */
 export function requestTenantKeywordsList(params?) {
  return request({
    url: Api.tenantKeywordsList,
    method: "POST",
    params,
  });
}
