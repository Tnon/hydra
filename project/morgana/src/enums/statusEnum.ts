/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-08 17:49:16
 * @LastEditTime: 2022-04-06 19:31:45
 */
export enum ONLINESTATUS {
  OFFLINE,
  ONLINE,
}

export enum ANASTATUS {
  UNFINISH = 1,
  FINISH,
}
export enum AutoStatus {
  AutoStatusReady = 1,
  AutoStatusChecking,
  AutoStatusOK,
  AutoStatusFail,
  AutoStatusOverTime,
}

export enum ExpertStatus {
  ExpertStatusNone = 1,
  ExpertStatusChecking,
  ExpertStatusOK,
}
export enum IsCompress {
  FILE,
  ZIP,
}

// 首页时间切换
export enum RANGDATE {
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
}
// 首页租户切换
export enum TENANTALL {
  ALL = '0',
}

// 样本威胁趋势图表
export enum THREATINFO {
  INFO = 1
}

// 外联
export enum OUTREACH {
  TOPFIVE = 5,
  TOPTEN = 10
}
export enum SAMPLETYPE {
  SAFE = 1,
  Suspicious,
  Malicious,
}
export const RiskType: string[] = [
  '未知类型',
  '钓鱼',
  '蠕虫',
  '勒索',
  '病毒',
  '后门',
  '僵尸网络',
  '间谍软件',
  '木马',
  '漏洞利用',
  '其他',
  '数据窃取',
  '挖矿',
  '远控',
  'webshell',
];
export const ShowAnalysisStatus: string[] = [
  '待检测/#267EE5/rgba(38, 126, 229, .1)',
  '自动分析中.../#F8A556/rgba(248, 165, 86, .1)',
  '自动分析完成/#34A753/rgba(52, 167, 83, .1)',
  '失败/#FF3543/rgba(255, 53, 67, .1)',
  '自动分析超时/#FFA500/rgba(255,140,10, .1)',
];
