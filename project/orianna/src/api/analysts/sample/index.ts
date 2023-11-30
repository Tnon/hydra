/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 10:50:53
 * @LastEditTime: 2022-04-20 15:02:14
 */
import request from "@/http";
enum Api {
  workListApi = "/api/work_order/list",
  uploadResult = "/api/work_order/result/upload",
  reportInfoAna = "/api/work_order/report/get",
}

/**
 * @description: 获取分析员工单列表
 */
export function getWorkList(params: tableParams<API.Filter>) {
  return request({
    url: Api.workListApi,
    method: "POST",
    params,
  });
}
/**
 * @description: 上传分析结果
 */
export function uploadResultForm(params: API.AnyResult) {
  return request(
    {
      url: Api.uploadResult,
      method: "POST",
      params,
    },
    {
      successMessageText: "上传成功",
    }
  );
}
/**
 * @description: 报告详情 分析员
 */
export function getReportInfoAna(params: API.reportDetail) {
  return request({
    url: Api.reportInfoAna,
    method: "POST",
    params,
  });
}
