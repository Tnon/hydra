/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 11:58:40
 * @LastEditTime: 2022-05-16 17:51:19
 */
import { ref } from 'vue';
export const labelNames = {
  expert_report: {
    labelName: '专家分析结果',
    analyze_summary: '分析概要',
    handle_suggestion: '处置建议',
  },
  outline: {
    labelName: '自动分析概要',
    sample_score: '风险值分数',
    sample_name: '样本名称',
    check_time: '检测时间',
    sample_ext: '样本类型',
    sample_size: '样本大小',
    run_env: '运行环境',
    MD5: 'MD5',
    SHA1: 'SHA1',
    SHA256: 'SHA256',
    SSDEEP: 'SSDeep',
    SHELL: '加壳诊断',
    sample_tag: '样本标签',
    harm_info: '危害情况',
    trans_mode: '传播方式',
    impact_estimate: '影响面评估',
    vulnerability: '漏洞利用情况',
    handle_suggest: '处置建议',
  },
  complex: {
    labelName: '复合式杀毒引擎',
    analyze_res: '复合查杀结论',
    engines: '各引擎查杀结果',
  },
  reverse: {
    labelName: '智能逆向分析引擎',
    File: '路径',
    Packer: '壳名/编译器名',
    Unpack: '是否脱壳成功',
    CryptAlg: '密码学算法',
    PeHeaderExpStr: 'PE文件头部异常类型',
    Startup: '启动路径/注册表值',
    AVName: '对抗杀毒软件名称',
    Mining: '挖矿特征',
    APIs: 'API序列',
    Pos: '序列代码位置',
    APIList: 'API序列列表',
    Description: '描述信息',
  },
  behavior: {
    labelName: '行为分析引擎',
    analyze_res: '行为分析结果',
    behavior_catagory: '各类敏感行为列表',
    derive_file: '衍生文件',
    process: '进程类行为',
    reg: '注册表类行为',
    file: '文件类行为',
    network: '网络类行为',
    service: '服务类行为',
    other: '其他行为',
  },
  nofile: {
    labelName: '内存攻击检测引擎',
  },
  threat_hit: {
    labelName: '威胁情报命中',
    high_risk: '高危情报命中',
    medium_risk: '中危情报命中',
    low_risk: '低危情报命中',
  },
  flaw: {
    labelName: '漏洞检测引擎(0day-Nday)',
  },
  yisuo_report: {
    labelName: '威胁情报联防检测引擎',
    ioc: '情报内容:',
    iocType: '情报类型:',
    port: '情报关联端口:',
    platform: '影响平台:',
    category: '威胁类型:',
    type: '攻击类型:',
    description: '情报描述:',
    confidence: '置信度:',
    riskLevel: '威胁等级:',
    source: '情报来源:',
    insertTime: '发现时间:',
    activeTime: '最近活跃时间:',
    expireTime: '过期时间:',
    activeStatus: '活跃状态:',
    status: '情报当前状态:',
    family: '关联样本家族信息:',
    associatedSample: '关联样本值:',
    country: 'IP归属国家:',
    province: 'IP归属省:',
    city: 'IP归属城市:',
    institutions: '披露机构:',
  },
  webshell: {
    labelName: 'Webshell检测引擎',
  },
  ransom: {
    labelName: '勒索病毒检测引擎',
  },
};
export const useOpenColl = (): any => {
  const isOpenColl = ref(false);
  const setOpenColl = () => {
    isOpenColl.value = !isOpenColl.value;
  };
  return [isOpenColl, setOpenColl];
};
