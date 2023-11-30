/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-25 20:33:19
 * @LastEditTime: 2022-05-30 11:52:31
 */
import { FILETYPE } from "@/enums/fileType";
import { AutoStatus, RiskType } from "@/enums/statusEnum";
import { TableColumn } from "@/types/tableColumn";
import { ViewReportTenant } from "@hydra/components/ViewReportTenant";
import { createVNode } from "vue";
import { analysisStatus } from "./cmts/analysisStatus";
import { detectionEngine } from "@hydra/components/detectionEngine"
import { expertStatus } from "./cmts/expertStatus";
export const useColumns = (refreshTable): TableColumn[] => [
  {
    title: "上传用户",
    dataIndex: "upload_user",
    width: 150,
  },
  {
    title: "文件名",
    dataIndex: "file_name",
    width: 250,
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
    customRender: () => "win7 32位",
  },
  {
    title: "上传时间",
    dataIndex: "upload_time",
    width: 200,
  },
  {
    title: "风险类型",
    dataIndex: "risk_type",
    width: 150,
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
        is_destroy: record.is_destroy, // 新增销毁判断，0：未销毁；1：销毁，不能转专家分析
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
