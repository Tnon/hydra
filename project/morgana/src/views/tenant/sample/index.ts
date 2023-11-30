/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-25 20:33:19
 * @LastEditTime: 2022-04-20 15:30:02
 */
import { ViewReportTenant } from "@hydra/components/ViewReportTenant";
import { FILETYPE } from "@/enums/fileType";
import { AutoStatus, RiskType } from "@/enums/statusEnum";
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
import { Router } from "vue-router";
import { analysisStatus } from "./cmts/analysisStatus";
import { expertStatus } from "./cmts/expertStatus";
import { detectionEngine } from "@hydra/components/detectionEngine"

export const useColumns = (router: Router, refreshTable): TableColumn[] => [
  {
    title: "文件名",
    dataIndex: "file_name",
    width: 200,
  },
  {
    title: "检测引擎",
    dataIndex: "detection_engine",
    width: 150,
    customRender: ({ text }) => text ? createVNode(detectionEngine, { status: text }) : '-'
  },
  {
    title: 'MD5',
    dataIndex: "md5",
    width: 250,
    customRender: ({ text }) => text || '-'
  },
  {
    title: "分析状态",
    dataIndex: "auto_status",
    width: 150,
    customRender: ({ text }) => createVNode(analysisStatus, { status: text }),
  },
  {
    title: "文件类型",
    dataIndex: "file_type",
    width: 150,
    customRender: ({ text }) => FILETYPE["file-" + text],
  },
  {
    title: "文件数",
    dataIndex: "file_num",
    width: 100,
  },
  {
    title: "系统环境",
    dataIndex: "os_version",
    width: 150,
    customRender: ({}) => "win7 32位",
  },
  {
    title: "上传时间",
    dataIndex: "upload_time",
    width: 200,
  },
  {
    title: "风险类型",
    dataIndex: "risk_type",
    width: 100,
    customRender: ({ text, record }) => {
      if (record.auto_status === AutoStatus.AutoStatusOK) {
        return RiskType[text];
      }
      return "-";
    },
  },
  {
    title: "风险值",
    dataIndex: "risk_value",
    width: 100,
    customRender: ({ text, record }) => {
      if (record.auto_status === AutoStatus.AutoStatusOK) {
        return text;
      }
      return "-";
    },
  },
  {
    title: "专家分析",
    dataIndex: "expert_status",
    width: 100,
    customRender: ({ text, record }) =>
      createVNode(expertStatus, {
        status: text,
        auto_status: record.auto_status,
        id: record.id,
        is_compress: record.is_compress,
        refreshTable,
      }),
  },
  {
    title: "处理",
    dataIndex: "is_compress",
    width: 100,
    customRender: ({ record, text }) =>
      createVNode(ViewReportTenant, {
        auto_status: record.auto_status,
        is_compress: text,
        sample_id: record.id,
        sample_name: record.file_name,
        expert_status: record.expert_status,
      }),
  },
];
