/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-27 09:46:00
 * @LastEditTime: 2022-06-06 11:28:03
 */
export enum ONLINESTATUS {
  OFFLINE,
  ONLINE,
}

export enum ANASTATUS {
  UNFINISH = 1,
  FINISH,
}
export enum IsCompress {
  FILE,
  ZIP,
}
export enum LICSTATUS {
  NO,
  OK,
  PASS,
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

export enum RANGDATE {
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
}

export enum TENANTALL {
  ALL = '0',
}

export enum SAMPLETYPE {
  SAFE = 1,
  Suspicious,
  Malicious,
}
export enum THREATINFO {
  INFO = 1
}
export enum OUTREACH {
  TOPFIVE = 5,
  TOPTEN = 10
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
  'webshell'
];
export const ShowAnalysisStatus: string[] = [
  '待检测/#267EE5/rgba(38, 126, 229, .1)',
  '自动分析中.../#F8A556/rgba(248, 165, 86, .1)',
  '自动分析完成/#34A753/rgba(52, 167, 83, .1)',
  '失败/#FF3543/rgba(255, 53, 67, .1)',
  '自动分析超时/#FFA500/rgba(255,140,10, .1)',
];
export const ShowRole: string[] = [
  '管理员', '分析员', '云租户管理员', '云租户子账户'
]
export const ShowDetectionEngine: string[] = ['威胁情报引擎/#ff3543', '综合分析引擎/#f8a556'];