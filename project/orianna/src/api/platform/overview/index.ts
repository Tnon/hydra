/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-19 17:04:08
 * @LastEditTime: 2022-06-02 14:41:52
 */
import request from "@/http";
enum Api {
  topStatic = "/api/index/admin/sample_num",  // 管理权首页样本统计
  lineCharts = "/api/index/admin/query_line_chart",  // 管理权首页样本趋势
  pieCharts = "/api/index/admin/type_statistics",  // 管理权首页样本聚类
  dataStatic = "/api/index/admin/contribute_statistics",  // 租户首页模块贡献值
  tableStatic = "/api/index/admin/auth_list",  // 管理员授权表格统计
  searchTree = "/api/index/admin/search_tenant",  // 管理员左侧树数据
  sampleSceneClassify = '/api/index/admin/sample_scene_num', // 管理员样本场景分类
  threatInfoConnect = '/api/index/admin/threat_info',   // 威胁情报恶意样本数和一所连接状态
  realTime = '/api/index/admin/real_time_threat',  // 实时威胁告警
  detection = '/api/index/admin/detection_engine_chart',  // 威胁情报引擎识别样本数
  outreachRiskType = '/api/index/admin/outline_category_statistics',   // 外联风险饼图
  outreachCountry = '/api/index/admin/outline_country_statistics', // 外联国家饼图
  outreachList = '/api/index/admin/real_time_outline', // 外联top列表
  worldMap = '/api/index/admin/outline_world_map',  // 外联世界地图

  adminKeywordsList = "api/index/admin/keyword_statistics", // 样本聚类——关键字提取聚类
}
/**
 * @description 1. 管理权首页样本统计
 */
export function getTopCardData(params: API.HomeFilter) {
  return request({
    url: Api.topStatic,
    method: "POST",
    params,
  });
}

/**
 * @description 2. 管理权首页样本趋势
 */
export function getLineData(params: API.HomeFilter & { sample_type: number }) {
  return request({
    url: Api.lineCharts,
    method: "POST",
    params,
  });
}

/**
 * @description 3. 管理权首页样本聚类
 */
export function getPieData(params: API.HomeFilter) {
  return request({
    url: Api.pieCharts,
    method: "POST",
    params,
  });
}

/**
 * @description 4. 租户首页模块贡献值
 */
export function getStaticData(params: API.HomeFilter) {
  return request({
    url: Api.dataStatic,
    method: "POST",
    params,
  });
}

/**
 * @description 5. 管理员授权表格统计
 */
export function getTableStaticData() {
  return request({
    url: Api.tableStatic,
    method: "POST",
    params: {},
  });
}

/**
 * @description 6. 管理员左侧树数据
 */
export function getSearchTreeData() {
  return request({
    url: Api.searchTree,
    method: "POST",
    params: {},
  });
}
/**
 * @description 7. 管理员样本场景分类
 */
export function getSampleSceneClassifyData(params: API.HomeFilter) {
  return request({
    url: Api.sampleSceneClassify,
    method: "POST",
    params,
  });
}

/**
 * @description 8. 威胁情报恶意样本数和一所连接状态
 */
export function getThreatInfoConnect(params: API.HomeFilter) {
  return request({
    url: Api.threatInfoConnect,
    method: "POST",
    params,
  });
}

/**
 * @description 9. 实时威胁告警
 */
export function getRealTime(params) {
  return request({
    url: Api.realTime,
    method: "POST",
    params,
  });
}

/**
 * @description 10. 威胁情报引擎识别样本数
 */
export function getDetection(params: API.HomeFilter) {
  return request({
    url: Api.detection,
    method: "POST",
    params,
  });
}

/**
 * @description 11. 外联风险饼图
 */
export function getOutreachRiskType(params: API.HomeFilter) {
  return request({
    url: Api.outreachRiskType,
    method: "POST",
    params,
  });
}

/**
 * @description 12. 外联国家饼图
 */
export function getOutreachCountry(params: API.HomeFilter) {
  return request({
    url: Api.outreachCountry,
    method: "POST",
    params,
  });
}

/**
 * @description 13. 外联top列表
 */
export function getOutreachList(params: API.HomeFilter & { top_num: number }) {
  return request({
    url: Api.outreachList,
    method: "POST",
    params,
  });
}

/**
 * @description 14. 外联世界地图
 */
export function getWorldMap(params: API.HomeFilter) {
  return request({
    url: Api.worldMap,
    method: "POST",
    params,
  });
}

/**
 * @description: 15. 管理员———样本聚类——关键字提取聚类列表
 */
 export function requestAdminKeywordsList(params?) {
  return request({
    url: Api.adminKeywordsList,
    method: "POST",
    params,
  });
}