/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 20:05:20
 * @LastEditTime: 2022-06-05 22:31:58
 */
/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-27 09:46:00
 * @LastEditTime: 2022-04-06 19:36:52
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
export const RiskType: string[] = [
  '全部',
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
export const SubRiskType: string[] = [
  '全部',
  '黑灰恶意程序检测',
  '黑客攻击载荷检测',
  '邮件附件检测',
  '系统层漏洞利用行为识别',
  '无文件攻击行为检测',
];
export const ShowAnalysisStatus: string[] = [
  '待检测/#267EE5/rgba(38, 126, 229, .1)',
  '自动分析中.../#F8A556/rgba(248, 165, 86, .1)',
  '自动分析完成/#34A753/rgba(52, 167, 83, .1)',
  '失败/#FF3543/rgba(255, 53, 67, .1)',
  '自动分析超时/#FFA500/rgba(255,140,10, .1)',
];
export const IconType: string[] = [
  '#439ef6/安全样本/CheckCircleOutlined',
  '#f8a556/可疑样本/QuestionCircleOutlined',
  '#ff3543/恶意样本/ExclamationCircleOutlined',
];

export const ShowDetectionEngine: string[] = ['威胁情报引擎/#ff3543', '综合分析引擎/#f8a556'];
