/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-31 21:49:52
 * @LastEditTime: 2022-06-06 11:03:50
 */
import request from "@/http";

enum Api {
  threatList = "/api/threat/notice/list", // 威胁通告列表
  threatSearch = '/api/threat/search'  // 查询通告
}


/**
 * @description: 1. 威胁通告列表
 */
export function getThreatList(params: tableParams<{}>) {
  return request({
    url: Api.threatList,
    method: "POST",
    params,
  });
}
/**
 * @description: 2. 威胁情报查询
 */
export function getThreatSearch(params: { search_data: string }) {
  return request({
    url: Api.threatSearch,
    method: "POST",
    params,
  });
}