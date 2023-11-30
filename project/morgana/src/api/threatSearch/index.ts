import request from "@/http";

enum Api {
  // 630新增 start
  threatAnnunciate = "/api/threat/notice/list", // 全网威胁通告
  threatSearch = "/api/threat/search", // 威胁情报搜索
  hotSearch = "/api/threat/hot/search", // 威胁热搜
  // 630新增 end
}


// 630新增 start
/**
 * @description: 全网威胁通告列表
 */
export function requestThreatAnnunciate(params: tableParams<{}>) {
  return request({
    url: Api.threatAnnunciate,
    method: "POST",
    params,
  });
}

/**
 * @description: 威胁情报查询
 */
export function requestThreatSearch(params: { search_data: string }) {
  return request({
    url: Api.threatSearch,
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
// 630新增 end