/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-07 14:59:56
 * @LastEditTime: 2022-02-07 14:59:57
 */
import request from "@/http";

enum Api {
  sampleThreat = "/api/index/sample_num", // 本地沙箱首页样本威胁情况统计(恶意/可疑/暂无风险)
  sampleLineCharts = "/api/index/query_line_chart", // 本地沙箱首页样本趋势线图(恶意样本/可疑样本)
  localPieCharts = "/api/index/type_statistics", // 本地沙箱样本聚类饼图
  localContribute = "/api/index/contribute_statistics", // 本地沙箱首页模块贡献值
  localUopload = "/api/index/top5", // 本地沙箱首页上传样本TOP5
  localTotalView = "/api/index/num_auth", // 本地沙箱首页检测和授权统计
  
  // 630新增 start
  realTimeAlarm = "/api/index/real_time_threat", // 实时威胁告警表格数据
  keywordsList = "/api/index/keyword_statistics ", // 关键字提取
  threatInfoConnect = "/api/index/threat_info", // 威胁情报恶意样本数和一所连接状态
  sampleSceneClassify = "/api/index/sample_scene_num", // 样本场景分类
  threatLineCharts = "/api/index/detection_engine_chart", // 本地沙箱首页样本趋势-威胁情报数(线图展示)
  // 630新增 end

  tenantOutreachRiskType = "/api/index/outline_category_statistics",   // 外联风险饼图
  tenantOutreachCountry = "/api/index/outline_country_statistics", // 外联国家饼图
  tenantOutreachList = '/api/index/real_time_outline', // 外联top列表
  tenantWorldMap = "/api/index/outline_world_map", // 外联世界地图
}

/**
 * @description 1. 本地沙箱首页样本威胁情况统计(恶意样本总数\可疑样本总数\暂未发现风险样本总数)630
 */
export function getSampleThreatData(params: API.HomeFilter) {
  return request({
    url: Api.sampleThreat,
    method: "POST",
    params,
  });
}

/**
 * @description 2. 本地沙箱首页样本趋势
 */
export function requestSampleLineData(params: API.HomeFilter & { sample_type: number }) {
  return request({
    url: Api.sampleLineCharts,
    method: "POST",
    params,
  });
}

/**
 * @description 3. 本地沙箱首页样本聚类
 */
export function getPieData(params: API.HomeFilter) {
  return request({
    url: Api.localPieCharts,
    method: "POST",
    params,
  });
}

/**
 * @description 4. 本地沙箱首页模块贡献值
 */
export function getContributeData(params: API.HomeFilter) {
  return request({
    url: Api.localContribute,
    method: "POST",
    params,
  });
}

/**
 * @description 5. 本地沙箱首页上传样本TOP5
 */
export function getUploadData() {
  return request({
    url: Api.localUopload,
    method: "POST",
    params: {},
  });
}
/**
 * @description 6. 本地沙箱首页检测和授权统计
 */
export function getLocalTotalViewData() {
  return request({
    url: Api.localTotalView,
    method: "POST",
    params: {},
  });
}

// 630新增 start#############################
/**
 * @description  实时威胁告警
 */
 export function getRealTimeAlarm(params) {
  return request({
    url: Api.realTimeAlarm,
    method: "POST",
    params,
  });
}

/**
 * @description 租户——关键字提取聚类列表
 */
export function requestKeywordsList(params?) {
  return request({
    url: Api.keywordsList,
    method: "POST",
    params,
  });
}

/**
 * @description 威胁情报恶意样本数和一所连接状态
 */
export function getThreatInfoConnect(params: API.HomeFilter) {
  return request({
    url: Api.threatInfoConnect,
    method: "POST",
    params,
  });
}

/**
 * @description 首页样本场景分类
 */
export function requestSampleSceneClassify(params: API.HomeFilter) {
  return request({
    url: Api.sampleSceneClassify,
    method: "POST",
    params,
  });
}

/**
 * @description 威胁情报引擎识别样本数-线图
 */
export function requestThreatLineData(params: API.HomeFilter) {
  return request({
    url: Api.threatLineCharts,
    method: "POST",
    params,
  });
}
// 630新增 end


/**
 * @description 外联风险饼图
 */
 export function getTenantOutreachRiskType(params: API.HomeFilter) {
  return request({
    url: Api.tenantOutreachRiskType,
    method: "POST",
    params,
  });
}

/**
 * @description 外联国家饼图
 */
export function getTenantOutreachCountry(params: API.HomeFilter) {
  return request({
    url: Api.tenantOutreachCountry,
    method: "POST",
    params,
  });
}

/**
 * @description 外联top列表
 */
export function getTenantOutreachList(params: API.HomeFilter & { top_num: number }) {
  return request({
    url: Api.tenantOutreachList,
    method: "POST",
    params,
  });
}
/**
 * @description 外联世界地图
 */
 export function getTenantWorldMap(params: API.HomeFilter) {
  return request({
    url: Api.tenantWorldMap,
    method: "POST",
    params,
  });
}
