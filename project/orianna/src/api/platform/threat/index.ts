/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-31 21:49:52
 * @LastEditTime: 2022-06-02 15:16:51
 */
import request from "@/http";

enum Api {
  threatList = "/api/threat/notice/list", // 威胁通告列表
  threatAdd = '/api/threat/notice/add',  // 批量添加威胁情报
  threatDel = '/api/threat/notice/del',  // 删除通告
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
 * @description: 2. 威胁通告发布
 */
export function getThreatAdd(params: any) {
  return request({
    url: Api.threatAdd,
    method: "POST",
    params,
  }, {
    successMessageText: "发布成功",
  });
}

/**
 * @description: 3. 威胁通告删除
 */
export function getThreatDel(params: deleteParams) {
  return request({
    url: Api.threatDel,
    method: "POST",
    params,
  }, {
    successMessageText: "删除成功",
  });
}

/**
 * @description: 4. 威胁情报查询
 */
export function getThreatSearch(params: { search_data: string }) {
  return request({
    url: Api.threatSearch,
    method: "POST",
    params,
  });
}